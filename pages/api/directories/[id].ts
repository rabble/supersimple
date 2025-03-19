import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth } from '../../../lib/admin';
import { supabase } from '../../../lib/supabaseClient';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the directory ID from the URL
  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid directory ID' });
  }
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return handleGetOne(id, req, res);
    case 'PUT':
      return handleUpdate(id, req, res);
    case 'DELETE':
      return handleDelete(id, req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

/**
 * Get a single directory by ID
 */
async function handleGetOne(id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from('directories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching directory:', error);
      return res.status(404).json({ error: 'Directory not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Unexpected error fetching directory:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Update a directory
 */
async function handleUpdate(id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, schema_json } = req.body;
    
    if (!name && !schema_json) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    const updates: any = {};
    if (name) updates.name = name;
    if (schema_json) updates.schema_json = schema_json;
    
    const { data, error } = await supabase
      .from('directories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating directory:', error);
      return res.status(500).json({ error: 'Failed to update directory' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Unexpected error updating directory:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Delete a directory
 */
async function handleDelete(id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { error } = await supabase
      .from('directories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting directory:', error);
      return res.status(500).json({ error: 'Failed to delete directory' });
    }
    
    return res.status(204).end();
  } catch (error) {
    console.error('Unexpected error deleting directory:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Wrap the handler with admin authentication
export default withAdminAuth(handler);
