export interface TestQuestion {
  id: string;
  nivel: 'inicial' | 'intermedio' | 'avanzado';
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number; // índice 0-3
}

// Placeholder - reemplazar con las preguntas reales
export const testQuestions: TestQuestion[] = [];
