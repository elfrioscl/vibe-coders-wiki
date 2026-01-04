import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Lightbulb, CheckCircle2, XCircle, Home, Brain, Sparkles } from "lucide-react";
import { useState } from "react";

const QueEsVibeCoding = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);

  const handleOptionClick = (option: "A" | "B") => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  return (
    <Layout>
      <SEO 
        title="¿Qué es Vibe Coding? Definición y Ejemplos"
        description="Vibe coding es una metodología para crear aplicaciones usando IA como tu programador principal. Aprende qué es, cómo funciona y ejemplos prácticos."
        canonical="/glosario/que-es-vibe-coding"
        ogType="article"
      />
      <div className="container py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/glosario" className="hover:text-foreground transition-colors">
            Glosario
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Qué es Vibe Coding</span>
        </nav>

        <div className="mx-auto max-w-3xl">
          {/* H1 */}
          <h1 className="mb-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            ¿Qué es Vibe Coding?
          </h1>

          {/* Definición citable - optimizada para AEO */}
          <blockquote className="mb-8 border-l-4 border-accent bg-accent/5 py-4 pl-6 pr-4 rounded-r-lg">
            <p className="text-lg text-foreground leading-relaxed">
              <strong>Vibe coding</strong> es una metodología para crear aplicaciones usando inteligencia artificial como tu programador principal. En lugar de escribir código línea por línea, le describes a la IA qué quieres construir y ella genera el código por ti, mientras tú guías el proceso con instrucciones claras.
            </p>
          </blockquote>

          {/* Call-to-Value - mismo componente que en las guías */}
          <div className="mb-10 space-y-4">
            <div className="rounded-lg border border-accent/20 bg-accent/5 px-5 py-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Brain className="h-5 w-5 text-accent" />
                  <span>Saber más</span>
                </div>
                <span className="text-xl font-semibold text-accent">=</span>
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span>Promptear mejor</span>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Menos iteraciones, mejores resultados
              </p>
            </div>
            <div className="text-center">
              <Button asChild>
                <Link to="/test-nivel">
                  Mide tu nivel de Vibe Coding
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Analogía */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              Analogía para entenderlo mejor
            </h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Imagina que quieres construir una casa pero no sabes albañilería. Antes, tenías dos opciones: aprender a construir tú mismo (años de estudio) o contratar a alguien (costoso y lento).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El vibe coding es como tener un <strong className="text-foreground">arquitecto y constructor experto que trabaja contigo en tiempo real</strong>. Tú le dices "quiero una cocina amplia con mucha luz natural" y él dibuja los planos y construye. Si algo no te gusta, le pides cambios y los hace al instante.
              </p>
              <p className="text-foreground font-medium">
                No necesitas saber poner ladrillos. Necesitas saber describir lo que quieres.
              </p>
            </div>
          </section>

          {/* Ejemplo aplicado */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Ejemplo práctico: De idea a app en minutos
            </h2>
            
            <div className="space-y-6">
              {/* Caso */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-medium text-foreground mb-2">El caso</h3>
                <p className="text-muted-foreground">
                  María quiere crear una app para que los clientes de su cafetería hagan pedidos desde el celular. No sabe programar.
                </p>
              </div>

              {/* Cómo se usa */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-medium text-foreground mb-3">Cómo lo hace con vibe coding</h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">1</span>
                    <span>María abre <strong className="text-foreground">Lovable</strong> (una herramienta de vibe coding)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">2</span>
                    <span>Escribe: "Quiero una app donde mis clientes vean el menú de mi cafetería y puedan hacer pedidos. Tiene que verse moderna y ser fácil de usar en el celular."</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">3</span>
                    <span>La IA genera una app funcional en segundos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">4</span>
                    <span>María la prueba y pide ajustes: "El botón de pedir debería ser más grande y de color verde"</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">5</span>
                    <span>La IA hace los cambios inmediatamente</span>
                  </li>
                </ol>
              </div>

              {/* Cuándo usarlo */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-medium text-foreground mb-3">Cuándo usar vibe coding</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Cuando tienes una idea clara de lo que quieres construir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Cuando no tienes tiempo o recursos para aprender programación tradicional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Cuando quieres validar una idea rápidamente</span>
                  </li>
                </ul>
              </div>

              {/* Errores comunes */}
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
                <h3 className="font-medium text-foreground mb-3">Errores comunes a evitar</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Ser demasiado vago:</strong> "Hazme una app bonita" no funciona. Mejor: "Hazme una app de lista de tareas con diseño minimalista"
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Pedir todo de una vez:</strong> Mejor ir paso a paso, una funcionalidad a la vez
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">No revisar lo que genera:</strong> Siempre prueba que funcione como esperas
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mini-juego */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              🎮 Pon a prueba lo aprendido
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="mb-4 text-foreground font-medium">
                Situación: Quieres crear una landing page para tu negocio de pastelería. ¿Cuál prompt generaría mejor resultado?
              </p>
              
              <div className="space-y-3 mb-4">
                <button
                  onClick={() => handleOptionClick("A")}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    showAnswer && selectedOption === "A"
                      ? "border-destructive bg-destructive/10"
                      : showAnswer
                      ? "border-border opacity-60"
                      : "border-border hover:border-foreground/30 cursor-pointer"
                  }`}
                >
                  <span className="font-medium">Opción A:</span>
                  <span className="text-muted-foreground ml-2">"Hazme una página web"</span>
                </button>
                
                <button
                  onClick={() => handleOptionClick("B")}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    showAnswer && selectedOption === "B"
                      ? "border-green-500 bg-green-500/10"
                      : showAnswer
                      ? "border-border opacity-60"
                      : "border-border hover:border-foreground/30 cursor-pointer"
                  }`}
                >
                  <span className="font-medium">Opción B:</span>
                  <span className="text-muted-foreground ml-2">"Crea una landing page para mi pastelería 'Dulce María'. Debe mostrar fotos de pasteles, tener un formulario de contacto y un botón de WhatsApp. Estilo elegante con colores rosa pastel y dorado."</span>
                </button>
              </div>

              {showAnswer && (
                <div className={`p-4 rounded-lg ${selectedOption === "B" ? "bg-green-500/10 border border-green-500/30" : "bg-amber-500/10 border border-amber-500/30"}`}>
                  <p className="font-medium text-foreground mb-2">
                    {selectedOption === "B" ? "✅ ¡Correcto!" : "❌ No exactamente..."}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>La opción B es la correcta.</strong> Es específica sobre: qué tipo de página (landing), para qué negocio (pastelería), qué elementos incluir (fotos, formulario, WhatsApp), y qué estilo visual (elegante, rosa pastel y dorado). Cuanto más contexto le des a la IA, mejor resultado obtendrás en menos iteraciones.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA final */}
          <section className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              ¿Listo para empezar?
            </h2>
            <p className="mb-4 text-muted-foreground">
              Descubre tu nivel actual y recibe una guía personalizada para aprender vibe coding.
            </p>
            <Button size="lg" asChild>
              <Link to="/test-nivel">
                Hacer el test de nivel
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </section>

          {/* Términos relacionados */}
          <section className="mt-10 pt-8 border-t border-border">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Términos relacionados
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/glosario/como-escribir-prompts-efectivos-para-generar-codigo" className="text-sm px-3 py-1.5 rounded-full border border-border hover:border-foreground/30 transition-colors">
                Cómo escribir prompts efectivos
              </Link>
              <Link to="/glosario/lovable-vs-cursor-cual-elegir" className="text-sm px-3 py-1.5 rounded-full border border-border hover:border-foreground/30 transition-colors">
                Lovable vs Cursor
              </Link>
              <Link to="/glosario/que-son-las-alucinaciones-de-ia-al-programar" className="text-sm px-3 py-1.5 rounded-full border border-border hover:border-foreground/30 transition-colors">
                Alucinaciones de IA
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default QueEsVibeCoding;

