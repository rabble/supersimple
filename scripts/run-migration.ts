import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Supabase client directly
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

async function runMigration() {
  try {
    console.log('Running migration to add status column to listings table...');
    
    // Verify connection
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error connecting to Supabase:', error);
        return;
      }
      console.log('Supabase connection verified');
    } catch (e) {
      console.error('Failed to connect to Supabase:', e);
      return;
    }
    
    // Check if status column already exists in listings table
    try {
      console.log('Checking if status column already exists...');
      const { data: columns, error: checkError } = await supabase
        .from('information_schema.columns')
        .select('column_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'listings')
        .eq('column_name', 'status');
        
      if (!checkError && columns && columns.length > 0) {
        console.log('Status column already exists in listings table, skipping migration.');
        return;
      }
    } catch (e) {
      console.error('Error checking column existence:', e);
    }
    
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'sql', 'add_status_to_listings.sql');
    if (!fs.existsSync(sqlFilePath)) {
      console.error(`SQL file not found: ${sqlFilePath}`);
      
      // Create a simple SQL statement to add the column
      console.log('Creating status column with inline SQL...');
      const addColumnSQL = `
        ALTER TABLE IF EXISTS public.listings 
        ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
        
        CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
        
        UPDATE listings SET status = 'approved' WHERE status IS NULL;
      `;
      
      try {
        const { error: directError } = await supabase.rpc('exec_sql', { sql: addColumnSQL });
        
        if (directError) {
          console.error('Error adding status column with inline SQL:', directError);
          console.log('\nPlease add the column manually using SQL:');
          console.log(addColumnSQL);
        } else {
          console.log('Status column added successfully with inline SQL');
        }
      } catch (e) {
        console.error('Exception during inline SQL execution:', e);
      }
      return;
    }
    
    console.log('Reading SQL file...');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL
    try {
      console.log('Executing SQL from file...');
      
      // Try using SQL API directly
      try {
        console.log('Trying SQL API approach...');
        
        // Split the SQL into separate statements for better error handling
        const statements = sqlContent
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0);
        
        console.log(`Executing ${statements.length} SQL statements...`);
        
        for (const stmt of statements) {
          const response = await fetch(`${supabaseUrl}/rest/v1/sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              query: stmt
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error executing statement with SQL API: ${stmt.substring(0, 50)}...`, errorData);
          } else {
            console.log(`Successfully executed: ${stmt.substring(0, 50)}...`);
          }
        }
        
        console.log('Migration completed successfully with SQL API!');
      } catch (e) {
        console.error('Exception during SQL execution:', e);
        console.log('\nYou may need to run this SQL manually:');
        console.log(sqlContent);
      }
    } catch (e) {
      console.error('Exception during migration execution:', e);
    }
  } catch (error) {
    console.error('Unexpected error during migration:', error);
  }
}

runMigration()
  .then(() => {
    console.log('Migration script completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Migration script failed:', err);
    process.exit(1);
  });
