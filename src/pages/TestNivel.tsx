import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { testQuestions, TestQuestion } from "@/data/testQuestions";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Trophy, BarChart3, Clock, CheckCircle, HelpCircle, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareLinkedInModal } from "@/components/ShareLinkedInModal";

type TestState = 'intro' | 'testing' | 'results';
type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

interface RespuestaDetalle {
  preguntaId: string;
  nivelPregunta: Nivel;
  correcta: boolean;
  noSabe: boolean;
  tiempoSegundos: number;
  opcionSeleccionada: number | null; // índice de la opción elegida (null si "no sabe")
  opcionCorrecta: number; // índice de la respuesta correcta original
  questionsVersion: string; // versión del banco de preguntas para trazabilidad
}

interface TestStats {
  totalTests: number;
  porcentajePorNivel: Record<Nivel, number>;
  tiempoPromedio: number;
}

const ANONYMOUS_ID_KEY = 'vibe-test-anonymous-id';
const MIN_PREGUNTAS = 8;
const MAX_PREGUNTAS = 15;
const CONFIANZA_REQUERIDA = 3;
const QUESTIONS_VERSION = '2026-01-02-v1'; // Actualizar cuando cambie el banco de preguntas

const nivelDescripciones: Record<Nivel, { titulo: string; descripcion: string; color: string }> = {
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

const getAnonymousId = (): string => {
  let id = localStorage.getItem(ANONYMOUS_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ANONYMOUS_ID_KEY, id);
  }
  return id;
};

const getAnonymousLocation = () => {
  const lang = navigator.language || ''; // "es-CL", "es-MX", "en-US"
  const parts = lang.split('-');
  return {
    idioma_navegador: lang || null,
    pais_inferido: parts[1]?.toUpperCase() || null,
    zona_horaria: Intl.DateTimeFormat().resolvedOptions().timeZone || null
  };
};

const getQuestionsByNivel = (nivel: Nivel): TestQuestion[] => {
  return testQuestions.filter(q => q.level === nivel);
};

// Mínimo de preguntas requerido para niveles altos
const MIN_PREGUNTAS_NIVEL_ALTO = 12;

const getRandomQuestion = (nivel: Nivel, usedIds: Set<string>): TestQuestion | null => {
  const available = getQuestionsByNivel(nivel).filter(q => !usedIds.has(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};

// Interface for shuffled question with randomized options
interface ShuffledQuestion {
  original: TestQuestion;
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
}

// Fisher-Yates shuffle for options
const shuffleOptions = (question: TestQuestion): ShuffledQuestion => {
  const indices = [0, 1, 2, 3];
  
  // Fisher-Yates shuffle
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

const TestNivel = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<TestState>('intro');
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<ShuffledQuestion | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [respuestas, setRespuestas] = useState<RespuestaDetalle[]>([]);
  const [currentNivelEstimado, setCurrentNivelEstimado] = useState<Nivel>('intermedio');
  const [consecutiveSameLevel, setConsecutiveSameLevel] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nivelFinal, setNivelFinal] = useState<Nivel | null>(null);
  const [stats, setStats] = useState<TestStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [savedTiempoTotal, setSavedTiempoTotal] = useState<number | null>(null);

  const preguntasRespondidas = respuestas.length;
  const preguntasCorrectas = respuestas.filter(r => r.correcta).length;
  const preguntasNoSabe = respuestas.filter(r => r.noSabe).length;

  const selectNextQuestion = useCallback((nivel: Nivel, used: Set<string>): ShuffledQuestion | null => {
    let question = getRandomQuestion(nivel, used);
    
    if (!question) {
      const niveles: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];
      for (const n of niveles) {
        if (n !== nivel) {
          question = getRandomQuestion(n, used);
          if (question) break;
        }
      }
    }
    
    return question ? shuffleOptions(question) : null;
  }, []);

  const startTest = () => {
    if (testQuestions.length === 0) {
      return;
    }
    
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    
    const firstQuestion = selectNextQuestion('intermedio', new Set());
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
      setUsedQuestionIds(new Set([firstQuestion.original.id]));
      setState('testing');
    }
  };

  const calculateFinalLevel = (respuestasActuales: RespuestaDetalle[]): Nivel => {
    const correctByLevel: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
    const totalByLevel: Record<Nivel, number> = { inicial: 0, intermedio: 0, avanzado: 0, expert: 0 };
    
    respuestasActuales.forEach(r => {
      totalByLevel[r.nivelPregunta]++;
      if (r.correcta) correctByLevel[r.nivelPregunta]++;
    });

    const expertRate = totalByLevel.expert > 0 ? correctByLevel.expert / totalByLevel.expert : 0;
    const avanzadoRate = totalByLevel.avanzado > 0 ? correctByLevel.avanzado / totalByLevel.avanzado : 0;
    const intermedioRate = totalByLevel.intermedio > 0 ? correctByLevel.intermedio / totalByLevel.intermedio : 0;
    const inicialRate = totalByLevel.inicial > 0 ? correctByLevel.inicial / totalByLevel.inicial : 0;

    // Fallback por porcentaje general (calculado antes para usar en lógica)
    const totalCorrect = respuestasActuales.filter(r => r.correcta).length;
    const totalQuestions = respuestasActuales.length;
    const overallRate = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;

    // PRIMERO: Verificar si falla en niveles bajos
    // Si falla en inicial (< 50% con al menos 2 preguntas), no puede ser más que inicial
    if (totalByLevel.inicial >= 2 && inicialRate < 0.5) {
      return 'inicial';
    }

    // Si falla significativamente en intermedio (< 40% con al menos 3 preguntas)
    if (totalByLevel.intermedio >= 3 && intermedioRate < 0.4) {
      // Solo puede ser intermedio si pasó inicial, sino es inicial
      return (totalByLevel.inicial >= 2 && inicialRate >= 0.5) 
        ? 'intermedio' 
        : 'inicial';
    }

    // LUEGO: Evaluar niveles altos (solo si pasó los bajos)
    // Expert: >= 70% en expert, al menos 4 preguntas expert, y >= 50% en avanzado
    if (expertRate >= 0.7 && totalByLevel.expert >= 4 && avanzadoRate >= 0.5) {
      return 'expert';
    }
    // Avanzado: >= 60% en avanzado, al menos 3 preguntas, y >= 40% en intermedio
    if (avanzadoRate >= 0.6 && totalByLevel.avanzado >= 3 && intermedioRate >= 0.4) {
      return 'avanzado';
    }
    // Intermedio: >= 50% en intermedio, al menos 3 preguntas
    if (intermedioRate >= 0.5 && totalByLevel.intermedio >= 3) {
      return 'intermedio';
    }
    
    // Fallback por porcentaje general
    if (overallRate >= 0.8) return 'expert';
    if (overallRate >= 0.65) return 'avanzado';
    if (overallRate >= 0.4) return 'intermedio';
    return 'inicial';
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      const { data, error } = await supabase.rpc('get_test_statistics');
      
      if (error) throw error;
      
      const stats = data as {
        total_tests: number;
        porcentaje_inicial: number;
        porcentaje_intermedio: number;
        porcentaje_avanzado: number;
        porcentaje_expert: number;
        tiempo_promedio: number;
      } | null;
      
      setStats({
        totalTests: stats?.total_tests || 0,
        porcentajePorNivel: {
          inicial: stats?.porcentaje_inicial || 0,
          intermedio: stats?.porcentaje_intermedio || 0,
          avanzado: stats?.porcentaje_avanzado || 0,
          expert: stats?.porcentaje_expert || 0
        },
        tiempoPromedio: stats?.tiempo_promedio || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const loadSavedResult = useCallback(async (resultId: string) => {
    setIsLoadingResult(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-test-result', {
        body: {
          result_id: resultId,
          anonymous_id: getAnonymousId()
        }
      });

      if (error || !data?.success) {
        console.error('Error loading saved result:', error || data?.error);
        // Clear the invalid result param from URL
        setSearchParams({});
        return;
      }

      const result = data.data;
      
      // Populate state from saved result
      setNivelFinal(result.nivel_resultado as Nivel);
      setRespuestas(result.respuestas_detalle || []);
      setSavedTiempoTotal(result.tiempo_total_segundos);
      setState('results');
      
      // Fetch stats for comparison
      await fetchStats();
    } catch (error) {
      console.error('Error loading saved result:', error);
      setSearchParams({});
    } finally {
      setIsLoadingResult(false);
    }
  }, [setSearchParams]);

  // Check for saved result on mount
  useEffect(() => {
    const resultId = searchParams.get('result');
    if (resultId) {
      loadSavedResult(resultId);
    }
  }, []);

  // Reset selectedOption when question changes (prevents iOS tap state persistence)
  useEffect(() => {
    if (currentQuestion) {
      setSelectedOption(null);
    }
  }, [currentQuestion?.original.id]);

  const saveResults = async (nivel: Nivel, tiempoTotal: number, respuestasFinales: RespuestaDetalle[]): Promise<string | null> => {
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

      // Check for rate limit error
      if (data?.error === 'Rate limit exceeded') {
        console.warn('Rate limit exceeded:', data.message);
        // Results won't be saved but test can still complete
        return null;
      }

      // Return the result ID and update URL
      const resultId = data?.data?.id;
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

  const handleAnswer = async (optionIndex: number | 'no-se') => {
    if (!currentQuestion || isTransitioning) return;
    
    const isNoSabe = optionIndex === 'no-se';
    setSelectedOption(isNoSabe ? -1 : optionIndex as number);
    setIsTransitioning(true);
    
    // Compare against shuffled correct answer
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
    
    // Calcular nuevo nivel estimado
    // "No sé" se trata como incorrecta para el ajuste de nivel
    let nuevoNivel: Nivel = currentNivelEstimado;
    if (isCorrect) {
      if (currentNivelEstimado === 'inicial') nuevoNivel = 'intermedio';
      else if (currentNivelEstimado === 'intermedio') nuevoNivel = 'avanzado';
      else if (currentNivelEstimado === 'avanzado') nuevoNivel = 'expert';
    } else {
      // Incorrecta o "No sé" baja de nivel
      if (currentNivelEstimado === 'expert') nuevoNivel = 'avanzado';
      else if (currentNivelEstimado === 'avanzado') nuevoNivel = 'intermedio';
      else if (currentNivelEstimado === 'intermedio') nuevoNivel = 'inicial';
    }
    
    // Contar consecutivos del mismo nivel
    const newConsecutive = nuevoNivel === currentNivelEstimado ? consecutiveSameLevel + 1 : 1;
    setConsecutiveSameLevel(newConsecutive);
    setCurrentNivelEstimado(nuevoNivel);
    
    // Esperar animación
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Verificar si terminamos
    const totalPreguntas = nuevasRespuestas.length;
    const tieneConfianza = newConsecutive >= CONFIANZA_REQUERIDA;
    const llegaMinimo = totalPreguntas >= MIN_PREGUNTAS;
    const llegaMaximo = totalPreguntas >= MAX_PREGUNTAS;
    
    // Para niveles altos (avanzado/expert), requerir más preguntas para diferenciación
    const esNivelAlto = nuevoNivel === 'avanzado' || nuevoNivel === 'expert';
    const llegaMinimoNivelAlto = totalPreguntas >= MIN_PREGUNTAS_NIVEL_ALTO;
    
    const newUsedIds = new Set([...usedQuestionIds, currentQuestion.original.id]);
    setUsedQuestionIds(newUsedIds);
    
    // Terminación: 
    // - Niveles bajos (inicial/intermedio): puede terminar en 8 con confianza
    // - Niveles altos (avanzado/expert): requiere mínimo 12 preguntas para diferenciación
    const puedeTerminar = esNivelAlto 
      ? (llegaMinimoNivelAlto && tieneConfianza) || llegaMaximo
      : (llegaMinimo && tieneConfianza) || llegaMaximo;
    
    if (puedeTerminar) {
      // Terminar test
      const tiempoTotal = Math.round((Date.now() - startTime) / 1000);
      const nivelCalculado = calculateFinalLevel(nuevasRespuestas);
      setNivelFinal(nivelCalculado);
      await saveResults(nivelCalculado, tiempoTotal, nuevasRespuestas);
      await fetchStats();
      setState('results');
    } else {
      // Siguiente pregunta
      const nextQuestion = selectNextQuestion(nuevoNivel, newUsedIds);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setQuestionStartTime(Date.now());
      } else {
        // No hay más preguntas, terminar
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

  const tiempoTotalCalculado = savedTiempoTotal ?? Math.round((Date.now() - startTime) / 1000);
  const tiempoMinutos = Math.floor(tiempoTotalCalculado / 60);
  const tiempoSegundos = tiempoTotalCalculado % 60;

  const getGuiaPath = (nivel: Nivel) => {
    const paths: Record<Nivel, string> = {
      inicial: '/guias-cursos-vibe-coding/inicial',
      intermedio: '/guias-cursos-vibe-coding/intermedio',
      avanzado: '/guias-cursos-vibe-coding/avanzado',
      expert: '/guias-cursos-vibe-coding/avanzado' // Temporalmente redirige a avanzado hasta crear contenido expert
    };
    return paths[nivel];
  };

  if (isLoadingResult) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 animate-pulse">
              <Trophy className="h-8 w-8 text-accent" />
            </div>
            <h1 className="mb-4 text-2xl font-semibold text-foreground">Cargando resultado...</h1>
            <p className="text-muted-foreground">Recuperando tu resultado guardado</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (testQuestions.length === 0) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-semibold text-foreground">Test de Nivel</h1>
            <p className="text-muted-foreground">El test estará disponible próximamente.</p>
            <Button onClick={() => navigate('/guias')} className="mt-6">
              Volver a Guías
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          {/* Intro */}
          {state === 'intro' && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h1 className="mb-4 text-3xl font-semibold text-foreground">
                Mide tu nivel de Vibe Coding
              </h1>
              <p className="mb-8 text-muted-foreground">
                Este test adaptativo determinará si estás en nivel Inicial, Intermedio, Avanzado o Expert. 
                Las preguntas se ajustan según tus respuestas. No hay límite de tiempo, tómate tu tiempo para pensar.
              </p>
              <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left">
                <h3 className="mb-3 font-medium text-foreground">¿Cómo funciona?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    <span>Entre 8 y 15 preguntas según tu desempeño</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    <span>Las preguntas se adaptan a tu nivel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    <span>Al final recibes tu nivel con estadísticas</span>
                  </li>
                </ul>
              </div>
              <Button size="lg" onClick={startTest}>
                Comenzar test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Testing */}
          {state === 'testing' && currentQuestion && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Pregunta {preguntasRespondidas + 1} de ~{Math.max(MIN_PREGUNTAS, Math.min(preguntasRespondidas + 5, MAX_PREGUNTAS))}</span>
                </div>
                <Progress 
                  value={(preguntasRespondidas / MAX_PREGUNTAS) * 100} 
                  className="h-2"
                />
              </div>

              <Card className="p-6">
                <h2 className="mb-6 text-lg font-medium text-foreground">
                  {currentQuestion.original.question}
                </h2>
                <div className="space-y-3">
                  {currentQuestion.shuffledOptions.map((opcion, index) => (
                    <button
                      key={`${currentQuestion.original.id}-${index}`}
                      onClick={() => handleAnswer(index)}
                      disabled={isTransitioning}
                      className={cn(
                        "w-full rounded-lg border border-border p-4 text-left transition-all hover:border-accent hover:bg-accent/5 outline-none focus:outline-none",
                        selectedOption === index && "border-accent bg-accent/10",
                        isTransitioning && "pointer-events-none opacity-60"
                      )}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <span className="text-sm text-foreground">{opcion}</span>
                    </button>
                  ))}
                </div>
                
                {/* Botón "No lo sé" */}
                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    onClick={() => handleAnswer('no-se')}
                    disabled={isTransitioning}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/30 p-3 text-muted-foreground transition-all hover:border-muted-foreground/50 hover:bg-muted/30 outline-none focus:outline-none",
                      selectedOption === -1 && "border-muted-foreground bg-muted/50",
                      isTransitioning && "pointer-events-none opacity-60"
                    )}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">No lo sé</span>
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* Results */}
          {state === 'results' && nivelFinal && (
            <div className="text-center animate-in fade-in duration-500">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <Trophy className={cn("h-10 w-10", nivelDescripciones[nivelFinal].color)} />
              </div>
              
              <h1 className={cn("mb-2 text-3xl font-bold", nivelDescripciones[nivelFinal].color)}>
                {nivelDescripciones[nivelFinal].titulo}
              </h1>
              <p className="mb-8 text-muted-foreground">
                {nivelDescripciones[nivelFinal].descripcion}
              </p>

              {/* Stats Cards */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <Card className="p-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Correctas</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {preguntasCorrectas}
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">No supe</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {preguntasNoSabe}
                  </p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Tiempo</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {tiempoMinutos}:{tiempoSegundos.toString().padStart(2, '0')}
                  </p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-sm">Tu nivel</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-foreground capitalize">
                    {nivelFinal}
                  </p>
                </Card>
              </div>

              {/* Comparative Stats */}
              {stats && stats.totalTests > 1 && (
                <Card className="mb-8 p-6 text-left">
                  <h3 className="mb-4 font-medium text-foreground">Estadísticas comparativas</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">{stats.porcentajePorNivel[nivelFinal]}%</span> de las personas que tomaron el test están en tu mismo nivel
                    </p>
                    <p>
                      Tiempo promedio: <span className="font-medium text-foreground">{Math.floor(stats.tiempoPromedio / 60)}:{(stats.tiempoPromedio % 60).toString().padStart(2, '0')}</span> min
                    </p>
                    <p>
                      <span className="font-medium text-foreground">{stats.totalTests}</span> personas han completado el test
                    </p>
                  </div>
              </Card>
              )}

              {/* Share Section */}
              <Card className="mb-8 p-6">
                <h3 className="mb-4 font-medium text-foreground text-center">Comparte tu resultado</h3>
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowShareModal(true)}
                    className="bg-[#0077B5] hover:bg-[#005885] text-white"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    Compartir en LinkedIn
                  </Button>
                </div>
              </Card>

              <ShareLinkedInModal
                open={showShareModal}
                onOpenChange={setShowShareModal}
                data={{
                  nivel: nivelFinal,
                  porcentajeAciertos: preguntasRespondidas > 0 
                    ? Math.round((preguntasCorrectas / preguntasRespondidas) * 100) 
                    : 0,
                  tiempoMinutos,
                  tiempoSegundos
                }}
              />

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(getGuiaPath(nivelFinal));
                }}>
                  Ver guía recomendada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/guias');
                }}>
                  Ver todas las guías
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TestNivel;
