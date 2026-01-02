-- Agregar columnas para ubicacion anonima del usuario
ALTER TABLE test_results 
ADD COLUMN idioma_navegador TEXT,
ADD COLUMN pais_inferido TEXT,
ADD COLUMN zona_horaria TEXT;

-- Indice para estadisticas por pais
CREATE INDEX idx_test_results_pais ON test_results(pais_inferido);

