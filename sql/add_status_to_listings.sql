-- Add status column to listings table
DO $$ 
BEGIN
    -- Check if the column exists before adding it
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'listings' AND column_name = 'status'
    ) THEN
        ALTER TABLE listings ADD COLUMN status VARCHAR(50) DEFAULT 'pending';
    END IF;
END $$;

-- Add an index on the status column for faster queries
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);

-- Update any existing records to have 'approved' status
UPDATE listings SET status = 'approved' WHERE status IS NULL;

COMMENT ON COLUMN listings.status IS 'Status of the listing (pending, approved, rejected)';
