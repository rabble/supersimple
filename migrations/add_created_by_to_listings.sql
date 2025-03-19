-- Add created_by column to listings table if it doesn't exist
ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS created_by UUID;

-- Update RLS policies to use the created_by column
DROP POLICY IF EXISTS "Users can view their own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can insert their own listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can update any listing" ON public.listings;

-- Recreate policies
CREATE POLICY "Users can view their own listings" 
  ON public.listings 
  FOR SELECT 
  USING (auth.uid() = created_by OR 
         EXISTS (
           SELECT 1 FROM auth.users 
           WHERE id = auth.uid() AND 
           raw_user_meta_data->>'role' = 'admin'
         ));

CREATE POLICY "Users can insert their own listings" 
  ON public.listings 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can update any listing" 
  ON public.listings 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() AND 
    raw_user_meta_data->>'role' = 'admin'
  ));
