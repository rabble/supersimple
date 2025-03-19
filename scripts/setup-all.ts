(function() {
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Helper function to prompt for input
async function promptInput(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function setupAll() {
  console.log('=== Directory SaaS Setup ===');
  console.log('This script will set up all necessary tables and configurations.');
  console.log('Using Supabase URL:', supabaseUrl);
  
  try {
    // Step 1: Get current user if already authenticated
    console.log('\n=== Step 1: Authentication ===');
    console.log('Checking for existing session...');
    
    const { data: sessionData } = await supabase.auth.getSession();
    let userId: string | undefined;
    
    if (sessionData.session) {
      console.log('Found existing session');
      userId = sessionData.session.user.id;
      console.log('User ID:', userId);
    } else {
      console.log('No existing session found');
      console.log('Using anonymous access with API key');
      
      // For setup without authentication, we'll use a hardcoded admin ID
      // In a real app, you would want to authenticate properly
      userId = '00000000-0000-0000-0000-000000000000';
    }
    
    // Step 2: Set up admin role in user metadata
    console.log('\n=== Step 2: Setting up admin role ===');
    const { error: updateMetadataError } = await supabase.auth.updateUser({
      data: { role: 'admin' }
    });
    
    if (updateMetadataError) {
      console.error('Error setting user metadata:', updateMetadataError);
    } else {
      console.log('User metadata updated successfully - you are now an admin!');
    }
    
    // Step 3: Create directories table
    console.log('\n=== Step 3: Setting up directories table ===');
    
    // Check if directories table exists
    const { error: checkDirError } = await supabase
      .from('directories')
      .select('id')
      .limit(1);
    
    if (checkDirError && checkDirError.code === '42P01') {
      console.log('Directories table does not exist, creating it...');
      
      // Create a sample directory to force table creation
      const { error: createDirError } = await supabase
        .from('directories')
        .insert([
          {
            name: 'Test Directory',
            description: 'This is a test directory to initialize the table',
            domain: 'test',
            created_by: userId,
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', title: 'Name' },
                description: { type: 'string', title: 'Description' }
              }
            }
          }
        ]);
      
      if (createDirError) {
        console.error('Error creating directories table:', createDirError);
        console.log('You may need to create the table manually using the SQL in sql/create_tables.sql');
      } else {
        console.log('Directories table created successfully!');
      }
    } else {
      console.log('Directories table already exists');
    }
    
    // Step 4: Create listings table
    console.log('\n=== Step 4: Setting up listings table ===');
    
    // Check if listings table exists
    const { error: checkListError } = await supabase
      .from('listings')
      .select('id')
      .limit(1);
    
    if (checkListError && checkListError.code === '42P01') {
      console.log('Listings table does not exist, creating it...');
      
      // Create a sample listing to force table creation
      const { data: directories } = await supabase
        .from('directories')
        .select('id')
        .limit(1);
      
      if (directories && directories.length > 0) {
        const directoryId = directories[0].id;
        
        const { error: createListError } = await supabase
          .from('listings')
          .insert([
            {
              directory_id: directoryId,
              created_by: userId,
              status: 'approved',
              data: {
                name: 'Test Listing',
                description: 'This is a test listing to initialize the table'
              }
            }
          ]);
        
        if (createListError) {
          console.error('Error creating listings table:', createListError);
          console.log('You may need to create the table manually using the SQL in sql/create_tables.sql');
        } else {
          console.log('Listings table created successfully!');
        }
      } else {
        console.log('No directories found to create a sample listing');
      }
    } else {
      console.log('Listings table already exists');
    }
    
    // Step 5: Create user_roles table
    console.log('\n=== Step 5: Setting up user_roles table ===');
    
    // Check if user_roles table exists
    const { error: checkRolesError } = await supabase
      .from('user_roles')
      .select('id')
      .limit(1);
    
    if (checkRolesError && checkRolesError.code === '42P01') {
      console.log('User roles table does not exist, creating it...');
      
      // Create a user role to force table creation
      const { error: createRoleError } = await supabase
        .from('user_roles')
        .insert([
          {
            user_id: userId,
            role: 'admin'
          }
        ]);
      
      if (createRoleError) {
        console.error('Error creating user_roles table:', createRoleError);
      } else {
        console.log('User roles table created successfully!');
      }
    } else {
      console.log('User roles table already exists');
      
      // Ensure the current user has an admin role
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: 'admin'
        });
      
      if (upsertError) {
        console.error('Error setting admin role in database:', upsertError);
      } else {
        console.log('Admin role set in database successfully');
      }
    }
    
    // Step 6: Create a sample directory and listings
    console.log('\n=== Step 6: Creating sample data ===');
    const createSample = await promptInput('Would you like to create a sample directory with listings? (y/n): ');
    
    if (createSample.toLowerCase() === 'y') {
      // Create a sample directory
      const { data: sampleDir, error: sampleDirError } = await supabase
        .from('directories')
        .insert([
          {
            name: 'Tech Companies',
            description: 'A directory of technology companies and startups',
            domain: 'technology',
            created_by: userId,
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
      
      if (sampleDirError) {
        console.error('Error creating sample directory:', sampleDirError);
      } else if (sampleDir && sampleDir.length > 0) {
        console.log('Sample directory created:', sampleDir[0].name);
        
        // Create sample listings
        const { error: sampleListError } = await supabase
          .from('listings')
          .insert([
            {
              directory_id: sampleDir[0].id,
              created_by: userId,
              status: 'approved',
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
              directory_id: sampleDir[0].id,
              created_by: userId,
              status: 'approved',
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
              directory_id: sampleDir[0].id,
              created_by: userId,
              status: 'approved',
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
        
        if (sampleListError) {
          console.error('Error creating sample listings:', sampleListError);
        } else {
          console.log('Sample listings created successfully');
        }
      }
    }
    
    console.log('\n=== Setup Complete! ===');
    console.log('Your Directory SaaS application is now ready to use.');
    console.log('You can start the application with: npm run dev');
    
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

// Run the setup
setupAll();
})();
