import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ModuleAccordion } from "@/components/ModuleAccordion";
import { CTASidebar } from "@/components/CTASidebar";
import { cursoInicial } from "@/data/curriculum";
import { formatCurriculumAsMarkdown } from "@/utils/curriculumPrompts";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronsUpDown, Copy, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CursoInicial = () => {
  const [allExpanded, setAllExpanded] = useState(false);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  const [copiedCurriculum, setCopiedCurriculum] = useState(false);

  const handleToggleAll = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    const newOpenModules: Record<number, boolean> = {};
    cursoInicial.modules.forEach((m) => {
      newOpenModules[m.id] = newState;
    });
    setOpenModules(newOpenModules);
  };

  const handleCopyCurriculum = async () => {
    const markdown = formatCurriculumAsMarkdown(cursoInicial);
    await navigator.clipboard.writeText(markdown);
    setCopiedCurriculum(true);
    toast.success("Temario copiado al portapapeles");
    setTimeout(() => setCopiedCurriculum(false), 2000);
  };

  const handleModuleOpenChange = (moduleId: number, open: boolean) => {
    setOpenModules((prev) => ({ ...prev, [moduleId]: open }));
    if (!open && allExpanded) {
      setAllExpanded(false);
    }
  };

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
        <div className="mb-8">
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

        {/* Disclaimer */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-1 font-medium text-foreground">Esta guía está en construcción y constante evolución</p>
            <p>
              Por ahora solo contiene la tabla de contenidos. El contenido detallado se irá agregando con el tiempo. 
              Mientras tanto, puedes usar tu <strong>IA favorita</strong> para que te explique cada tema. 
              Usa el botón "Explicar con IA" de cada módulo o tema para generar un prompt, o el ícono de copia rápida para copiarlo directamente.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Modules List */}
          <div className="lg:col-span-2">
            {/* Action Buttons */}
            <div className="mb-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleAll}
                className="gap-2"
              >
                <ChevronsUpDown className="h-4 w-4" />
                {allExpanded ? "Colapsar todas" : "Expandir todas"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCurriculum}
                className="gap-2"
              >
                {copiedCurriculum ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar temario
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              {cursoInicial.modules.map((module, index) => (
                <ModuleAccordion
                  key={module.id}
                  module={module}
                  moduleIndex={index}
                  level="inicial"
                  isOpen={openModules[module.id]}
                  onOpenChange={(open) => handleModuleOpenChange(module.id, open)}
                />
              ))}
            </div>
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
