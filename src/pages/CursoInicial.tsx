import { Layout } from "@/components/Layout";
import { ModuleAccordion } from "@/components/ModuleAccordion";
import { CTASidebar } from "@/components/CTASidebar";
import { cursoInicial } from "@/data/curriculum";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CursoInicial = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Breadcrumb */}
        <Link
          to="/guias-cursos-vibe-coding"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a guías
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {cursoInicial.subtitle}
          </span>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {cursoInicial.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {cursoInicial.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Modules List */}
          <div className="space-y-4 lg:col-span-2">
            {cursoInicial.modules.map((module) => (
              <ModuleAccordion key={module.id} module={module} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <CTASidebar defaultCourse="inicial" />

            {/* Next Course */}
            <Link
              to="/guias-cursos-vibe-coding/intermedio"
              className="mt-4 flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/20"
            >
              <div>
                <span className="text-xs text-muted-foreground">Siguiente</span>
                <p className="font-medium text-foreground">Guía Intermedia</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CursoInicial;
