-- Drop existing constraint
ALTER TABLE test_results 
DROP CONSTRAINT IF EXISTS test_results_nivel_resultado_check;

-- Add new constraint with 'expert' level
ALTER TABLE test_results 
ADD CONSTRAINT test_results_nivel_resultado_check 
CHECK (nivel_resultado IN ('inicial', 'intermedio', 'avanzado', 'expert'));