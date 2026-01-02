-- Add SELECT policy for service_role to allow edge function to check rate limits
-- Note: service_role bypasses RLS, but we add this for documentation/clarity
-- The edge function uses the service role key which bypasses RLS anyway

-- Add a policy that allows selecting for rate limit checks (optional, since service_role bypasses RLS)
-- But let's add a proper SELECT policy for authenticated users to see their own results
CREATE POLICY "Service role can select test results"
ON public.test_results
FOR SELECT
TO service_role
USING (true);