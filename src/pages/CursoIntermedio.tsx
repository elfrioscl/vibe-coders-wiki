import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ModuleAccordion } from "@/components/ModuleAccordion";
import { CTASidebar } from "@/components/CTASidebar";
import { cursoIntermedio } from "@/data/curriculum";
import { formatCurriculumAsMarkdown } from "@/utils/curriculumPrompts";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronsUpDown, Copy, Check } from "lucide-react";
import { GuideDisclaimer } from "@/components/GuideDisclaimer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CursoIntermedio = () => {
  const [allExpanded, setAllExpanded] = useState(false);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  const [copiedCurriculum, setCopiedCurriculum] = useState(false);

  const handleToggleAll = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    const newOpenModules: Record<number, boolean> = {};
    cursoIntermedio.modules.forEach((m) => {
      newOpenModules[m.id] = newState;
    });
    setOpenModules(newOpenModules);
  };

  const handleCopyCurriculum = async () => {
    const markdown = formatCurriculumAsMarkdown(cursoIntermedio);
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
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {cursoIntermedio.subtitle}
          </span>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {cursoIntermedio.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {cursoIntermedio.description}
          </p>
        </div>

        {/* Disclaimer */}
        <GuideDisclaimer />

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
              {cursoIntermedio.modules.map((module, index) => (
                <ModuleAccordion
                  key={module.id}
                  module={module}
                  moduleIndex={index}
                  level="intermedio"
                  course={cursoIntermedio}
                  isOpen={openModules[module.id]}
                  onOpenChange={(open) => handleModuleOpenChange(module.id, open)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <CTASidebar defaultCourse="intermedio" />

            {/* Navigation */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                to="/guias-cursos-vibe-coding/inicial"
                className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/20"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-xs text-muted-foreground">Anterior</span>
                  <p className="text-sm font-medium text-foreground">Inicial</p>
                </div>
              </Link>
              <Link
                to="/guias-cursos-vibe-coding/avanzado"
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/20"
              >
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Siguiente</span>
                  <p className="text-sm font-medium text-foreground">Avanzada</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CursoIntermedio;
