import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { allCourses } from "@/data/curriculum";

const CursoLanding = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Próximamente
          </span>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Aprende Vibe Coding desde Cero
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            21 módulos para dominar el desarrollo con IA. Desde los fundamentos hasta técnicas avanzadas de monetización y SEO.
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
              Sé el primero en saber cuando lancemos los cursos. Sin spam, lo prometemos.
            </p>
            <WaitlistForm />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-muted-foreground">
          Creado por la comunidad Vibe Coders 🇨🇱🇲🇽🇪🇸🇨🇴
        </div>
      </div>
    </Layout>
  );
};

export default CursoLanding;
