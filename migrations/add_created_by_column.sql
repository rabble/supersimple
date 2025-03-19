-- Add created_by column to directories table
ALTER TABLE directories ADD COLUMN IF NOT EXISTS created_by UUID;

-- Update existing directories to have the created_by field set to the first admin user
-- This is just a fallback for existing data
UPDATE directories 
SET created_by = (
  SELECT id FROM auth.users 
  WHERE raw_user_meta_data->>'role' = 'admin' 
  ORDER BY created_at 
  LIMIT 1
)
WHERE created_by IS NULL;
