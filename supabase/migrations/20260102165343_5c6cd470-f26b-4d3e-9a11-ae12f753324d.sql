-- Agregar columnas para ubicación anónima
ALTER TABLE test_results 
ADD COLUMN idioma_navegador TEXT,
ADD COLUMN pais_inferido TEXT,
ADD COLUMN zona_horaria TEXT;

-- Índice para consultas por país
CREATE INDEX idx_test_results_pais ON test_results(pais_inferido);