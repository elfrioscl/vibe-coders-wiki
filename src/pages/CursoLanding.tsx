import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { CourseCard } from "@/components/CourseCard";
import { AlertSubscriptionForm } from "@/components/AlertSubscriptionForm";
import { allCourses } from "@/data/curriculum";
import { Github, Bell, Target, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CursoLanding = () => {
  return (
    <Layout>
      <SEO 
        title="Guías para Aprender Vibe Coding"
        description="Roadmap de la comunidad para aprender a crear productos con IA. 3 niveles: inicial, intermedio y avanzado."
        canonical="/guias-cursos-vibe-coding"
      />
      <div className="container py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Roadmap de la comunidad
          </span>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Guías para Aprender Vibe Coding
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Guías para aprender a crear productos con vibe coding, organizadas en 3 niveles según tu experiencia.
          </p>

          {/* Formula Visual */}
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
        </div>

        {/* Courses Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {allCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA Section - Two Separate Cards */}
        <div className="mx-auto mt-20 grid max-w-2xl gap-6 md:grid-cols-2">
          {/* Card 1: Waitlist */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-2">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              Avísame cuando haya novedades
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Déjanos tu email y te avisamos cuando publiquemos contenido nuevo.
            </p>
            <AlertSubscriptionForm compact />
          </div>

          {/* Card 2: Test de Nivel */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-2">
              <Target className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              ¿No sabes por dónde empezar?
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Descubre tu nivel actual y recibe una recomendación personalizada.
            </p>
            <Button asChild className="w-full gap-2">
              <Link to="/test-nivel">
                <Target className="h-4 w-4" />
                Mide tu nivel de vibe coding
              </Link>
            </Button>
          </div>
        </div>

        {/* Colaborativo */}
        <div className="mx-auto mt-20 max-w-xl text-center">
          <h2 className="mb-3 text-lg font-medium text-foreground">Proyecto Colaborativo</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Este es un repositorio público. Si quieres proponer una mejora a las guías o cualquier contenido, haz un fork y envía un pull request.
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
          Creado por la comunidad Vibe Coders
        </div>
      </div>
    </Layout>
  );
};

export default CursoLanding;
