import { NextApiRequest, NextApiResponse } from 'next';
import { withAdminAuth } from '../../../../lib/admin';
import { supabase } from '../../../../lib/supabaseClient';
import { UserRole, setUserRole } from '../../../../lib/admin';

/**
 * API endpoint to manage user roles
 * Only accessible by admins
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return handleSetRole(req, res);
    case 'GET':
      return handleGetUsers(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

/**
 * Set a user's role
 */
async function handleSetRole(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, role } = req.body;
    
    if (!userId || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate the role
    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    
    // Set the user's role
    const success = await setUserRole(userId, role);
    
    if (!success) {
      return res.status(500).json({ error: 'Failed to set user role' });
    }
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Unexpected error setting user role:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all users with their roles
 */
async function handleGetUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all users
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    
    // Format the response
    const formattedUsers = users.users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || 'viewer',
      createdAt: user.created_at
    }));
    
    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Unexpected error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Wrap the handler with admin authentication
export default withAdminAuth(handler);
