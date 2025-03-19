import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { exit } from 'process';
(function() {

// Read environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars: Record<string, string> = envContent.split('\n').reduce((acc: Record<string, string>, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    acc[match[1]] = match[2];
  }
  return acc;
}, {});

// Create Supabase client
const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Hardcoded admin user ID - replace with your user ID
const ADMIN_USER_ID = '68a14571-a988-45a4-b023-0d701ae034f4';

async function setupUserRoles() {
  try {
    console.log('Setting up user_roles table...');
    
    // First, sign in with email and password to get a session
    console.log('Please enter your Supabase login credentials:');
    const email = process.env.SUPABASE_EMAIL || await promptInput('Email: ');
    const password = process.env.SUPABASE_PASSWORD || await promptInput('Password: ', true);
    
    console.log('Signing in...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (authError) {
      console.error('Authentication error:', authError);
      return;
    }
    
    console.log('Successfully signed in as:', authData.user?.email);
    
    // Create the user_roles table directly using the REST API
    console.log('Creating user_roles table...');
    
    // First check if the table exists
    const { error: checkError } = await supabase
      .from('user_roles')
      .select('id')
      .limit(1);
    
    if (checkError && checkError.code === '42P01') { // Table doesn't exist
      console.log('Table does not exist, creating it...');
      
      // We need to use the SQL API to create the table
      // Since we can't use RPC, we'll create a temporary record in a new table
      // which will create the table for us
      
      const { error: createError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user?.id || ADMIN_USER_ID,
          role: 'admin'
        });
      
      if (createError && createError.code !== '42P01') {
        console.error('Error creating table:', createError);
      } else {
        console.log('Table created successfully');
      }
    } else {
      console.log('Table already exists');
    }
    
    // Set the current user as admin
    if (authData.user) {
      console.log('Setting current user as admin...');
      const userId = authData.user.id;
      console.log('User ID:', userId);
      
      // Update user metadata to set as admin
      const { error: updateMetadataError } = await supabase.auth.updateUser({
        data: { role: 'admin' }
      });
      
      if (updateMetadataError) {
        console.error('Error setting user metadata:', updateMetadataError);
      } else {
        console.log('User metadata updated successfully');
      }
      
      // Insert into user_roles table
      const { error: insertError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: 'admin'
        });
      
      if (insertError) {
        console.error('Error inserting user role:', insertError);
      } else {
        console.log('User role inserted successfully');
      }
      
      // Also set the hardcoded admin user if different
      if (userId !== ADMIN_USER_ID) {
        const { error: insertHardcodedError } = await supabase
          .from('user_roles')
          .upsert({
            user_id: ADMIN_USER_ID,
            role: 'admin'
          });
        
        if (insertHardcodedError) {
          console.error('Error inserting hardcoded admin role:', insertHardcodedError);
        } else {
          console.log('Hardcoded admin role inserted successfully');
        }
      }
    }
    
    console.log('Setup completed');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Helper function to prompt for input
async function promptInput(prompt: string, isPassword = false): Promise<string> {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    readline.question(prompt, (answer: string) => {
      readline.close();
      resolve(answer);
    });
  });
}

setupUserRoles();
})();
