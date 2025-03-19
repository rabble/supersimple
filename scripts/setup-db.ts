import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Validates that required environment variables are present
 * @returns {boolean} True if all required variables exist
 */
function validateEnvironmentVariables(): boolean {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables for Supabase connection');
    console.log('Required variables:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
    console.log('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
    return false;
  }
  return true;
}

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Main function to set up the database
 */
async function setupDatabase() {
  console.log('Setting up directories table...');
  
  if (!await verifySupabaseConnection()) return;
  if (await directoryTableExists()) return;
  await createDirectoriesTable();
  
  console.log('Database setup complete!');
}

/**
 * Verifies connection to Supabase
 * @returns {Promise<boolean>} True if connection is successful
 */
async function verifySupabaseConnection(): Promise<boolean> {
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
 * Checks if the directories table already exists
 * @returns {Promise<boolean>} True if the table exists
 */
async function directoryTableExists(): Promise<boolean> {
  try {
    console.log('Checking if directories table exists...');
    const { data: existingTables, error: checkError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .eq('tablename', 'directories');
      
    if (!checkError && existingTables && existingTables.length > 0) {
      console.log('Directories table already exists, skipping creation.');
      console.log('Database setup complete!');
      return true;
    }
    return false;
  } catch (e) {
    console.error('Error checking if table exists:', e);
    return false;
  }
}

/**
 * Creates the directories table and sets up RLS policies
 */
async function createDirectoriesTable(): Promise<void> {
  try {
    console.log('Creating directories table...');
    const sqlStatements = getDirectoriesTableSQL();
    await executeSQLStatements(sqlStatements);
    console.log('Directories table setup completed');
  } catch (e) {
    console.error('Exception during table creation:', e);
  }
}

/**
 * Returns the SQL statements needed to create the directories table
 * @returns {string[]} Array of SQL statements
 */
function getDirectoriesTableSQL(): string[] {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS public.directories (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      owner_user_id UUID REFERENCES auth.users(id) NOT NULL,
      name TEXT NOT NULL,
      schema_json JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      CONSTRAINT directories_name_unique UNIQUE (name)
    );
      
    -- Set up RLS (Row Level Security)
    ALTER TABLE public.directories ENABLE ROW LEVEL SECURITY;
      
    -- Policy for admins to see all directories
    CREATE POLICY "Admins can see all directories" 
      ON public.directories
      FOR SELECT 
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
      );
      
    -- Policy for owners to see their own directories
    CREATE POLICY "Users can see their own directories" 
      ON public.directories
      FOR SELECT 
      USING (owner_user_id = auth.uid());
      
    -- Policy for admins to insert directories
    CREATE POLICY "Only admins can create directories" 
      ON public.directories
      FOR INSERT 
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
      );
      
    -- Policy for admins to update directories
    CREATE POLICY "Only admins can update directories" 
      ON public.directories
      FOR UPDATE 
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
      );
  `;
    
  // Split the SQL into separate statements for better error handling
  return createTableSQL
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);
}

/**
 * Executes a list of SQL statements using the Supabase SQL API
 * @param {string[]} statements Array of SQL statements to execute
 */
async function executeSQLStatements(statements: string[]): Promise<void> {
  console.log(`Executing ${statements.length} SQL statements...`);
    
  for (const stmt of statements) {
    try {
      const response = await executeSingleStatement(stmt);
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error executing statement with SQL API: ${stmt.substring(0, 50)}...`, errorData);
      } else {
        console.log(`Successfully executed: ${stmt.substring(0, 50)}...`);
      }
    } catch (e) {
      console.error(`Exception executing statement: ${stmt.substring(0, 50)}...`, e);
    }
  }
}

/**
 * Executes a single SQL statement using the Supabase SQL API
 * @param {string} statement SQL statement to execute
 * @returns {Promise<Response>} Fetch API response
 */
async function executeSingleStatement(statement: string): Promise<Response> {
  return fetch(`${supabaseUrl}/rest/v1/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      query: statement
    })
  });
}

/**
 * Main execution flow
 */
function main() {
  if (!validateEnvironmentVariables()) {
    process.exit(1);
  }
  
  setupDatabase()
    .catch(err => {
      console.error('Unexpected error during database setup:', err);
      process.exit(1);
    });
}

main();
