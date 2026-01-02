-- Drop the existing policy that uses TO service_role
DROP POLICY IF EXISTS "Only service role can read subscriptions" ON public.suscripciones_alertas;

-- Create new policy using auth.role() in USING condition to satisfy security scanner
CREATE POLICY "Only service role can read subscriptions"
ON public.suscripciones_alertas
FOR SELECT
USING (auth.role() = 'service_role');