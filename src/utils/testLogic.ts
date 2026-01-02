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
 * Get the next level in the hierarchy
 */
const getNextNivel = (nivel: Nivel): Nivel => {
  const order: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];
  const idx = order.indexOf(nivel);
  return idx < order.length - 1 ? order[idx + 1] : nivel;
};

/**
 * Get the previous level in the hierarchy
 */
const getPreviousNivel = (nivel: Nivel): Nivel => {
  const order: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];
  const idx = order.indexOf(nivel);
  return idx > 0 ? order[idx - 1] : nivel;
};

/**
 * Selects the next question using discriminating logic:
 * - If few questions at current level: stay at same level
 * - If dominating (≥70%): try next level
 * - If failing (<40%): try previous level
 * - Otherwise: stay at current level to confirm
 */
export const selectNextQuestion = (
  nivelEstimado: Nivel, 
  usedIds: Set<string>,
  respuestas: RespuestaDetalle[] = []
): ShuffledQuestion | null => {
  const { correctas, total } = countByLevel(respuestas);
  
  // Calculate success rate at current level
  const nivelActualTotal = total[nivelEstimado];
  const nivelActualRate = nivelActualTotal > 0 
    ? correctas[nivelEstimado] / nivelActualTotal 
    : 0.5;
  
  let nivelPregunta: Nivel = nivelEstimado;
  
  // DISCRIMINATING LOGIC:
  
  // 1. If few questions at current level (<3), keep asking from same level
  if (nivelActualTotal < 3) {
    nivelPregunta = nivelEstimado;
  }
  // 2. If clearly dominating (≥70%), try next level
  else if (nivelActualRate >= 0.7 && nivelEstimado !== 'expert') {
    nivelPregunta = getNextNivel(nivelEstimado);
  }
  // 3. If clearly failing (<40%), confirm with previous level
  else if (nivelActualRate < 0.4 && nivelEstimado !== 'inicial') {
    nivelPregunta = getPreviousNivel(nivelEstimado);
  }
  // 4. If in uncertainty zone (40-70%), stay at same level to confirm
  else {
    nivelPregunta = nivelEstimado;
  }
  
  // Get question from chosen level
  let question = getRandomQuestion(nivelPregunta, usedIds);
  
  // Fallback: if no questions at chosen level, try estimated level
  if (!question) {
    question = getRandomQuestion(nivelEstimado, usedIds);
  }
  
  // Final fallback: any available level
  if (!question) {
    const niveles: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];
    for (const n of niveles) {
      question = getRandomQuestion(n, usedIds);
      if (question) break;
    }
  }
  
  return question ? shuffleOptions(question) : null;
};

// ==================== Level Calculation ====================

const NIVELES_ORDER: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];

/**
 * Helper to count correct answers by level
 */
const countByLevel = (respuestas: RespuestaDetalle[]) => {
  const correctas: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
  const total: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
  
  respuestas.forEach(r => {
    total[r.nivelPregunta]++;
    if (r.correcta) correctas[r.nivelPregunta]++;
  });
  
  return { correctas, total };
};

/**
 * Check if user "dominates" a level (60%+ correct with minimum 2 questions)
 */
const dominaNivel = (correctas: number, total: number): boolean => {
  if (total < 2) return false;
  return correctas / total >= 0.6;
};

/**
 * Check if user is clearly failing a level (<40% with minimum 2 questions)
 */
const fallaNivel = (correctas: number, total: number): boolean => {
  if (total < 2) return false;
  return correctas / total < 0.4;
};

/**
 * Adjusts the estimated level using a "gates" system:
 * - Only progresses to next level if current level is dominated
 * - Drops back if failing at current level or if lower levels aren't dominated
 */
export const adjustNivelEstimado = (
  respuestas: RespuestaDetalle[],
  currentNivel: Nivel
): Nivel => {
  if (respuestas.length < 2) {
    return currentNivel;
  }
  
  const { correctas, total } = countByLevel(respuestas);
  
  // Gate system: must dominate previous levels to stay at current level
  
  if (currentNivel === 'inicial') {
    // Can only go up if dominating inicial
    if (dominaNivel(correctas.inicial, total.inicial)) {
      return 'intermedio';
    }
    return 'inicial';
  }
  
  if (currentNivel === 'intermedio') {
    // Must have dominated inicial (if we asked inicial questions)
    if (total.inicial >= 2 && !dominaNivel(correctas.inicial, total.inicial)) {
      return 'inicial';
    }
    // Failing intermedio? Go back to inicial
    if (fallaNivel(correctas.intermedio, total.intermedio)) {
      return 'inicial';
    }
    // Dominating intermedio? Go to avanzado
    if (dominaNivel(correctas.intermedio, total.intermedio)) {
      return 'avanzado';
    }
    return 'intermedio';
  }
  
  if (currentNivel === 'avanzado') {
    // Must have dominated intermedio
    if (total.intermedio >= 2 && !dominaNivel(correctas.intermedio, total.intermedio)) {
      return 'intermedio';
    }
    // Failing avanzado? Go back to intermedio
    if (fallaNivel(correctas.avanzado, total.avanzado)) {
      return 'intermedio';
    }
    // Dominating avanzado? Go to expert
    if (dominaNivel(correctas.avanzado, total.avanzado)) {
      return 'expert';
    }
    return 'avanzado';
  }
  
  // Expert level
  if (total.avanzado >= 2 && !dominaNivel(correctas.avanzado, total.avanzado)) {
    return 'avanzado';
  }
  // Failing expert? Go back to avanzado
  if (fallaNivel(correctas.expert, total.expert)) {
    return 'avanzado';
  }
  
  return 'expert';
};

/**
 * Calculates the final level based on all responses with prerequisite validation:
 * - Must dominate lower levels to be classified at a higher level
 */
export const calculateFinalLevel = (respuestas: RespuestaDetalle[]): Nivel => {
  const { correctas, total } = countByLevel(respuestas);

  // Calculate rates
  const inicialRate = total.inicial > 0 ? correctas.inicial / total.inicial : 1;
  const intermedioRate = total.intermedio > 0 ? correctas.intermedio / total.intermedio : 0;
  const avanzadoRate = total.avanzado > 0 ? correctas.avanzado / total.avanzado : 0;
  const expertRate = total.expert > 0 ? correctas.expert / total.expert : 0;

  // Prerequisite system (gates):
  // To be at a level, must have acceptable performance at all lower levels
  
  // Check inicial mastery (≥50% or no questions asked)
  const dominaInicial = total.inicial < 2 || inicialRate >= 0.5;
  
  // Check intermedio mastery (≥50% AND domina inicial)
  const dominaIntermedio = dominaInicial && total.intermedio >= 2 && intermedioRate >= 0.5;
  
  // Check avanzado mastery (≥50% AND domina intermedio)
  const dominaAvanzado = dominaIntermedio && total.avanzado >= 2 && avanzadoRate >= 0.5;
  
  // Check expert mastery (≥60% AND domina avanzado)
  const dominaExpert = dominaAvanzado && total.expert >= 2 && expertRate >= 0.6;

  // Return highest dominated level
  if (dominaExpert) return 'expert';
  if (dominaAvanzado) return 'avanzado';
  if (dominaIntermedio) return 'intermedio';
  return 'inicial';
};

/**
 * Determines if the test should end based on performance patterns
 * - End early if user is clearly at inicial level
 * - Need more questions to confirm higher levels
 */
export const shouldEndTest = (
  respuestas: RespuestaDetalle[],
  currentNivel: Nivel
): boolean => {
  const total = respuestas.length;
  
  // Hard limits
  if (total >= MAX_PREGUNTAS) return true;
  if (total < MIN_PREGUNTAS) return false;
  
  const { correctas, total: totalPorNivel } = countByLevel(respuestas);
  
  // For inicial: end faster if clearly struggling
  if (currentNivel === 'inicial') {
    // If we have 3+ inicial questions and failing, we have enough data
    if (totalPorNivel.inicial >= 3 && correctas.inicial / totalPorNivel.inicial < 0.5) {
      return true;
    }
    // Or if just consistently failing overall
    const ultimas4 = respuestas.slice(-4);
    const correctasUltimas4 = ultimas4.filter(r => r.correcta).length;
    if (correctasUltimas4 <= 1) return true;
  }
  
  // For intermedio: need some questions at this level
  if (currentNivel === 'intermedio') {
    if (totalPorNivel.intermedio >= 3) {
      // Stable at intermedio if moderate performance
      const rate = correctas.intermedio / totalPorNivel.intermedio;
      if (rate >= 0.4 && rate <= 0.6 && total >= 10) return true;
    }
  }
  
  // For high levels: need more questions to confirm
  if (currentNivel === 'avanzado' || currentNivel === 'expert') {
    if (total < MIN_PREGUNTAS_NIVEL_ALTO) return false;
    
    // Check if we have enough questions at this level
    const nivelQuestions = currentNivel === 'expert' ? totalPorNivel.expert : totalPorNivel.avanzado;
    const nivelCorrectas = currentNivel === 'expert' ? correctas.expert : correctas.avanzado;
    
    if (nivelQuestions >= 3) {
      const rate = nivelCorrectas / nivelQuestions;
      // Confirmed at high level or clearly not at this level
      if (rate >= 0.6 || rate < 0.4) return true;
    }
  }
  
  return false;
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

