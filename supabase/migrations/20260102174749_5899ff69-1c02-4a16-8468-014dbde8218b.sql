-- Add shared_at column for LinkedIn share tracking
ALTER TABLE test_results 
ADD COLUMN shared_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;