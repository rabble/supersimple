const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
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

async function resetAll() {
  console.log('=== Directory SaaS Reset ===');
  console.log('WARNING: This script will delete all data in your Supabase database!');
  console.log('Using Supabase URL:', supabaseUrl);
  
  try {
    // Confirm reset
    const confirm = await promptInput('Are you sure you want to reset all data? This cannot be undone! (type "RESET" to confirm): ');
    
    if (confirm !== 'RESET') {
      console.log('Reset cancelled.');
      return;
    }
    
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
      
      // For reset without authentication, we'll use a hardcoded admin ID
      userId = '00000000-0000-0000-0000-000000000000';
    }
    
    // Step 2: Delete all listings
    console.log('\n=== Step 2: Deleting all listings ===');
    const { error: deleteListingsError } = await supabase
      .from('listings')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all listings
    
    if (deleteListingsError) {
      console.error('Error deleting listings:', deleteListingsError);
    } else {
      console.log('All listings deleted successfully');
    }
    
    // Step 3: Delete all directories
    console.log('\n=== Step 3: Deleting all directories ===');
    const { error: deleteDirectoriesError } = await supabase
      .from('directories')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all directories
    
    if (deleteDirectoriesError) {
      console.error('Error deleting directories:', deleteDirectoriesError);
    } else {
      console.log('All directories deleted successfully');
    }
    
    // Step 4: Delete all user roles
    console.log('\n=== Step 4: Deleting all user roles ===');
    const { error: deleteRolesError } = await supabase
      .from('user_roles')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all user roles
    
    if (deleteRolesError) {
      console.error('Error deleting user roles:', deleteRolesError);
    } else {
      console.log('All user roles deleted successfully');
    }
    
    // Step 5: Reset admin role for current user
    console.log('\n=== Step 5: Resetting admin role for current user ===');
    const { error: updateMetadataError } = await supabase.auth.updateUser({
      data: { role: 'admin' }
    });
    
    if (updateMetadataError) {
      console.error('Error setting user metadata:', updateMetadataError);
    } else {
      console.log('User metadata updated successfully - you are now an admin!');
    }
    
    // Step 6: Create user role for current user
    console.log('\n=== Step 6: Creating admin role in database ===');
    const { error: createRoleError } = await supabase
      .from('user_roles')
      .insert([
        {
          user_id: userId || '00000000-0000-0000-0000-000000000000',
          role: 'admin'
        }
      ]);
    
    if (createRoleError) {
      console.error('Error creating admin role:', createRoleError);
    } else {
      console.log('Admin role created successfully');
    }
    
    console.log('\n=== Reset Complete! ===');
    console.log('All data has been deleted and your admin role has been reset.');
    console.log('You can now run the setup script again: npm run setup');
    
  } catch (error) {
    console.error('Reset failed:', error);
  }
}

// Run the reset
resetAll();
