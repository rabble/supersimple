import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Supabase client directly instead of using the imported one
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables for Supabase connection');
  console.log('Required variables:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createUserRolesTable() {
  try {
    console.log('Creating user_roles table...');
    
    // Verify connection
    if (!await verifySupabaseConnection()) return;
    
    // Check if table exists and create if needed
    if (await tableExists('user_roles')) {
      console.log('User roles table already exists, skipping creation.');
    } else {
      await createTable();
    }
    
    // Set the first user as admin
    await setFirstUserAsAdmin();
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

async function verifySupabaseConnection() {
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

async function tableExists(tableName) {
  const { data: existingTables, error: checkError } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public')
    .eq('tablename', tableName);
    
  return !checkError && existingTables && existingTables.length > 0;
}

async function createTable() {
  // Try to read SQL from file first
  const sqlFilePath = path.join(process.cwd(), 'sql', 'create_user_roles_table.sql');
  if (!fs.existsSync(sqlFilePath)) {
    console.error(`SQL file not found: ${sqlFilePath}`);
    return await createTableWithInlineSQL();
  }
  
  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
  console.log('Executing SQL from file...');
  
  // Try SQL API approach
  return await createTableWithSQLAPI();
}

async function createTableWithInlineSQL() {
  console.log('Creating table with inline SQL...');
  const createTableSQL = getCreateTableSQL();
  
  const { error: directError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
  
  if (directError) {
    console.error('Error creating table with inline SQL:', directError);
    console.log('\nPlease create the table manually using SQL:');
    console.log(createTableSQL);
    return false;
  } else {
    console.log('Table created successfully with inline SQL');
    return true;
  }
}

async function createTableWithSQLAPI() {
  try {
    console.log('Trying to create table using SQL API...');
    const createTableSQL = getCreateTableSQL();
    
    // Use the Supabase SQL API endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        query: createTableSQL
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('SQL API approach failed:', errorData);
      console.log('\nPlease create the table manually using SQL:');
      console.log(createTableSQL);
      return false;
    } else {
      console.log('Table created successfully using SQL API');
      return true;
    }
  } catch (e) {
    console.error('Exception during SQL API call:', e);
    console.log('\nPlease create the table manually using SQL:');
    console.log(getCreateTableSQL());
    return false;
  }
}

function getCreateTableSQL() {
  return `
    CREATE TABLE IF NOT EXISTS public.user_roles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      role VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
}

async function setFirstUserAsAdmin() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    console.log('No active user session found');
    return;
  }
  
  // Check if user already has admin role
  if (await userHasAdminRole(session.user.id)) {
    console.log('User already has admin role, skipping...');
    return;
  }
  
  console.log('Setting current user as admin...');
  
  // Update user metadata to set as admin
  await updateUserMetadata(session.user.id);
  
  // Also try to insert into user_roles table
  await insertUserRole(session.user.id, 'admin');
}

async function userHasAdminRole(userId) {
  const { data: existingRole, error: roleCheckError } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();
    
  if (roleCheckError) {
    console.error('Error checking existing role:', roleCheckError);
    return false;
  }
  
  return !!existingRole;
}

async function updateUserMetadata(userId) {
  const { error: updateMetadataError } = await supabase.auth.updateUser({
    data: { role: 'admin' }
  });
  
  if (updateMetadataError) {
    console.error('Error setting user metadata:', updateMetadataError);
    return false;
  } 
  
  console.log('User metadata updated successfully');
  return true;
}

async function insertUserRole(userId, role) {
  try {
    const { error: insertError } = await supabase.from('user_roles').upsert({
      user_id: userId,
      role: role
    });
  
    if (insertError) {
      console.error(`Error inserting user role '${role}':`, insertError);
      return false;
    } 
    
    console.log(`User role '${role}' inserted successfully`);
    return true;
  } catch (insertErr) {
    console.error(`Failed to insert user role '${role}':`, insertErr);
    return false;
  }
}

createUserRolesTable();
