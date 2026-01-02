import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Nivel = 'inicial' | 'intermedio' | 'avanzado' | 'expert';

interface TestResult {
  nivel_resultado: Nivel;
  respuestas_correctas: number;
  preguntas_respondidas: number;
  tiempo_total_segundos: number;
}

const nivelConfig: Record<Nivel, { titulo: string; emoji: string; color: string; descripcion: string }> = {
  inicial: {
    titulo: 'Inicial',
    emoji: '🌱',
    color: 'text-emerald-400',
    descripcion: 'Comenzando el viaje del Vibe Coding'
  },
  intermedio: {
    titulo: 'Intermedio',
    emoji: '🚀',
    color: 'text-blue-400',
    descripcion: 'Dominando las bases del desarrollo con IA'
  },
  avanzado: {
    titulo: 'Avanzado',
    emoji: '⚡',
    color: 'text-purple-400',
    descripcion: 'Construyendo proyectos complejos con IA'
  },
  expert: {
    titulo: 'Expert',
    emoji: '🏆',
    color: 'text-amber-400',
    descripcion: 'Maestro del Vibe Coding'
  }
};

const ShareResult = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase.functions.invoke('get-test-result', {
          body: { share_id: id }
        });

        if (fetchError || !data) {
          console.error('Error fetching result:', fetchError);
          setError(true);
        } else {
          setResult(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
            </div>
            <h1 className="mb-4 text-xl font-semibold text-foreground">Cargando resultado...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !result) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 text-6xl">🔍</div>
            <h1 className="mb-4 text-2xl font-semibold text-foreground">Resultado no encontrado</h1>
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

  const nivel = result.nivel_resultado;
  const config = nivelConfig[nivel] || nivelConfig.inicial;
  const porcentaje = Math.round((result.respuestas_correctas / result.preguntas_respondidas) * 100);
  const tiempoMinutos = Math.floor(result.tiempo_total_segundos / 60);
  const tiempoSegundos = result.tiempo_total_segundos % 60;

  return (
    <Layout>
      <div className="container py-16">
        <div className="mx-auto max-w-lg text-center">
          {/* Certificate Card */}
          <Card className="relative overflow-hidden p-8 mb-8">
            {/* Background decorations */}
            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-accent/5" />
            <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-accent/5" />
            
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Resultado del Test de
              </p>
              <h1 className="text-2xl font-bold text-foreground mb-8">Vibe Coding</h1>
              
              <div className="text-6xl mb-4">{config.emoji}</div>
              
              <h2 className={`text-3xl font-bold mb-2 ${config.color}`}>
                Nivel {config.titulo}
              </h2>
              <p className="text-muted-foreground mb-8">{config.descripcion}</p>
              
              {/* Stats */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">{porcentaje}%</p>
                  <p className="text-sm text-muted-foreground">aciertos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">
                    {tiempoMinutos}:{tiempoSegundos.toString().padStart(2, '0')}
                  </p>
                  <p className="text-sm text-muted-foreground">tiempo</p>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="space-y-4">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('/test-nivel')}>
              <Trophy className="mr-2 h-5 w-5" />
              Haz tu propio test
            </Button>
            <p className="text-sm text-muted-foreground">
              Descubre tu nivel de Vibe Coding en menos de 5 minutos
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-medium">vibe-coders.es</span> — Aprende a crear apps con IA
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShareResult;
