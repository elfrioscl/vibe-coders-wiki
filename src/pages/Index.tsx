import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Lightbulb, Wrench, GraduationCap, Github, Target, Sparkles, Rocket, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <div className="container py-10 sm:py-20">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            <span className="text-accent">El lugar</span> para aprender vibe coding <span className="text-accent">en español</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Un{" "}
            <a href="#colaborativo" className="underline hover:text-foreground transition-colors">
              esfuerzo comunitario
            </a>{" "}
            de vibe coders que compartimos aprendizajes, tips, recursos y metodología para consolidar las mejores prácticas de esta nueva disciplina.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          <Link
            to="/guias-cursos-vibe-coding"
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
          >
            <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mb-2 font-medium text-foreground">Guías sugeridas de Vibe Coding</h2>
            <p className="text-sm text-muted-foreground">
              Aprende a crear productos vibe codeados desde cero. Guía organizada en 3 niveles.
            </p>
          </Link>

          <Link
            to="/tips"
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
          >
            <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mb-2 font-medium text-foreground">Tips de Vibe Coding favoritos de la comunidad</h2>
            <p className="text-sm text-muted-foreground">
              Consejos prácticos para ser más productivo construyendo con IA.
            </p>
          </Link>

          <Link
            to="/recursos"
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
          >
            <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
              <Wrench className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mb-2 font-medium text-foreground">Biblioteca de Recursos y Herramientas</h2>
            <p className="text-sm text-muted-foreground">
              Las mejores herramientas para pagos, emails, bases de datos y más.
            </p>
          </Link>
        </div>

        {/* CTA Test de Nivel */}
        <div className="mx-auto mt-12 max-w-md text-center">
          <p className="mb-4 text-muted-foreground">¿No sabes por dónde empezar?</p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/test-nivel">
              <Target className="h-4 w-4" />
              Evalúa tu nivel de vibe coding
            </Link>
          </Button>
        </div>

        {/* Para quién es */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="mb-8 text-center text-lg font-medium text-foreground">
            Esto es para ti si...
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border/50 bg-secondary/30 p-5">
              <div className="mb-3 inline-flex rounded-md bg-accent/10 p-2">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <h3 className="mb-1 font-medium text-foreground">
                Quieres crear productos digitales pero no sabes programar
              </h3>
              <p className="text-sm text-muted-foreground">
                Tienes ideas pero dependes de otros para construirlas. Aquí aprendes a hacerlo tú mismo con IA.
              </p>
            </div>

            <div className="rounded-lg border border-border/50 bg-secondary/30 p-5">
              <div className="mb-3 inline-flex rounded-md bg-accent/10 p-2">
                <Rocket className="h-4 w-4 text-accent" />
              </div>
              <h3 className="mb-1 font-medium text-foreground">
                Estás emprendiendo y necesitas prototipar rápido
              </h3>
              <p className="text-sm text-muted-foreground">
                No tienes tiempo ni presupuesto para un equipo de desarrollo. Valida tus ideas en días, no meses.
              </p>
            </div>

            <div className="rounded-lg border border-border/50 bg-secondary/30 p-5">
              <div className="mb-3 inline-flex rounded-md bg-accent/10 p-2">
                <Building2 className="h-4 w-4 text-accent" />
              </div>
              <h3 className="mb-1 font-medium text-foreground">
                Trabajas en una empresa y quieres automatizar sin depender de IT
              </h3>
              <p className="text-sm text-muted-foreground">
                Dashboards, herramientas internas, automatizaciones. Deja de esperar en la cola de desarrollo.
              </p>
            </div>

            <div className="rounded-lg border border-border/50 bg-secondary/30 p-5">
              <div className="mb-3 inline-flex rounded-md bg-accent/10 p-2">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <h3 className="mb-1 font-medium text-foreground">
                Eres marketer y quieres crear herramientas de adquisición
              </h3>
              <p className="text-sm text-muted-foreground">
                Calculadoras, comparadores, side products. Canales de crecimiento que construyes tú mismo.
              </p>
            </div>
          </div>
        </div>

        {/* Colaborativo */}
        <div id="colaborativo" className="mx-auto mt-20 max-w-xl text-center scroll-mt-20">
          <h2 className="mb-3 text-lg font-medium text-foreground">Proyecto Colaborativo</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Este es un proyecto de código abierto. Si quieres proponer mejoras a las guías, tips o recursos, siéntete libre de hacer un fork y un pull request.
          </p>
          <a
            href="https://github.com/elfrioscl/vibe-coders-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Github className="h-4 w-4" />
            Ver en GitHub
          </a>
        </div>

      </div>
    </Layout>
  );
};

export default Index;
