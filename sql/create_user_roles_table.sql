-- Create user_roles table for storing user role information
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);

-- Add RLS policies
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a default policy that allows the service role to manage all rows
CREATE POLICY "Service role can manage all rows" ON public.user_roles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Users can view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Create a special admin policy that doesn't cause recursion
-- First, create a policy for the first admin
CREATE POLICY "First admin can manage all" ON public.user_roles
  FOR ALL USING (auth.uid() IN (
    SELECT user_id FROM public.user_roles 
    WHERE user_id = '68a14571-a988-45a4-b023-0d701ae034f4'
  ));
