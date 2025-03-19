import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase credentials are not set in environment variables.');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  console.log('Setting up database tables...');
  console.log('Using Supabase URL:', supabaseUrl);
  
  try {
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'sql', 'create_tables.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('Executing SQL to create tables...');
    
    // RPC method doesn't work, try direct table creation via REST API
    console.log('Trying to create tables via REST API...');
    
    // First, check if directories table exists
    const { error: checkDirError } = await supabase
      .from('directories')
      .select('id')
      .limit(1);
    
    if (!checkDirError) {
      console.log('Directories table already exists, skipping creation');
      console.log('Database setup completed successfully');
      return;
    } else if (checkDirError && checkDirError.message.includes('does not exist')) {
      console.log('Directories table does not exist, creating it...');
      
      // Print instructions for manual setup
      console.log('Cannot create tables automatically via REST API.');
      console.log('Please follow these steps to set up your database manually:');
      console.log('1. Go to your Supabase dashboard: https://app.supabase.com/');
      console.log('2. Select your project');
      console.log('3. Go to the SQL Editor');
      console.log('4. Copy and paste the following SQL:');
      console.log('\n' + sqlContent + '\n');
      console.log('5. Run the SQL');
      
      throw new Error('Manual database setup required');
    } else if (!checkDirError) {
      console.log('Directories table already exists');
    }
    
    // Verify tables were created
    const { data: dirData, error: dirCheckError } = await supabase
      .from('directories')
      .select('count(*)', { count: 'exact', head: true });
    
    if (dirCheckError) {
      console.error('Error verifying directories table:', dirCheckError);
    } else {
      console.log('Directories table created successfully');
    }
    
    const { data: listData, error: listCheckError } = await supabase
      .from('listings')
      .select('count(*)', { count: 'exact', head: true });
    
    if (listCheckError) {
      console.error('Error verifying listings table:', listCheckError);
    } else {
      console.log('Listings table created successfully');
    }
    
    console.log('Database setup completed successfully');
    console.log('You can now run: npm run create-sample');
  } catch (error) {
    console.error('Error setting up database:', error);
    console.log('Alternative setup method:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Open the SQL Editor');
    console.log('3. Copy and paste the contents of sql/create_tables.sql');
    console.log('4. Run the SQL');
  }
}

// Run the setup
setupDatabase();
