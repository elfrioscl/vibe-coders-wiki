-- Actualizar función get_test_statistics para incluir porcentaje_expert
CREATE OR REPLACE FUNCTION public.get_test_statistics()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_tests', COUNT(*),
    'porcentaje_inicial', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'inicial') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'porcentaje_intermedio', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'intermedio') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'porcentaje_avanzado', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'avanzado') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'porcentaje_expert', COALESCE(ROUND(COUNT(*) FILTER (WHERE nivel_resultado = 'expert') * 100.0 / NULLIF(COUNT(*), 0)), 0),
    'tiempo_promedio', COALESCE(ROUND(AVG(tiempo_total_segundos)), 0)
  ) INTO result
  FROM public.test_results;
  
  RETURN result;
END;
$$;