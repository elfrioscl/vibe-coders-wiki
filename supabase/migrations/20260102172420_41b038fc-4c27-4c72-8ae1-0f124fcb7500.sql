-- Add share_id column for public sharing URLs
ALTER TABLE public.test_results 
ADD COLUMN share_id UUID DEFAULT gen_random_uuid() UNIQUE;

-- Create index for efficient lookups by share_id
CREATE INDEX idx_test_results_share_id ON public.test_results(share_id);