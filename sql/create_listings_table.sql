CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  directory_id UUID NOT NULL REFERENCES public.directories(id),
  data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),  -- Added created_by column
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'listings' 
        AND column_name = 'created_by'
    ) THEN
        ALTER TABLE public.listings 
        ADD COLUMN created_by UUID REFERENCES auth.users(id);
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view their own listings and admins to view all
CREATE POLICY "Users can view their own listings" 
  ON public.listings 
  FOR SELECT 
  USING (auth.uid() = created_by OR 
         EXISTS (
           SELECT 1 FROM auth.users 
           WHERE id = auth.uid() AND 
           raw_user_meta_data->>'role' = 'admin'
         ));

-- Allow users to insert their own listings
CREATE POLICY "Users can insert their own listings" 
  ON public.listings 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Allow admins to update any listing
CREATE POLICY "Admins can update any listing" 
  ON public.listings 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() AND 
    raw_user_meta_data->>'role' = 'admin'
  ));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();