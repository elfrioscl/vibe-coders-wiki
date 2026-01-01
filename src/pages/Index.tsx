import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Lightbulb, Wrench, GraduationCap, Github, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <div className="container py-20">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            El lugar para aprender vibe coding en español
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
            <h2 className="mb-2 font-medium text-foreground">Guías de Vibe Coding</h2>
            <p className="text-sm text-muted-foreground">
              Aprende vibe coding desde cero con nuestra guía de 3 niveles. Copia, adapta y aprende a tu ritmo.
            </p>
          </Link>

          <Link
            to="/tips"
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
          >
            <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
              <Lightbulb className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="mb-2 font-medium text-foreground">Tips de Vibe Coding</h2>
            <p className="text-sm text-muted-foreground">
              Consejos prácticos para ser más productivo construyendo con IA.
            </p>
          </Link>

          <Link
            to="/recursos"
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
          >
            <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
              <Wrench className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="mb-2 font-medium text-foreground">Recursos y Herramientas</h2>
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

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          Creado por la comunidad Vibe Coders 🇨🇱🇲🇽🇪🇸🇨🇴
        </div>
      </div>
    </Layout>
  );
};

export default Index;
