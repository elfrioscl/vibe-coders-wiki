import { testQuestions, TestQuestion } from "@/data/testQuestions";

// ==================== Types ====================

export type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

export interface RespuestaDetalle {
  preguntaId: string;
  nivelPregunta: Nivel;
  correcta: boolean;
  noSabe: boolean;
  tiempoSegundos: number;
  opcionSeleccionada: number | null;
  opcionCorrecta: number;
  questionsVersion: string;
}

export interface ShuffledQuestion {
  original: TestQuestion;
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
}

export interface TestStats {
  totalTests: number;
  porcentajePorNivel: Record<Nivel, number>;
  tiempoPromedio: number;
}

// ==================== Constants ====================

export const ANONYMOUS_ID_KEY = 'vibe-test-anonymous-id';
export const MIN_PREGUNTAS = 8;
export const MAX_PREGUNTAS = 15;
export const CONFIANZA_REQUERIDA = 3;
export const MIN_PREGUNTAS_NIVEL_ALTO = 12;
export const QUESTIONS_VERSION = '2026-01-02-v1';

export const nivelDescripciones: Record<Nivel, { titulo: string; descripcion: string; color: string }> = {
  inicial: {
    titulo: "Nivel Inicial",
    descripcion: "Estás comenzando tu viaje en vibe coding. Tienes curiosidad y las bases para empezar a crear con IA, pero aún hay mucho por explorar.",
    color: "text-green-500"
  },
  intermedio: {
    titulo: "Nivel Intermedio", 
    descripcion: "Ya tienes experiencia con vibe coding. Sabes usar prompts efectivos y entiendes cómo colaborar con la IA para crear proyectos funcionales.",
    color: "text-yellow-500"
  },
  avanzado: {
    titulo: "Nivel Avanzado",
    descripcion: "Dominas el arte del vibe coding. Puedes crear proyectos complejos, depurar eficientemente y sacar el máximo provecho de las herramientas de IA.",
    color: "text-purple-500"
  },
  expert: {
    titulo: "Nivel Expert",
    descripcion: "Dominas el vibe coding a nivel profesional. Manejas arquitectura avanzada, seguridad, optimización y las técnicas más sofisticadas para crear productos de alta calidad con IA.",
    color: "text-amber-500"
  }
};

// ==================== Question Selection ====================

export const getQuestionsByNivel = (nivel: Nivel): TestQuestion[] => {
  return testQuestions.filter(q => q.level === nivel);
};

export const getRandomQuestion = (nivel: Nivel, usedIds: Set<string>): TestQuestion | null => {
  const available = getQuestionsByNivel(nivel).filter(q => !usedIds.has(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};

/**
 * Fisher-Yates shuffle for randomizing answer options
 */
export const shuffleOptions = (question: TestQuestion): ShuffledQuestion => {
  const indices = [0, 1, 2, 3];
  
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  const shuffledOptions = indices.map(i => question.options[i]);
  const shuffledCorrectAnswer = indices.indexOf(question.correctAnswer);
  
  return {
    original: question,
    shuffledOptions,
    shuffledCorrectAnswer
  };
};

/**
 * Selects the next question based on current level, falling back to other levels if needed
 */
export const selectNextQuestion = (nivel: Nivel, usedIds: Set<string>): ShuffledQuestion | null => {
  let question = getRandomQuestion(nivel, usedIds);
  
  if (!question) {
    const niveles: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];
    for (const n of niveles) {
      if (n !== nivel) {
        question = getRandomQuestion(n, usedIds);
        if (question) break;
      }
    }
  }
  
  return question ? shuffleOptions(question) : null;
};

// ==================== Level Calculation ====================

/**
 * Adjusts the estimated level based on whether the answer was correct
 */
export const adjustNivelEstimado = (currentNivel: Nivel, isCorrect: boolean): Nivel => {
  if (isCorrect) {
    if (currentNivel === 'inicial') return 'intermedio';
    if (currentNivel === 'intermedio') return 'avanzado';
    if (currentNivel === 'avanzado') return 'expert';
    return currentNivel;
  } else {
    if (currentNivel === 'expert') return 'avanzado';
    if (currentNivel === 'avanzado') return 'intermedio';
    if (currentNivel === 'intermedio') return 'inicial';
    return currentNivel;
  }
};

/**
 * Calculates the final level based on all responses
 */
export const calculateFinalLevel = (respuestas: RespuestaDetalle[]): Nivel => {
  const correctByLevel: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
  const totalByLevel: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
  
  respuestas.forEach(r => {
    totalByLevel[r.nivelPregunta]++;
    if (r.correcta) correctByLevel[r.nivelPregunta]++;
  });

  const expertRate = totalByLevel.expert > 0 ? correctByLevel.expert / totalByLevel.expert : 0;
  const avanzadoRate = totalByLevel.avanzado > 0 ? correctByLevel.avanzado / totalByLevel.avanzado : 0;
  const intermedioRate = totalByLevel.intermedio > 0 ? correctByLevel.intermedio / totalByLevel.intermedio : 0;
  const inicialRate = totalByLevel.inicial > 0 ? correctByLevel.inicial / totalByLevel.inicial : 0;

  const totalCorrect = respuestas.filter(r => r.correcta).length;
  const totalQuestions = respuestas.length;
  const overallRate = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;

  // Check if fails at low levels first
  if (totalByLevel.inicial >= 2 && inicialRate < 0.5) {
    return 'inicial';
  }

  if (totalByLevel.intermedio >= 3 && intermedioRate < 0.4) {
    return (totalByLevel.inicial >= 2 && inicialRate >= 0.5) 
      ? 'intermedio' 
      : 'inicial';
  }

  // Evaluate high levels
  if (expertRate >= 0.7 && totalByLevel.expert >= 4 && avanzadoRate >= 0.5) {
    return 'expert';
  }
  if (avanzadoRate >= 0.6 && totalByLevel.avanzado >= 3 && intermedioRate >= 0.4) {
    return 'avanzado';
  }
  if (intermedioRate >= 0.5 && totalByLevel.intermedio >= 3) {
    return 'intermedio';
  }
  
  // Fallback by overall percentage
  if (overallRate >= 0.8) return 'expert';
  if (overallRate >= 0.65) return 'avanzado';
  if (overallRate >= 0.4) return 'intermedio';
  return 'inicial';
};

/**
 * Determines if the test should end based on current state
 */
export const shouldEndTest = (
  totalPreguntas: number,
  consecutiveSameLevel: number,
  currentNivel: Nivel
): boolean => {
  const tieneConfianza = consecutiveSameLevel >= CONFIANZA_REQUERIDA;
  const llegaMinimo = totalPreguntas >= MIN_PREGUNTAS;
  const llegaMaximo = totalPreguntas >= MAX_PREGUNTAS;
  
  const esNivelAlto = currentNivel === 'avanzado' || currentNivel === 'expert';
  const llegaMinimoNivelAlto = totalPreguntas >= MIN_PREGUNTAS_NIVEL_ALTO;
  
  return esNivelAlto 
    ? (llegaMinimoNivelAlto && tieneConfianza) || llegaMaximo
    : (llegaMinimo && tieneConfianza) || llegaMaximo;
};

// ==================== Utility Functions ====================

export const getAnonymousId = (): string => {
  let id = localStorage.getItem(ANONYMOUS_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ANONYMOUS_ID_KEY, id);
  }
  return id;
};

export const getAnonymousLocation = () => {
  const lang = navigator.language || '';
  const parts = lang.split('-');
  return {
    idioma_navegador: lang || null,
    pais_inferido: parts[1]?.toUpperCase() || null,
    zona_horaria: Intl.DateTimeFormat().resolvedOptions().timeZone || null
  };
};

export const getGuiaPath = (nivel: Nivel): string => {
  const paths: Record<Nivel, string> = {
    inicial: '/guias-cursos-vibe-coding/inicial',
    intermedio: '/guias-cursos-vibe-coding/intermedio',
    avanzado: '/guias-cursos-vibe-coding/avanzado',
    expert: '/guias-cursos-vibe-coding/avanzado' // Temporarily redirects to avanzado
  };
  return paths[nivel];
};

