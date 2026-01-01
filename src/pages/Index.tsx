import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Wrench, GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container py-20">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Vibe Coders Wiki
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Aprendizajes, tips y recursos de la comunidad de desarrolladores que construyen con IA.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/tips"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Ver Tips
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/recursos"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Explorar Recursos
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-6 sm:grid-cols-3">
          <Link
            to="/curso-vibe-coding"
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20"
          >
            <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mb-2 font-medium text-foreground">Cursos de Vibe Coding</h2>
            <p className="text-sm text-muted-foreground">
              Aprende desde cero con 21 módulos estructurados.
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

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-muted-foreground">
          Creado por la comunidad Vibe Coders 🇨🇱🇲🇽🇪🇸🇨🇴
        </div>
      </div>
    </Layout>
  );
};

export default Index;
