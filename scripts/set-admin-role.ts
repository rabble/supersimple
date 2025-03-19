(function() {
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

async function setAdminRole() {
  try {
    console.log('Setting admin role...');
    
    // Check for existing session
    console.log('Checking for existing session...');
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData.session) {
      console.log('Found existing session for user:', sessionData.session.user.email);
    } else {
      console.log('No existing session found');
      console.log('Using API key access');
      
      // For admin setup without authentication, we'll use the API key
      console.log('Note: In a production environment, you should authenticate properly');
    }
    
    // Update user metadata to set as admin
    const { error: updateMetadataError } = await supabase.auth.updateUser({
      data: { role: 'admin' }
    });
    
    if (updateMetadataError) {
      console.error('Error setting user metadata:', updateMetadataError);
    } else {
      console.log('User metadata updated successfully');
      console.log('User is now an admin!');
    }
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

setAdminRole();
})();
