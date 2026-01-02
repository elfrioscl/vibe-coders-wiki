import { useState, useCallback } from "react";
import { testQuestions } from "@/data/testQuestions";
import { supabase } from "@/integrations/supabase/client";
import {
  Nivel,
  RespuestaDetalle,
  ShuffledQuestion,
  TestStats,
  QUESTIONS_VERSION,
  selectNextQuestion,
  adjustNivelEstimado,
  calculateFinalLevel,
  shouldEndTest,
  getAnonymousId,
  getAnonymousLocation,
} from "@/utils/testLogic";

export type TestState = 'intro' | 'testing' | 'results';

interface UseAdaptiveTestReturn {
  // State
  state: TestState;
  currentQuestion: ShuffledQuestion | null;
  respuestas: RespuestaDetalle[];
  nivelFinal: Nivel | null;
  stats: TestStats | null;
  isTransitioning: boolean;
  selectedOption: number | null;
  shareId: string | null;
  savedTiempoTotal: number | null;
  startTime: number;
  
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
  const [state, setState] = useState<TestState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState<ShuffledQuestion | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [respuestas, setRespuestas] = useState<RespuestaDetalle[]>([]);
  
  // Adaptive algorithm state
  const [currentNivelEstimado, setCurrentNivelEstimado] = useState<Nivel>('inicial');
  
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

  // Start the test
  const startTest = useCallback(() => {
    if (testQuestions.length === 0) return;
    
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    
    const firstQuestion = selectNextQuestion('inicial', new Set());
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
    
    // Calculate new estimated level using sliding window
    const nuevoNivel = adjustNivelEstimado(nuevasRespuestas, currentNivelEstimado);
    setCurrentNivelEstimado(nuevoNivel);
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUsedIds = new Set([...usedQuestionIds, currentQuestion.original.id]);
    setUsedQuestionIds(newUsedIds);
    
    // Check if test should end based on performance patterns
    const puedeTerminar = shouldEndTest(nuevasRespuestas, nuevoNivel);
    
    if (puedeTerminar) {
      const tiempoTotal = Math.round((Date.now() - startTime) / 1000);
      const nivelCalculado = calculateFinalLevel(nuevasRespuestas);
      setNivelFinal(nivelCalculado);
      await saveResults(nivelCalculado, tiempoTotal, nuevasRespuestas);
      await fetchStats();
      setState('results');
    } else {
      const nextQuestion = selectNextQuestion(nuevoNivel, newUsedIds);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setQuestionStartTime(Date.now());
      } else {
        // No more questions, end test
        const tiempoTotal = Math.round((Date.now() - startTime) / 1000);
        const nivelCalculado = calculateFinalLevel(nuevasRespuestas);
        setNivelFinal(nivelCalculado);
        await saveResults(nivelCalculado, tiempoTotal, nuevasRespuestas);
        await fetchStats();
        setState('results');
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

