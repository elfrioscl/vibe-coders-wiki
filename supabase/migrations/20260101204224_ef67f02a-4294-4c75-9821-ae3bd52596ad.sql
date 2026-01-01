-- Renombrar tabla waitlist a suscripciones_alertas
ALTER TABLE public.waitlist RENAME TO suscripciones_alertas;

-- Renombrar columna curso_interes a tema_interes
ALTER TABLE public.suscripciones_alertas RENAME COLUMN curso_interes TO tema_interes;

-- Las políticas RLS se mantienen automáticamente con el rename