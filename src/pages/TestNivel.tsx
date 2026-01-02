import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { testQuestions } from "@/data/testQuestions";
import { ArrowRight, Trophy, BarChart3, Clock, CheckCircle, HelpCircle, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareLinkedInModal } from "@/components/ShareLinkedInModal";
import { useAdaptiveTest } from "@/hooks/useAdaptiveTest";
import { 
  nivelDescripciones, 
  getGuiaPath
} from "@/utils/testLogic";

const TestNivel = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const {
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
    preguntasRespondidas,
    preguntasCorrectas,
    preguntasNoSabe,
    progressPercent,
    startTest,
    handleAnswer,
    loadSavedResult,
    setShowShareModal,
    showShareModal,
  } = useAdaptiveTest({
    setSearchParams: (params) => setSearchParams(params),
  });

  // Check for saved result on mount
  useEffect(() => {
    const resultId = searchParams.get('result');
    if (resultId) {
      loadSavedResult(resultId);
    }
  }, []);

  // Force re-mount of buttons when question changes (iOS touch state fix)
  const [questionKey, setQuestionKey] = useState(0);
  
  useEffect(() => {
    setQuestionKey(prev => prev + 1);
    // Blur active element to clear iOS touch states
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentQuestion?.original.id]);

  // Calculate time display
  const tiempoTotalCalculado = savedTiempoTotal ?? Math.round((Date.now() - startTime) / 1000);
  const tiempoMinutos = Math.floor(tiempoTotalCalculado / 60);
  const tiempoSegundos = tiempoTotalCalculado % 60;

  // Loading state for saved result
  const isLoadingResult = searchParams.get('result') && state === 'intro';

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
                  <span>Calculando tu nivel...</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <Progress 
                  value={progressPercent} 
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
                      key={`${questionKey}-${index}`}
                      onClick={(e) => {
                        e.currentTarget.blur();
                        handleAnswer(index);
                      }}
                      disabled={isTransitioning}
                      data-test-option="true"
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
                
                {/* "No lo sé" button */}
                <div className="mt-6 pt-4 border-t border-border">
                  <button
                    onClick={(e) => {
                      e.currentTarget.blur();
                      handleAnswer('no-se');
                    }}
                    disabled={isTransitioning}
                    data-test-option="true"
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
                shareId={shareId}
                data={{
                  nivel: nivelFinal,
                  porcentajeAciertos: respuestas.length > 0 
                    ? Math.round((preguntasCorrectas / respuestas.length) * 100) 
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
