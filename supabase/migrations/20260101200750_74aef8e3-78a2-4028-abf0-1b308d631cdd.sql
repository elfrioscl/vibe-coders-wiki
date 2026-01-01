-- Tabla para guardar resultados del test de nivel
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anonymous_id UUID NOT NULL,
  nivel_resultado TEXT NOT NULL CHECK (nivel_resultado IN ('inicial', 'intermedio', 'avanzado')),
  preguntas_respondidas INTEGER NOT NULL,
  respuestas_correctas INTEGER NOT NULL,
  tiempo_total_segundos INTEGER NOT NULL,
  respuestas_detalle JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Índice para estadísticas por nivel
CREATE INDEX idx_test_results_nivel ON public.test_results(nivel_resultado);

-- RLS: permitir insertar y leer a cualquiera (datos anónimos para estadísticas)
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert test results"
  ON public.test_results FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read for statistics"
  ON public.test_results FOR SELECT
  USING (true);