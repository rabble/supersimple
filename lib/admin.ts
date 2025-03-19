import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

/**
 * User roles in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor',
  VIEWER = 'viewer'
}

/**
 * Checks if the current user is an admin
 * @param user The user object from Supabase Auth
 * @returns boolean indicating if the user is an admin
 */
export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;
  
  try {
    // Check if the user has admin role in metadata
    const role = user.user_metadata?.role;
    if (role === UserRole.ADMIN) return true;
    
    // If not in metadata, fetch from database
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        // If the error is that the table doesn't exist or there's a policy recursion,
        // check if this is a known admin user ID
        if (error.code === '42P01' || error.code === '42P17') { 
          console.warn(`Database error (${error.code}): ${error.message}`);
          
          // Hardcoded admin check for initial setup
          if (user.id === '68a14571-a988-45a4-b023-0d701ae034f4') {
            console.log('Using hardcoded admin check for initial user');
            return true;
          }
          
          return false;
        }
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data?.role === UserRole.ADMIN;
    } catch (dbError) {
      console.error('Database error checking admin status:', dbError);
      return false;
    }
  } catch (error) {
    console.error('Unexpected error checking admin status:', error);
    return false;
  }
}

/**
 * Gets the user's role from metadata or database
 * @param user The user object from Supabase Auth
 * @returns The user's role or null if not found
 */
export async function getUserRole(user: User | null): Promise<UserRole | null> {
  if (!user) return null;
  
  try {
    // Check if the user has role in metadata
    const metadataRole = user.user_metadata?.role;
    if (metadataRole) return metadataRole as UserRole;
    
    // If not in metadata, fetch from database
    try {
      const { data, error } = await supabase
        .from('users_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      return data?.role as UserRole || null;
    } catch (dbError) {
      console.error('Database error fetching user role:', dbError);
      return null;
    }
  } catch (error) {
    console.error('Unexpected error fetching user role:', error);
    return null;
  }
}

/**
 * Sets the user's role in metadata
 * @param userId The user's ID
 * @param role The role to set
 * @returns Success status
 */
export async function setUserRole(userId: string, role: UserRole): Promise<boolean> {
  try {
    // Update the user's metadata
    try {
      const { error } = await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { role } }
      );
      
      if (error) {
        console.error('Error setting user role:', error);
        return false;
      }
      
      return true;
    } catch (apiError) {
      console.error('API error setting user role:', apiError);
      return false;
    }
  } catch (error) {
    console.error('Unexpected error setting user role:', error);
    return false;
  }
}

/**
 * Higher-order function to protect admin-only routes
 * @param handler The API route handler
 * @returns A new handler that checks for admin status first
 */
export function withAdminAuth(handler: any) {
  return async (req: any, res: any) => {
    try {
      // Get the user from the session
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data || !data.session) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      
      const isUserAdmin = await isAdmin(data.session.user);
      
      if (!isUserAdmin) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      
      // User is admin, proceed with the original handler
      return handler(req, res);
    } catch (error) {
      console.error('Error in admin auth middleware:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
