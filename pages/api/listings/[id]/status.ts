import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../lib/supabaseClient';
import { isAdmin } from '../../../../lib/admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the listing ID from the URL
    const { id } = req.query;
    
    // Get the status from the request body
    const { status } = req.body;
    
    // Validate status
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ error: 'Invalid status. Must be "approved" or "rejected"' });
    }
    
    // Get the user from the session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Check if user is an admin
    const adminStatus = await isAdmin(session.user);
    if (!adminStatus) {
      return res.status(403).json({ error: 'Forbidden: Only admins can update listing status' });
    }
    
    // Get the listing to verify it exists and to get its directory_id
    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .select('directory_id')
      .eq('id', id)
      .single();
    
    if (listingError || !listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    // Update the listing status
    const { error: updateError } = await supabase
      .from('listings')
      .update({ status })
      .eq('id', id);
    
    if (updateError) {
      return res.status(500).json({ error: 'Failed to update listing status', details: updateError });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: `Listing ${status === 'approved' ? 'approved' : 'rejected'} successfully` 
    });
  } catch (error) {
    console.error('Error updating listing status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
