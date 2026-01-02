-- Corregir CHECK constraint para incluir nivel 'expert'
-- El código TypeScript soporta 4 niveles pero la BD solo permitía 3

ALTER TABLE public.test_results 
DROP CONSTRAINT IF EXISTS test_results_nivel_resultado_check;

ALTER TABLE public.test_results 
ADD CONSTRAINT test_results_nivel_resultado_check 
CHECK (nivel_resultado IN ('inicial', 'intermedio', 'avanzado', 'expert'));

