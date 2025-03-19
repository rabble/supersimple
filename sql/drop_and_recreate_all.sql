-- This SQL script drops all existing tables and recreates them for the Directory SaaS application
-- Copy and paste this entire script into the Supabase SQL Editor and run it

-- First, drop all existing tables in the correct order to avoid foreign key constraint issues
DROP TABLE IF EXISTS public.listings;
DROP TABLE IF EXISTS public.directories;
DROP TABLE IF EXISTS public.user_roles;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create directories table
CREATE TABLE public.directories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  domain TEXT,
  schema JSONB,
  created_by UUID REFERENCES auth.users(id) NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create listings table
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  directory_id UUID REFERENCES public.directories(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id) NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_directories_created_by ON public.directories(created_by);
CREATE INDEX idx_listings_directory_id ON public.listings(directory_id);
CREATE INDEX idx_listings_created_by ON public.listings(created_by);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- Enable Row Level Security
ALTER TABLE public.directories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a default policy for service role and anon
CREATE POLICY "Service role bypass RLS" ON public.directories
  FOR ALL USING (auth.jwt() ->> 'role' IN ('service_role', 'anon'));
  
CREATE POLICY "Service role bypass RLS" ON public.listings
  FOR ALL USING (auth.jwt() ->> 'role' IN ('service_role', 'anon'));
  
CREATE POLICY "Service role bypass RLS" ON public.user_roles
  FOR ALL USING (auth.jwt() ->> 'role' IN ('service_role', 'anon'));

-- Create RLS policies for directories
-- Anyone can view directories
CREATE POLICY "Anyone can view directories" 
  ON public.directories FOR SELECT 
  USING (true);

-- Only authenticated users can create directories
CREATE POLICY "Authenticated users can create directories" 
  ON public.directories FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own directories
CREATE POLICY "Users can update own directories" 
  ON public.directories FOR UPDATE 
  USING (auth.uid() = created_by OR auth.jwt() ->> 'role' = 'service_role');

-- Users can delete their own directories
CREATE POLICY "Users can delete own directories" 
  ON public.directories FOR DELETE 
  USING (auth.uid() = created_by OR auth.jwt() ->> 'role' = 'service_role');

-- Create RLS policies for listings
-- Anyone can view approved listings
CREATE POLICY "Anyone can view approved listings" 
  ON public.listings FOR SELECT 
  USING (status = 'approved' OR auth.jwt() ->> 'role' = 'service_role');

-- Directory owners can view all listings in their directories
CREATE POLICY "Directory owners can view all listings" 
  ON public.listings FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.directories 
      WHERE directories.id = listings.directory_id 
      AND directories.created_by = auth.uid()
    ) OR auth.jwt() ->> 'role' = 'service_role'
  );

-- Users can view their own listings
CREATE POLICY "Users can view own listings" 
  ON public.listings FOR SELECT 
  USING (created_by = auth.uid() OR auth.jwt() ->> 'role' = 'service_role');

-- Authenticated users can create listings
CREATE POLICY "Authenticated users can create listings" 
  ON public.listings FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL OR auth.jwt() ->> 'role' = 'service_role');

-- Users can update their own listings
CREATE POLICY "Users can update own listings" 
  ON public.listings FOR UPDATE 
  USING (created_by = auth.uid() OR auth.jwt() ->> 'role' = 'service_role');

-- Users can delete their own listings
CREATE POLICY "Users can delete own listings" 
  ON public.listings FOR DELETE 
  USING (created_by = auth.uid() OR auth.jwt() ->> 'role' = 'service_role');

-- Create RLS policies for user_roles
-- Users can view their own roles
CREATE POLICY "Users can view own roles" 
  ON public.user_roles FOR SELECT 
  USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'service_role');

-- Allow authenticated users to insert their own roles
CREATE POLICY "Users can insert their own roles" 
  ON public.user_roles FOR INSERT 
  WITH CHECK (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'service_role');

-- Allow authenticated users to update their own roles
CREATE POLICY "Users can update their own roles" 
  ON public.user_roles FOR UPDATE 
  USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'service_role');

-- Insert a sample directory
INSERT INTO public.directories (name, description, domain, schema)
VALUES (
  'Tech Companies',
  'A directory of technology companies and startups',
  'technology',
  '{
    "type": "object",
    "required": ["name", "industry", "website"],
    "properties": {
      "name": {
        "type": "string",
        "title": "Company Name"
      },
      "industry": {
        "type": "string",
        "title": "Industry"
      },
      "website": {
        "type": "string",
        "title": "Website URL"
      },
      "founded": {
        "type": "string",
        "title": "Year Founded"
      },
      "employees": {
        "type": "string",
        "title": "Number of Employees"
      },
      "description": {
        "type": "string",
        "title": "Company Description"
      }
    }
  }'::jsonb
);

-- Get the ID of the directory we just created
DO $$
DECLARE
  directory_id UUID;
BEGIN
  SELECT id INTO directory_id FROM public.directories WHERE name = 'Tech Companies' LIMIT 1;
  
  IF directory_id IS NOT NULL THEN
    -- Insert sample listings
    INSERT INTO public.listings (directory_id, data, status)
    VALUES
    (
      directory_id,
      '{
        "name": "Acme Tech",
        "industry": "Software",
        "website": "https://acmetech.example.com",
        "founded": "2010",
        "employees": "50-100",
        "description": "Acme Tech develops cutting-edge software solutions for businesses."
      }'::jsonb,
      'approved'
    ),
    (
      directory_id,
      '{
        "name": "Quantum Computing Inc",
        "industry": "Hardware",
        "website": "https://quantumcomputing.example.com",
        "founded": "2015",
        "employees": "100-250",
        "description": "Pioneering the future of quantum computing technology."
      }'::jsonb,
      'approved'
    ),
    (
      directory_id,
      '{
        "name": "DataFlow Analytics",
        "industry": "Data Science",
        "website": "https://dataflow.example.com",
        "founded": "2018",
        "employees": "10-50",
        "description": "Helping businesses make sense of their data through advanced analytics."
      }'::jsonb,
      'approved'
    );
  ELSE
    RAISE NOTICE 'Directory not found, skipping sample listings creation';
  END IF;
END $$;
