-- Add explicit SELECT policy for service_role only
-- This documents the security intention: only backend/admin can read subscriber emails
CREATE POLICY "Only service role can read subscriptions"
ON public.suscripciones_alertas
FOR SELECT
TO service_role
USING (true);