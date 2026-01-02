import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Module } from "@/data/curriculum";
import { generateModulePrompt, generateTopicPrompt } from "@/utils/curriculumPrompts";
import { PromptPreviewDialog } from "./PromptPreviewDialog";

type CourseLevel = "inicial" | "intermedio" | "avanzado";

interface ModuleAccordionProps {
  module: Module;
  moduleIndex: number;
  level: CourseLevel;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ModuleAccordion({ module, moduleIndex, level, isOpen, onOpenChange }: ModuleAccordionProps) {
  const [copiedModule, setCopiedModule] = useState(false);
  const [copiedTopicIndex, setCopiedTopicIndex] = useState<number | null>(null);
  
  // Modal state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogPrompt, setDialogPrompt] = useState("");

  const handleOpenModulePrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prompt = generateModulePrompt(module, level, moduleIndex);
    setDialogTitle(module.title);
    setDialogPrompt(prompt);
    setDialogOpen(true);
  };

  const handleQuickCopyModule = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const prompt = generateModulePrompt(module, level, moduleIndex);
    await navigator.clipboard.writeText(prompt);
    setCopiedModule(true);
    toast.success("Prompt copiado - pégalo en tu IA favorita");
    setTimeout(() => setCopiedModule(false), 2000);
  };

  const handleOpenTopicPrompt = (topicIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const topic = module.topics[topicIndex];
    const prompt = generateTopicPrompt(module, topic, level, moduleIndex, topicIndex);
    setDialogTitle(topic.title);
    setDialogPrompt(prompt);
    setDialogOpen(true);
  };

  const handleQuickCopyTopic = async (topicIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const topic = module.topics[topicIndex];
    const prompt = generateTopicPrompt(module, topic, level, moduleIndex, topicIndex);
    await navigator.clipboard.writeText(prompt);
    setCopiedTopicIndex(topicIndex);
    toast.success("Prompt copiado - pégalo en tu IA favorita");
    setTimeout(() => setCopiedTopicIndex(null), 2000);
  };

  const accordionValue = isOpen ? "topics" : undefined;

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-foreground">
                {module.id}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenModulePrompt}
                className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Armar prompt...
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleQuickCopyModule}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Copiar prompt rápido"
              >
                {copiedModule ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
          <div className="ml-11 space-y-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Objetivo:</span> {module.objective}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Resultado:</span> {module.result}
            </p>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="ml-11"
          value={accordionValue}
          onValueChange={(value) => onOpenChange?.(value === "topics")}
        >
          <AccordionItem value="topics" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
              Ver {module.topics.length} temas
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pt-2">
                {module.topics.map((topic, index) => (
                  <li key={index} className="group flex items-start justify-between gap-2 text-sm">
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{topic.title}</span>
                      <p className="text-muted-foreground">{topic.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleOpenTopicPrompt(index, e)}
                        className="h-7 gap-1.5 px-2 text-xs"
                        title="Armar prompt para este tema"
                      >
                        <Sparkles className="h-3 w-3" />
                        Armar...
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleQuickCopyTopic(index, e)}
                        className="h-7 w-7"
                        title="Copiar prompt rápido"
                      >
                        {copiedTopicIndex === index ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <PromptPreviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogTitle}
        prompt={dialogPrompt}
      />
    </>
  );
}
