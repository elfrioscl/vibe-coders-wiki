import { useState, useCallback } from "react";
import { testQuestions } from "@/data/testQuestions";
import { supabase } from "@/integrations/supabase/client";
import {
  Nivel,
  TestPhase,
  RespuestaDetalle,
  ShuffledQuestion,
  TestStats,
  QUESTIONS_VERSION,
  PREGUNTAS_CALIBRACION,
  selectNextQuestion,
  adjustNivelEstimado,
  calculateFinalLevel,
  shouldEndTest,
  evaluarCalibracion,
  determinarFase,
  detectarNoSeConsecutivos,
  detectarRebote,
  getNivelInferiorRebote,
  calculateProgress,
  getAnonymousId,
  getAnonymousLocation,
} from "@/utils/testLogic";

export type TestViewState = 'intro' | 'testing' | 'results';

interface UseAdaptiveTestReturn {
  // State
  state: TestViewState;
  currentQuestion: ShuffledQuestion | null;
  respuestas: RespuestaDetalle[];
  nivelFinal: Nivel | null;
  stats: TestStats | null;
  isTransitioning: boolean;
  selectedOption: number | null;
  shareId: string | null;
  savedTiempoTotal: number | null;
  startTime: number;
  
  // v2.1 State
  phase: TestPhase;
  currentNivelEstimado: Nivel;
  progressPercent: number;
  
  // Computed
  preguntasRespondidas: number;
  preguntasCorrectas: number;
  preguntasNoSabe: number;
  
  // Actions
  startTest: () => void;
  handleAnswer: (optionIndex: number | 'no-se') => Promise<void>;
  loadSavedResult: (resultId: string) => Promise<void>;
  setShowShareModal: (show: boolean) => void;
  showShareModal: boolean;
  setSearchParams: (params: Record<string, string>) => void;
}

interface UseAdaptiveTestProps {
  setSearchParams: (params: Record<string, string>) => void;
}

export function useAdaptiveTest({ setSearchParams }: UseAdaptiveTestProps): UseAdaptiveTestReturn {
  // Core test state
  const [state, setState] = useState<TestViewState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState<ShuffledQuestion | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [respuestas, setRespuestas] = useState<RespuestaDetalle[]>([]);
  
  // v2.1 Algorithm state
  const [phase, setPhase] = useState<TestPhase>('calibracion');
  const [currentNivelEstimado, setCurrentNivelEstimado] = useState<Nivel>('inicial');
  const [historialNiveles, setHistorialNiveles] = useState<Nivel[]>(['inicial']);
  const [techoDetectado, setTechoDetectado] = useState(false);
  const [saltoRealizado, setSaltoRealizado] = useState(false);
  
  // Timing state
  const [startTime, setStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [savedTiempoTotal, setSavedTiempoTotal] = useState<number | null>(null);
  
  // UI state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Results state
  const [nivelFinal, setNivelFinal] = useState<Nivel | null>(null);
  const [stats, setStats] = useState<TestStats | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);

  // Computed values
  const preguntasRespondidas = respuestas.length;
  const preguntasCorrectas = respuestas.filter(r => r.correcta).length;
  const preguntasNoSabe = respuestas.filter(r => r.noSabe).length;
  const progressPercent = calculateProgress(preguntasRespondidas, currentNivelEstimado, techoDetectado);

  // Fetch comparative statistics
  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_test_statistics');
      
      if (error) throw error;
      
      const statsData = data as {
        total_tests: number;
        porcentaje_inicial: number;
        porcentaje_intermedio: number;
        porcentaje_avanzado: number;
        porcentaje_expert: number;
        tiempo_promedio: number;
      } | null;
      
      setStats({
        totalTests: statsData?.total_tests || 0,
        porcentajePorNivel: {
          inicial: statsData?.porcentaje_inicial || 0,
          intermedio: statsData?.porcentaje_intermedio || 0,
          avanzado: statsData?.porcentaje_avanzado || 0,
          expert: statsData?.porcentaje_expert || 0
        },
        tiempoPromedio: statsData?.tiempo_promedio || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Save results to database
  const saveResults = async (
    nivel: Nivel, 
    tiempoTotal: number, 
    respuestasFinales: RespuestaDetalle[]
  ): Promise<string | null> => {
    try {
      const location = getAnonymousLocation();
      const { data, error } = await supabase.functions.invoke('submit-test-result', {
        body: {
          anonymous_id: getAnonymousId(),
          nivel_resultado: nivel,
          preguntas_respondidas: respuestasFinales.length,
          respuestas_correctas: respuestasFinales.filter(r => r.correcta).length,
          tiempo_total_segundos: tiempoTotal,
          respuestas_detalle: respuestasFinales,
          idioma_navegador: location.idioma_navegador,
          pais_inferido: location.pais_inferido,
          zona_horaria: location.zona_horaria
        }
      });

      if (error) {
        console.error('Error saving results:', error);
        return null;
      }

      if (data?.error === 'Rate limit exceeded') {
        console.warn('Rate limit exceeded:', data.message);
        return null;
      }

      const resultId = data?.data?.id;
      const resultShareId = data?.data?.share_id;
      
      if (resultShareId) {
        setShareId(resultShareId);
      }
      
      if (resultId) {
        setSearchParams({ result: resultId });
        return resultId;
      }
      return null;
    } catch (error) {
      console.error('Error saving results:', error);
      return null;
    }
  };

  // End the test and calculate final level
  const endTest = async (nuevasRespuestas: RespuestaDetalle[], nivelOverride?: Nivel) => {
    const tiempoTotal = Math.round((Date.now() - startTime) / 1000);
    const nivelCalculado = nivelOverride || calculateFinalLevel(nuevasRespuestas);
    setNivelFinal(nivelCalculado);
    await saveResults(nivelCalculado, tiempoTotal, nuevasRespuestas);
    await fetchStats();
    setState('results');
  };

  // Start the test
  const startTest = useCallback(() => {
    if (testQuestions.length === 0) return;
    
    // Reset all state
    setPhase('calibracion');
    setCurrentNivelEstimado('inicial');
    setHistorialNiveles(['inicial']);
    setTechoDetectado(false);
    setSaltoRealizado(false);
    setRespuestas([]);
    setUsedQuestionIds(new Set());
    
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    
    // First question is always from Inicial (calibration phase)
    const firstQuestion = selectNextQuestion('inicial', new Set(), [], 'calibracion');
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
      setUsedQuestionIds(new Set([firstQuestion.original.id]));
      setState('testing');
    }
  }, []);

  // Handle answer submission
  const handleAnswer = async (optionIndex: number | 'no-se') => {
    if (!currentQuestion || isTransitioning) return;
    
    const isNoSabe = optionIndex === 'no-se';
    setSelectedOption(isNoSabe ? -1 : optionIndex as number);
    setIsTransitioning(true);
    
    const isCorrect = !isNoSabe && optionIndex === currentQuestion.shuffledCorrectAnswer;
    const tiempoPregunta = Math.round((Date.now() - questionStartTime) / 1000);
    
    const nuevaRespuesta: RespuestaDetalle = {
      preguntaId: currentQuestion.original.id,
      nivelPregunta: currentQuestion.original.level,
      correcta: isCorrect,
      noSabe: isNoSabe,
      tiempoSegundos: tiempoPregunta,
      opcionSeleccionada: isNoSabe ? null : (optionIndex as number),
      opcionCorrecta: currentQuestion.original.correctAnswer,
      questionsVersion: QUESTIONS_VERSION
    };
    
    const nuevasRespuestas = [...respuestas, nuevaRespuesta];
    setRespuestas(nuevasRespuestas);
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUsedIds = new Set([...usedQuestionIds, currentQuestion.original.id]);
    setUsedQuestionIds(newUsedIds);
    
    // v2.1: Detect 3 consecutive "no lo sé"
    const noSeConsecutivos = detectarNoSeConsecutivos(nuevasRespuestas);
    if (noSeConsecutivos && !techoDetectado) {
      setTechoDetectado(true);
    }
    
    // Determine current phase
    let currentPhase = phase;
    let nuevoNivel = currentNivelEstimado;
    let nuevoHistorial = [...historialNiveles];
    
    // v2.1: Calibration phase logic
    if (phase === 'calibracion' && nuevasRespuestas.length >= PREGUNTAS_CALIBRACION) {
      const calibracion = evaluarCalibracion(nuevasRespuestas);
      
      if (calibracion.saltar) {
        // Jump to Avanzado
        nuevoNivel = 'avanzado';
        setSaltoRealizado(true);
      } else {
        nuevoNivel = 'inicial';
      }
      
      currentPhase = 'discriminacion';
      setPhase('discriminacion');
      nuevoHistorial = [...nuevoHistorial, nuevoNivel];
    } 
    // v2.1: Discrimination and Convergence phases
    else if (phase !== 'calibracion') {
      // Update phase based on question count
      const newPhase = determinarFase(nuevasRespuestas.length, saltoRealizado);
      if (newPhase !== phase) {
        currentPhase = newPhase;
        setPhase(newPhase);
      }
      
      // Adjust estimated level
      nuevoNivel = adjustNivelEstimado(nuevasRespuestas, currentNivelEstimado, currentPhase);
      
      // Track level history for bounce detection
      if (nuevoNivel !== currentNivelEstimado) {
        nuevoHistorial = [...nuevoHistorial, nuevoNivel];
      }
    }
    
    setCurrentNivelEstimado(nuevoNivel);
    setHistorialNiveles(nuevoHistorial);
    
    // v2.1: Detect bounce pattern
    const reboteDetectado = detectarRebote(nuevoHistorial);
    
    // v2.1: Check if test should end
    const puedeTerminar = shouldEndTest(
      nuevasRespuestas, 
      nuevoNivel, 
      techoDetectado || noSeConsecutivos,
      reboteDetectado
    );
    
    if (puedeTerminar) {
      // If bounce detected, use lower level
      if (reboteDetectado) {
        const nivelInferior = getNivelInferiorRebote(nuevoHistorial);
        await endTest(nuevasRespuestas, nivelInferior);
      } 
      // If ceiling detected by "no lo sé", use previous level
      else if (noSeConsecutivos && nuevoNivel !== 'inicial') {
        const nivelAnterior = nuevoHistorial.length > 1 
          ? nuevoHistorial[nuevoHistorial.length - 2] 
          : 'inicial';
        await endTest(nuevasRespuestas, nivelAnterior as Nivel);
      }
      else {
        await endTest(nuevasRespuestas);
      }
    } else {
      // Get next question based on phase
      const nextQuestion = selectNextQuestion(nuevoNivel, newUsedIds, nuevasRespuestas, currentPhase);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setQuestionStartTime(Date.now());
      } else {
        // No more questions available, end test
        await endTest(nuevasRespuestas);
      }
    }
    
    setSelectedOption(null);
    setIsTransitioning(false);
  };

  // Load a previously saved result
  const loadSavedResult = useCallback(async (resultId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-test-result', {
        body: {
          result_id: resultId,
          anonymous_id: getAnonymousId()
        }
      });

      if (error || !data?.success) {
        console.error('Error loading saved result:', error || data?.error);
        setSearchParams({});
        return;
      }

      const result = data.data;
      
      setNivelFinal(result.nivel_resultado as Nivel);
      setRespuestas(result.respuestas_detalle || []);
      setSavedTiempoTotal(result.tiempo_total_segundos);
      
      // Set shareId if available so sharing works on loaded results
      if (result.share_id) {
        setShareId(result.share_id);
      }
      
      setState('results');
      
      await fetchStats();
    } catch (error) {
      console.error('Error loading saved result:', error);
      setSearchParams({});
    }
  }, [setSearchParams]);

  return {
    // State
    state,
    currentQuestion,
    respuestas,
    nivelFinal,
    stats,
    isTransitioning,
    selectedOption,
    shareId,
    savedTiempoTotal,
    startTime,
    
    // v2.1 State
    phase,
    currentNivelEstimado,
    progressPercent,
    
    // Computed
    preguntasRespondidas,
    preguntasCorrectas,
    preguntasNoSabe,
    
    // Actions
    startTest,
    handleAnswer,
    loadSavedResult,
    setShowShareModal,
    showShareModal,
    setSearchParams,
  };
}
