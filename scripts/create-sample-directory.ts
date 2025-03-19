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

async function createSampleDirectory() {
  console.log('Creating sample directory...');
  
  try {
    // Create a sample directory
    const { data: directory, error: dirError } = await supabase
      .from('directories')
      .insert([
        {
          name: 'Tech Companies',
          description: 'A directory of technology companies and startups',
          domain: 'technology',
          schema: {
            type: 'object',
            required: ['name', 'industry', 'website'],
            properties: {
              name: {
                type: 'string',
                title: 'Company Name'
              },
              industry: {
                type: 'string',
                title: 'Industry'
              },
              website: {
                type: 'string',
                title: 'Website URL'
              },
              founded: {
                type: 'string',
                title: 'Year Founded'
              },
              employees: {
                type: 'string',
                title: 'Number of Employees'
              },
              description: {
                type: 'string',
                title: 'Company Description'
              }
            }
          }
        }
      ])
      .select();
    
    if (dirError) throw dirError;
    
    if (!directory || directory.length === 0) {
      throw new Error('Failed to create directory');
    }
    
    const createdDirectory = directory[0];
    console.log('Sample directory created:', createdDirectory);
    
    // Create some sample listings
    const { data: listings, error: listError } = await supabase
      .from('listings')
      .insert([
        {
          directory_id: createdDirectory.id,
          data: {
            name: 'Acme Tech',
            industry: 'Software',
            website: 'https://acmetech.example.com',
            founded: '2010',
            employees: '50-100',
            description: 'Acme Tech develops cutting-edge software solutions for businesses.'
          }
        },
        {
          directory_id: createdDirectory.id,
          data: {
            name: 'Quantum Computing Inc',
            industry: 'Hardware',
            website: 'https://quantumcomputing.example.com',
            founded: '2015',
            employees: '100-250',
            description: 'Pioneering the future of quantum computing technology.'
          }
        },
        {
          directory_id: createdDirectory.id,
          data: {
            name: 'DataFlow Analytics',
            industry: 'Data Science',
            website: 'https://dataflow.example.com',
            founded: '2018',
            employees: '10-50',
            description: 'Helping businesses make sense of their data through advanced analytics.'
          }
        }
      ]);
    
    if (listError) throw listError;
    // Use type assertion to tell TypeScript that listings is an array when it exists
    console.log('Sample listings created:', listings ? (Array.isArray(listings) ? (listings as any[]).length : 0) : 0);
    
    console.log('Sample data creation completed successfully');
  } catch (error) {
    console.error('Error creating sample data:', error);
    
    // Check if the error is related to missing tables
    if (error.message && error.message.includes('does not exist')) {
      console.error('\nThe database tables do not exist yet. Please set up the database first:');
      console.error('1. Run: npm run setup-db-simple');
      console.error('2. Or manually run the SQL from sql/create_tables.sql in your Supabase dashboard');
    }
  }
}

// Run the script
createSampleDirectory();
})();
