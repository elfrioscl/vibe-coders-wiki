import { testQuestions, TestQuestion } from "@/data/testQuestions";
import { timezoneToCountry } from "./timezoneCountryMap";

// ==================== Types ====================

export type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';
export type TestPhase = 'calibracion' | 'discriminacion' | 'convergencia';

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

export interface TestState {
  phase: TestPhase;
  nivelEstimado: Nivel;
  techoDetectado: boolean;
  historialNiveles: Nivel[];
}

// ==================== Constants (v2.1) ====================

export const ANONYMOUS_ID_KEY = 'vibe-test-anonymous-id';
export const MIN_PREGUNTAS = 8;
export const MAX_PREGUNTAS = 15;
export const MIN_PREGUNTAS_EXPERT = 12;
export const UMBRAL_DOMINIO = 0.65;
export const UMBRAL_FALLO = 0.40;
export const NO_SE_CONSECUTIVOS_LIMITE = 3;
export const PREGUNTAS_CALIBRACION = 3;
export const QUESTIONS_VERSION = '2026-01-02-v2';

const NIVELES_ORDER: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];

export const nivelDescripciones: Record<Nivel, { titulo: string; descripcion: string; color: string; emoji: string }> = {
  inicial: {
    titulo: "Nivel Inicial",
    descripcion: "Estás comenzando tu viaje en vibe coding. Tienes curiosidad y las bases para empezar a crear con IA, pero aún hay mucho por explorar.",
    color: "text-green-500",
    emoji: "🌱"
  },
  intermedio: {
    titulo: "Nivel Intermedio", 
    descripcion: "Ya tienes experiencia con vibe coding. Sabes usar prompts efectivos y entiendes cómo colaborar con la IA para crear proyectos funcionales.",
    color: "text-yellow-500",
    emoji: "🚀"
  },
  avanzado: {
    titulo: "Nivel Avanzado",
    descripcion: "Dominas el arte del vibe coding. Puedes crear proyectos complejos, depurar eficientemente y sacar el máximo provecho de las herramientas de IA.",
    color: "text-purple-500",
    emoji: "⚡"
  },
  expert: {
    titulo: "Nivel Expert",
    descripcion: "Dominas el vibe coding a nivel profesional. Manejas arquitectura avanzada, seguridad, optimización y las técnicas más sofisticadas para crear productos de alta calidad con IA.",
    color: "text-amber-500",
    emoji: "🏆"
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
  const idx = NIVELES_ORDER.indexOf(nivel);
  return idx < NIVELES_ORDER.length - 1 ? NIVELES_ORDER[idx + 1] : nivel;
};

/**
 * Get the previous level in the hierarchy
 */
const getPreviousNivel = (nivel: Nivel): Nivel => {
  const idx = NIVELES_ORDER.indexOf(nivel);
  return idx > 0 ? NIVELES_ORDER[idx - 1] : nivel;
};

// ==================== Level Calculation (v2.1) ====================

/**
 * Helper to count correct answers by level
 * "No lo sé" counts as incorrect (in total but not in correctas)
 */
export const countByLevel = (respuestas: RespuestaDetalle[]) => {
  const correctas: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
  const total: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
  
  respuestas.forEach(r => {
    total[r.nivelPregunta]++;
    // Only count as correct if actually correct (noSabe counts as incorrect)
    if (r.correcta) correctas[r.nivelPregunta]++;
  });
  
  return { correctas, total };
};

/**
 * Check if user "dominates" a level (≥65% correct with minimum 2 questions)
 */
const dominaNivel = (correctas: number, total: number): boolean => {
  if (total < 2) return false;
  return correctas / total >= UMBRAL_DOMINIO;
};

/**
 * Check if user is clearly failing a level (<40% with minimum 2 questions)
 */
const fallaNivel = (correctas: number, total: number): boolean => {
  if (total < 2) return false;
  return correctas / total < UMBRAL_FALLO;
};

// ==================== Phase Detection (v2.1) ====================

/**
 * Detect 3 consecutive "no lo sé" responses
 */
export const detectarNoSeConsecutivos = (respuestas: RespuestaDetalle[]): boolean => {
  if (respuestas.length < NO_SE_CONSECUTIVOS_LIMITE) return false;
  
  const ultimasN = respuestas.slice(-NO_SE_CONSECUTIVOS_LIMITE);
  return ultimasN.every(r => r.noSabe);
};

/**
 * Detect bounce pattern: A → B → A (oscillating between levels)
 */
export const detectarRebote = (historialNiveles: Nivel[]): boolean => {
  if (historialNiveles.length < 3) return false;
  
  const ultimos3 = historialNiveles.slice(-3);
  // Pattern: same level at position 0 and 2, different at position 1
  return ultimos3[0] === ultimos3[2] && ultimos3[0] !== ultimos3[1];
};

/**
 * Get the lower level from the bounce pattern
 */
export const getNivelInferiorRebote = (historialNiveles: Nivel[]): Nivel => {
  if (historialNiveles.length < 3) return 'inicial';
  
  const ultimos3 = historialNiveles.slice(-3);
  const nivel1 = ultimos3[0];
  const nivel2 = ultimos3[1];
  
  const idx1 = NIVELES_ORDER.indexOf(nivel1);
  const idx2 = NIVELES_ORDER.indexOf(nivel2);
  
  return idx1 < idx2 ? nivel1 : nivel2;
};

/**
 * Evaluate calibration phase (after 3 initial questions)
 * Returns whether to jump to Avanzado or stay in Inicial
 */
export const evaluarCalibracion = (respuestas: RespuestaDetalle[]): { saltar: boolean; destino: Nivel } => {
  const respuestasIniciales = respuestas.filter(r => r.nivelPregunta === 'inicial');
  
  if (respuestasIniciales.length < PREGUNTAS_CALIBRACION) {
    return { saltar: false, destino: 'inicial' };
  }
  
  const correctas = respuestasIniciales.filter(r => r.correcta).length;
  const todasNoSabe = respuestasIniciales.every(r => r.noSabe);
  
  // If all "no lo sé", stay in Inicial
  if (todasNoSabe) {
    return { saltar: false, destino: 'inicial' };
  }
  
  // If 2-3 correct out of 3, jump to Avanzado
  if (correctas >= 2) {
    return { saltar: true, destino: 'avanzado' };
  }
  
  // 0-1 correct, stay in Inicial
  return { saltar: false, destino: 'inicial' };
};

/**
 * Determine current phase based on number of questions
 */
export const determinarFase = (numPreguntas: number, saltoRealizado: boolean): TestPhase => {
  if (numPreguntas < PREGUNTAS_CALIBRACION) {
    return 'calibracion';
  }
  
  if (numPreguntas < 6) {
    return 'discriminacion';
  }
  
  return 'convergencia';
};

// ==================== Question Selection (v2.1) ====================

/**
 * Selects the next question based on phase and performance
 */
export const selectNextQuestion = (
  nivelEstimado: Nivel, 
  usedIds: Set<string>,
  respuestas: RespuestaDetalle[] = [],
  phase: TestPhase = 'convergencia'
): ShuffledQuestion | null => {
  let nivelPregunta: Nivel;
  
  // Phase-specific logic
  if (phase === 'calibracion') {
    // Always ask Inicial questions during calibration
    nivelPregunta = 'inicial';
  } else if (phase === 'discriminacion') {
    // Ask questions from the estimated level (could be Avanzado after jump)
    nivelPregunta = nivelEstimado;
  } else {
    // Convergence phase: use discriminating logic
    const { correctas, total } = countByLevel(respuestas);
    
    const nivelActualTotal = total[nivelEstimado];
    const nivelActualRate = nivelActualTotal > 0 
      ? correctas[nivelEstimado] / nivelActualTotal 
      : 0.5;
    
    // If few questions at current level (<3), keep asking from same level
    if (nivelActualTotal < 3) {
      nivelPregunta = nivelEstimado;
    }
    // If clearly dominating (≥65%), try next level
    else if (nivelActualRate >= UMBRAL_DOMINIO && nivelEstimado !== 'expert') {
      nivelPregunta = getNextNivel(nivelEstimado);
    }
    // If clearly failing (<40%), confirm with previous level
    else if (nivelActualRate < UMBRAL_FALLO && nivelEstimado !== 'inicial') {
      nivelPregunta = getPreviousNivel(nivelEstimado);
    }
    // If in uncertainty zone, stay at same level to confirm
    else {
      nivelPregunta = nivelEstimado;
    }
  }
  
  // Get question from chosen level
  let question = getRandomQuestion(nivelPregunta, usedIds);
  
  // Fallback: if no questions at chosen level, try estimated level
  if (!question) {
    question = getRandomQuestion(nivelEstimado, usedIds);
  }
  
  // Final fallback: any available level
  if (!question) {
    for (const n of NIVELES_ORDER) {
      question = getRandomQuestion(n, usedIds);
      if (question) break;
    }
  }
  
  return question ? shuffleOptions(question) : null;
};

// ==================== Level Adjustment (v2.1) ====================

/**
 * Adjusts the estimated level based on responses
 * Uses unified 65% threshold for domination
 */
export const adjustNivelEstimado = (
  respuestas: RespuestaDetalle[],
  currentNivel: Nivel,
  phase: TestPhase
): Nivel => {
  if (respuestas.length < 2) {
    return currentNivel;
  }
  
  const { correctas, total } = countByLevel(respuestas);
  
  // During calibration, always stay at inicial
  if (phase === 'calibracion') {
    return 'inicial';
  }
  
  // Discrimination phase after jumping to Avanzado
  if (phase === 'discriminacion' && currentNivel === 'avanzado') {
    const avanzadoTotal = total.avanzado;
    const avanzadoCorrectas = correctas.avanzado;
    
    if (avanzadoTotal >= 2) {
      if (avanzadoCorrectas === avanzadoTotal) {
        // 2/2 correct, try Expert
        return 'expert';
      } else if (avanzadoCorrectas === 0) {
        // 0/2 correct, go to Intermedio
        return 'intermedio';
      }
      // 1/2 correct, need tiebreaker - stay at avanzado
    }
    return currentNivel;
  }
  
  // Convergence phase: standard gate logic
  if (currentNivel === 'inicial') {
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
    if (fallaNivel(correctas.intermedio, total.intermedio)) {
      return 'inicial';
    }
    if (dominaNivel(correctas.intermedio, total.intermedio)) {
      return 'avanzado';
    }
    return 'intermedio';
  }
  
  if (currentNivel === 'avanzado') {
    // Check if we need to validate intermedio (only if we have data)
    if (total.intermedio >= 2 && !dominaNivel(correctas.intermedio, total.intermedio)) {
      return 'intermedio';
    }
    if (fallaNivel(correctas.avanzado, total.avanzado)) {
      return 'intermedio';
    }
    if (dominaNivel(correctas.avanzado, total.avanzado)) {
      return 'expert';
    }
    return 'avanzado';
  }
  
  // Expert level
  if (total.avanzado >= 2 && !dominaNivel(correctas.avanzado, total.avanzado)) {
    return 'avanzado';
  }
  if (fallaNivel(correctas.expert, total.expert)) {
    return 'avanzado';
  }
  
  return 'expert';
};

// ==================== Final Level Calculation (v2.1) ====================

/**
 * Calculates the final level with inheritance rule:
 * If user jumped level X and dominates X+1, they dominate X implicitly
 */
export const calculateFinalLevel = (respuestas: RespuestaDetalle[]): Nivel => {
  const { correctas, total } = countByLevel(respuestas);

  // Calculate rates
  const inicialRate = total.inicial > 0 ? correctas.inicial / total.inicial : 1;
  const intermedioRate = total.intermedio > 0 ? correctas.intermedio / total.intermedio : 0;
  const avanzadoRate = total.avanzado > 0 ? correctas.avanzado / total.avanzado : 0;
  const expertRate = total.expert > 0 ? correctas.expert / total.expert : 0;

  // Check inicial mastery (≥65% or insufficient questions - inheritance applies)
  const dominaInicial = total.inicial < 2 || inicialRate >= UMBRAL_DOMINIO;
  
  // Check intermedio mastery with inheritance rule:
  // If we skipped intermedio (total.intermedio < 2) but dominate avanzado, inherit intermedio
  const dominaAvanzadoDirecto = total.avanzado >= 2 && avanzadoRate >= 0.5;
  const dominaIntermedio = dominaInicial && (
    (total.intermedio >= 2 && intermedioRate >= 0.5) ||
    (total.intermedio < 2 && dominaAvanzadoDirecto) // Inheritance rule
  );
  
  // Check avanzado mastery (≥50% AND domina intermedio)
  const dominaAvanzado = dominaIntermedio && total.avanzado >= 2 && avanzadoRate >= 0.5;
  
  // Check expert mastery (≥65% AND domina avanzado)
  const dominaExpert = dominaAvanzado && total.expert >= 2 && expertRate >= UMBRAL_DOMINIO;

  // Return highest dominated level
  if (dominaExpert) return 'expert';
  if (dominaAvanzado) return 'avanzado';
  if (dominaIntermedio) return 'intermedio';
  return 'inicial';
};

// ==================== Test Termination (v2.1) ====================

/**
 * Determines if the test should end based on v2.1 rules
 */
export const shouldEndTest = (
  respuestas: RespuestaDetalle[],
  currentNivel: Nivel,
  techoDetectado: boolean = false,
  reboteDetectado: boolean = false
): boolean => {
  const numPreguntas = respuestas.length;
  
  // Priority 1: Max questions reached
  if (numPreguntas >= MAX_PREGUNTAS) return true;
  
  // Priority 2: 3 consecutive "no lo sé" (but respect MIN if not reached)
  if (techoDetectado && numPreguntas >= MIN_PREGUNTAS) return true;
  
  // Priority 3: Bounce detected
  if (reboteDetectado && numPreguntas >= MIN_PREGUNTAS) return true;
  
  // Priority 4: Must continue until MIN_PREGUNTAS
  if (numPreguntas < MIN_PREGUNTAS) return false;
  
  const { correctas, total: totalPorNivel } = countByLevel(respuestas);
  
  // Priority 5: Level stable for 3+ questions
  if (currentNivel === 'inicial') {
    if (totalPorNivel.inicial >= 3 && correctas.inicial / totalPorNivel.inicial < 0.5) {
      return true;
    }
    // Pattern of consistent failure
    const ultimas4 = respuestas.slice(-4);
    const correctasUltimas4 = ultimas4.filter(r => r.correcta).length;
    if (correctasUltimas4 <= 1) return true;
  }
  
  if (currentNivel === 'intermedio') {
    if (totalPorNivel.intermedio >= 3) {
      const rate = correctas.intermedio / totalPorNivel.intermedio;
      // Stable at intermedio if moderate performance
      if (rate >= UMBRAL_FALLO && rate < UMBRAL_DOMINIO && numPreguntas >= 10) return true;
    }
  }
  
  // Priority 6: Expert needs 12+ questions and ≥65%
  if (currentNivel === 'expert') {
    if (numPreguntas >= MIN_PREGUNTAS_EXPERT) {
      if (totalPorNivel.expert >= 3) {
        const rate = correctas.expert / totalPorNivel.expert;
        if (rate >= UMBRAL_DOMINIO || rate < UMBRAL_FALLO) return true;
      }
    }
    return false; // Keep going until we have enough data
  }
  
  if (currentNivel === 'avanzado') {
    if (numPreguntas < MIN_PREGUNTAS_EXPERT) return false;
    
    if (totalPorNivel.avanzado >= 3) {
      const rate = correctas.avanzado / totalPorNivel.avanzado;
      if (rate >= UMBRAL_DOMINIO || rate < UMBRAL_FALLO) return true;
    }
  }
  
  return false;
};

/**
 * Calculate adaptive progress percentage
 * Starts assuming MAX_PREGUNTAS, adjusts if early termination is likely
 */
export const calculateProgress = (
  numPreguntas: number,
  currentNivel: Nivel,
  techoDetectado: boolean
): number => {
  let estimatedTotal = MAX_PREGUNTAS;
  
  // If ceiling detected, estimate fewer questions
  if (techoDetectado) {
    estimatedTotal = Math.max(MIN_PREGUNTAS, numPreguntas + 2);
  }
  // If clearly at inicial level, test will likely end at MIN_PREGUNTAS
  else if (currentNivel === 'inicial' && numPreguntas >= 5) {
    estimatedTotal = MIN_PREGUNTAS;
  }
  // For high levels, need more questions
  else if (currentNivel === 'expert' || currentNivel === 'avanzado') {
    estimatedTotal = MIN_PREGUNTAS_EXPERT;
  }
  
  return Math.min(100, (numPreguntas / estimatedTotal) * 100);
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
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  
  return {
    idioma_navegador: lang || null,
    pais_inferido: timezone ? (timezoneToCountry[timezone] ?? null) : null,
    zona_horaria: timezone
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
