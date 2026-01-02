-- Create a security definer function that returns only aggregated statistics
CREATE OR REPLACE FUNCTION public.get_test_statistics()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_tests', COUNT(*),
    'porcentaje_inicial', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'inicial') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'porcentaje_intermedio', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'intermedio') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'porcentaje_avanzado', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'avanzado') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'tiempo_promedio', COALESCE(ROUND(AVG(tiempo_total_segundos)), 0)
  ) INTO result
  FROM test_results;
  
  RETURN result;
END;
$$;

-- Drop the public SELECT policy that exposes individual records
DROP POLICY IF EXISTS "Anyone can read for statistics" ON public.test_results;