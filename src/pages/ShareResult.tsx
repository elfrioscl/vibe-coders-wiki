import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ResultHeader } from "@/components/ResultHeader";
import { ArrowRight } from "lucide-react";
import { Nivel, getGuiaPath } from "@/utils/testLogic";

const validNiveles: Nivel[] = ['inicial', 'intermedio', 'avanzado', 'expert'];

const ShareResult = () => {
  const { nivel } = useParams<{ nivel: string }>();
  const navigate = useNavigate();

  // Add noindex meta tag to prevent Google indexing
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  // Validate nivel parameter
  const isValidNivel = nivel && validNiveles.includes(nivel as Nivel);
  
  if (!isValidNivel) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-semibold text-foreground">
              Resultado no encontrado
            </h1>
            <p className="mb-8 text-muted-foreground">
              Este resultado no existe o ha expirado.
            </p>
            <Button size="lg" onClick={() => navigate('/test-nivel')}>
              Hacer el test
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const nivelValido = nivel as Nivel;

  return (
    <Layout>
      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          <div className="animate-in fade-in duration-500">
            <ResultHeader nivel={nivelValido} />

            {/* CTA Section */}
            <div className="mt-8 text-center">
              <p className="mb-6 text-muted-foreground">
                ¿Quieres saber cuál es tu nivel de Vibe Coding?
              </p>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button 
                  size="lg" 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/test-nivel');
                  }}
                >
                  Haz tu propio test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(getGuiaPath(nivelValido));
                  }}
                >
                  Ver guía recomendada
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShareResult;

