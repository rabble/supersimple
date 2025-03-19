(function() {
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

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

async function setupDatabaseSimple() {
  console.log('Setting up database using REST API...');
  
  try {
    // First, try to access the directories table to see if it exists
    const { error: checkError } = await supabase
      .from('directories')
      .select('id')
      .limit(1);
    
    if (!checkError) {
      console.log('Directories table already exists!');
      return;
    } else if (!checkError.message.includes('does not exist')) {
      console.error('Error checking directories table:', checkError);
      return;
    }
    
    console.log('Creating directories table...');
    
    // Create a simple directory to force table creation
    const { error: createError } = await supabase
      .from('directories')
      .insert([
        {
          name: 'Test Directory',
          description: 'This is a test directory to initialize the table',
          domain: 'test',
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', title: 'Name' },
              description: { type: 'string', title: 'Description' }
            }
          }
        }
      ]);
    
    if (createError) {
      console.error('Error: Could not create directories table. You may need to create it manually.');
      console.error('Error details:', createError);
      console.error('Please go to your Supabase dashboard and run the SQL in sql/create_tables.sql');
    } else {
      console.log('Directory created successfully! Database is ready.');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the setup
setupDatabaseSimple();
})();
