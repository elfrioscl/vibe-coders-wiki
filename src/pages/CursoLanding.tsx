import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { allCourses } from "@/data/curriculum";
import { Github } from "lucide-react";

const CursoLanding = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Roadmap de la comunidad
          </span>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Guías para Aprender Vibe Coding
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Nuestra guía para aprender vibe coding desde cero, organizada en 3 niveles. Siéntete libre de copiar esta guía y aprender a tu propio ritmo.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {allCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Waitlist Section */}
        <div className="mx-auto mt-20 max-w-md">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="mb-2 text-center text-xl font-semibold text-foreground">
              Únete al Waitlist
            </h2>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Sé el primero en saber cuando el contenido esté disponible. Sin spam, lo prometemos.
            </p>
            <WaitlistForm />
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
          Creado por la comunidad Vibe Coders 🇨🇱🇲🇽🇪🇸🇨🇴
        </div>
      </div>
    </Layout>
  );
};

export default CursoLanding;
