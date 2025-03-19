import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth } from '../../../lib/admin';
import { supabase } from '../../../lib/supabaseClient';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return handleCreate(req, res);
    case 'GET':
      return handleGetAll(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

/**
 * Create a new directory
 */
async function handleCreate(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the current user from the session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const userId = session.user.id;
    
    // Parse the request body
    const { name, schema_json, schema } = req.body;
    
    // Use schema if provided, otherwise use schema_json for backward compatibility
    const schemaData = schema || schema_json;
    
    if (!name || !schemaData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Insert the new directory
    const { data, error } = await supabase
      .from('directories')
      .insert({
        name,
        schema: schemaData,
        owner_user_id: userId
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating directory:', error);
      return res.status(500).json({ error: 'Failed to create directory' });
    }
    
    return res.status(201).json(data);
  } catch (error) {
    console.error('Unexpected error creating directory:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all directories (with admin filtering)
 */
async function handleGetAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all directories (RLS will filter based on user role)
    const { data, error } = await supabase
      .from('directories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching directories:', error);
      return res.status(500).json({ error: 'Failed to fetch directories' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Unexpected error fetching directories:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Wrap the handler with admin authentication
export default withAdminAuth(handler);
