import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Module } from "@/data/curriculum";

interface ModuleAccordionProps {
  module: Module;
}

export function ModuleAccordion({ module }: ModuleAccordionProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-foreground">
            {module.id}
          </span>
          <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
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

      <Accordion type="single" collapsible className="ml-11">
        <AccordionItem value="topics" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
            Ver {module.topics.length} temas
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 pt-2">
              {module.topics.map((topic, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium text-foreground">{topic.title}</span>
                  <p className="text-muted-foreground">{topic.description}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
