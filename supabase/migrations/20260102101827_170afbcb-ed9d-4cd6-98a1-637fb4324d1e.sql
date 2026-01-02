-- Drop the existing policy with USING (true)
DROP POLICY IF EXISTS "Service role can select test results" ON public.test_results;

-- Create new policy using auth.role() in USING condition to satisfy security scanner
CREATE POLICY "Service role can select test results"
ON public.test_results
FOR SELECT
USING (auth.role() = 'service_role');