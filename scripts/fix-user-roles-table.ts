import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

/**
 * Validates that required environment variables are present
 * @returns {boolean} True if all required variables exist
 */
function validateEnvironmentVariables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables for Supabase connection');
    console.log('Required variables:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
    console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
    return false;
  }
  return true;
}

/**
 * Creates and returns a Supabase client
 * @returns {Object} Initialized Supabase client
 */
function initializeSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  console.log('Connecting to Supabase at:', supabaseUrl);
  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * Verifies connection to Supabase
 * @param {Object} supabase - Supabase client
 * @returns {Promise<boolean>} True if connection is successful
 */
async function verifySupabaseConnection(supabase) {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }
    console.log('Supabase connection verified');
    return true;
  } catch (e) {
    console.error('Failed to connect to Supabase:', e);
    return false;
  }
}

/**
 * Fetches existing policies for the user_roles table
 * @param {Object} supabase - Supabase client
 * @returns {Promise<string[]>} Array of policy names
 */
async function getExistingPolicies(supabase) {
  const { data: existingPolicies, error: policyCheckError } = await supabase
    .from('pg_policies')
    .select('policyname')
    .eq('tablename', 'user_roles')
    .eq('schemaname', 'public');
    
  const policyNames = existingPolicies?.map(p => p.policyname) || [];
  console.log('Existing policies:', policyNames.length ? policyNames.join(', ') : 'none');
  return policyNames;
}

/**
 * Returns SQL for dropping existing policies
 * @returns {string} SQL statement to drop policies
 */
function getDropPoliciesSQL() {
  return `
    DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
    DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
    DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
    DROP POLICY IF EXISTS "Service role can manage all rows" ON public.user_roles;
    DROP POLICY IF EXISTS "First admin can manage all" ON public.user_roles;
  `;
}

/**
 * Returns SQL for creating new policies
 * @returns {string} SQL statement to create policies
 */
function getCreatePoliciesSQL() {
  return `
    -- Create a default policy that allows the service role to manage all rows
    CREATE POLICY IF NOT EXISTS "Service role can manage all rows" ON public.user_roles
      FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

    -- Users can view their own roles
    CREATE POLICY IF NOT EXISTS "Users can view their own roles" ON public.user_roles
      FOR SELECT USING (auth.uid() = user_id);

    -- Create a special admin policy for the first admin
    CREATE POLICY IF NOT EXISTS "First admin can manage all" ON public.user_roles
      FOR ALL USING (auth.uid() = '68a14571-a988-45a4-b023-0d701ae034f4');
  `;
}

/**
 * Executes SQL using the REST API
 * @param {string} sql - SQL statement to execute
 * @param {string} description - Description of the operation
 * @returns {Promise<boolean>} True if successful
 */
async function executeSQLViaAPI(sql, description) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  try {
    console.log(`Trying SQL API approach for: ${description}...`);
    const response = await fetch(`${supabaseUrl}/rest/v1/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        query: sql
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error ${description} with SQL API:`, errorData);
      console.log('\nYou may need to run this SQL manually:');
      console.log(sql);
      return false;
    } else {
      console.log(`Successfully ${description} using SQL API`);
      return true;
    }
  } catch (e) {
    console.error(`Exception while ${description}:`, e);
    console.log('\nYou may need to run this SQL manually:');
    console.log(sql);
    return false;
  }
}

/**
 * Drops existing policies from the user_roles table
 * @returns {Promise<boolean>} True if successful
 */
async function dropExistingPolicies() {
  console.log('Dropping existing policies...');
  const dropPoliciesSQL = getDropPoliciesSQL();
  return await executeSQLViaAPI(dropPoliciesSQL, 'dropping policies');
}

/**
 * Creates new policies for the user_roles table
 * @returns {Promise<boolean>} True if successful
 */
async function createNewPolicies() {
  console.log('Creating new policies...');
  const createPoliciesSQL = getCreatePoliciesSQL();
  return await executeSQLViaAPI(createPoliciesSQL, 'creating policies');
}

/**
 * Checks if the first admin user exists
 * @param {Object} supabase - Supabase client
 * @returns {Promise<boolean>} True if admin exists
 */
async function checkFirstAdminExists(supabase) {
  console.log('Checking if first admin user exists...');
  const { data: existingAdmin, error: adminCheckError } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', '68a14571-a988-45a4-b023-0d701ae034f4')
    .eq('role', 'admin')
    .maybeSingle();
    
  if (!adminCheckError && existingAdmin) {
    console.log('First user already has admin role');
    return true;
  }
  return false;
}

/**
 * Creates the first admin user
 * @param {Object} supabase - Supabase client
 * @returns {Promise<boolean>} True if successful
 */
async function createFirstAdmin(supabase) {
  console.log('Setting up first admin user...');
  const { error: upsertError } = await supabase
    .from('user_roles')
    .upsert({
      user_id: '68a14571-a988-45a4-b023-0d701ae034f4',
      role: 'admin'
    });
    
  if (upsertError) {
    console.error('Error setting first admin:', upsertError);
    console.log('\nYou may need to manually add the admin user:');
    console.log(`INSERT INTO public.user_roles (user_id, role) VALUES ('68a14571-a988-45a4-b023-0d701ae034f4', 'admin');`);
    return false;
  } else {
    console.log('Successfully set first admin user');
    return true;
  }
}

/**
 * Ensures the first admin user exists
 * @param {Object} supabase - Supabase client
 * @returns {Promise<boolean>} True if successful
 */
async function ensureFirstAdminExists(supabase) {
  try {
    const adminExists = await checkFirstAdminExists(supabase);
    if (!adminExists) {
      return await createFirstAdmin(supabase);
    }
    return true;
  } catch (e) {
    console.error('Exception while setting admin user:', e);
    return false;
  }
}

/**
 * Main function to fix user_roles table policies
 */
async function fixUserRolesTable() {
  try {
    console.log('Fixing user_roles table policies...');
    
    // Validate environment variables
    if (!validateEnvironmentVariables()) {
      process.exit(1);
    }
    
    // Initialize Supabase client
    const supabase = initializeSupabaseClient();
    
    // Verify connection
    if (!await verifySupabaseConnection(supabase)) {
      return;
    }
    
    // Get existing policies
    await getExistingPolicies(supabase);
    
    // Drop existing policies
    await dropExistingPolicies();
    
    // Create new policies
    await createNewPolicies();
    
    // Ensure first admin exists
    await ensureFirstAdminExists(supabase);
    
    console.log('User roles table fix completed');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Execute the main function
(async () => {
  await fixUserRolesTable();
})();
