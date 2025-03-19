import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { isAdmin, UserRole } from '../../../lib/admin';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Try to get user session from cookies or Authorization header
  let session;
  let sessionError;
  
  // Check for Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const { data, error } = await supabase.auth.getUser(token);
    if (!error && data.user) {
      session = { user: data.user };
      console.log('Authenticated via token:', data.user.id);
    } else {
      sessionError = error;
    }
  }
  
  // If no valid token, try cookies
  if (!session) {
    const { data, error } = await supabase.auth.getSession();
    session = data.session;
    sessionError = error;
    
    if (session) {
      console.log('Authenticated via cookie:', session.user.id);
    }
  }
  
  if (sessionError || !session) {
    console.error('Session error:', sessionError || 'No session found');
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  
  const user = session.user;
  console.log('Authenticated user:', user.id);
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getListings(req, res, user.id);
    case 'POST':
      return createListing(req, res, user.id);
    default:
      return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

// Get listings (with optional filters)
async function getListings(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { directory_id, status } = req.query;
  
  let query = supabase.from('listings').select('*');
  
  // Apply filters if provided
  if (directory_id) {
    query = query.eq('directory_id', directory_id);
  }
  
  if (status) {
    query = query.eq('status', status);
  }
  
  // Execute query
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
  
  return res.status(200).json({ success: true, data });
}

// Create a new listing
async function createListing(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { directory_id, data } = req.body;
  
  // Validate required fields
  if (!directory_id || !data) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields: directory_id and data are required' 
    });
  }
  
  try {
    // Fetch the directory to validate it exists and get its schema
    const { data: directory, error: directoryError } = await supabase
      .from('directories')
      .select('schema')
      .eq('id', directory_id)
      .single();
    
    if (directoryError) {
      console.error('Directory error:', directoryError);
      return res.status(404).json({ 
        success: false, 
        error: 'Directory not found' 
      });
    }
    
    // Validate required fields from schema
    if (directory.schema && directory.schema.required) {
      const requiredFields = directory.schema.required;
      for (const field of requiredFields) {
        if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
          return res.status(400).json({ 
            success: false, 
            error: `Required field '${field}' is missing or empty` 
          });
        }
      }
    }
    
    // Check if user is an admin or the directory owner
    let isAutoApproved = false;
    try {
      // Check user metadata for admin role
      const { data: userData } = await supabase.auth.getUser();
      const role = userData?.user?.user_metadata?.role;
      
      console.log('User data from auth:', JSON.stringify(userData, null, 2));
      console.log('Current user ID:', userId);
      console.log('User role from metadata:', role);
      
      // Check if user is admin
      if (role === 'admin') {
        isAutoApproved = true;
        console.log('User is admin, auto-approving');
      } else {
        // Check if user is the directory owner
        const { data: directoryData, error: directoryError } = await supabase
          .from('directories')
          .select('created_by')
          .eq('id', directory_id)
          .single();
          
        console.log('Directory data:', JSON.stringify(directoryData, null, 2));
        if (directoryError) {
          console.error('Error fetching directory:', directoryError);
        }
        
        if (directoryData && directoryData.created_by === userId) {
          isAutoApproved = true;
          console.log('User is directory owner, auto-approving');
        } else {
          console.log('User is not directory owner. Directory created_by:', directoryData?.created_by);
        }
        
        // Log auto-approval status with directory owner check
        console.log('Auto-approval check:', { 
          userId, 
          role, 
          isAdmin: role === 'admin', 
          isDirectoryOwner: directoryData?.created_by === userId, 
          isAutoApproved 
        });
      }
    } catch (error) {
      console.warn('Error checking approval status:', error);
      // Default to pending if there's an error
      isAutoApproved = false;
    }
    
    // Set status based on user role or ownership
    const status = isAutoApproved ? 'approved' : 'pending';
    
    // Insert the listing with appropriate status
    const listingData = {
      directory_id,
      data,
      created_by: userId,
      status: status
    };
    
    console.log('Inserting listing:', JSON.stringify(listingData, null, 2));
    
    // Use service role client for admin operations to bypass RLS
    // This is safe because we've already done authorization checks
    let listing;
    let error;
    
    // In test environment, use the regular supabase client
    if (process.env.NODE_ENV === 'test') {
      const { data, error: insertError } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();
      
      listing = data;
      error = insertError;
    } else {
      // In production, use the admin client to bypass RLS
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || '',
        {
          auth: {
            persistSession: false
          }
        }
      );
      
      const { data, error: insertError } = await supabaseAdmin
        .from('listings')
        .insert(listingData)
        .select()
        .single();
      
      listing = data;
      error = insertError;
    }
    
    if (error) {
      console.error('Error creating listing:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Check for specific constraint errors
      if (error.code === '23505') {
        return res.status(400).json({ success: false, error: 'A listing with this data already exists' });
      } else if (error.code === '23503') {
        return res.status(400).json({ success: false, error: 'Foreign key constraint failed - directory may not exist' });
      }
      
      return res.status(500).json({ success: false, error: error.message });
    }
    
    console.log('Listing created successfully:', JSON.stringify(listing, null, 2));
    
    const statusMessage = status === 'approved' 
      ? 'Listing submitted and approved successfully' 
      : 'Listing submitted successfully and is pending approval';
    
    return res.status(201).json({ 
      success: true, 
      message: statusMessage,
      data: listing 
    });
  } catch (error: any) {
    console.error('Error in listing submission:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred during listing submission' 
    });
  }
}
