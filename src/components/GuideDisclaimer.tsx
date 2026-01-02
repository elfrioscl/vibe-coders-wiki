import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export function GuideDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-8">
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 p-4 text-left transition-colors hover:bg-muted/70">
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5 shrink-0 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Esta guía está en construcción y constante evolución
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="rounded-b-xl border border-t-0 border-border bg-muted/30 px-4 pb-4 pt-3">
          <div className="pl-8 text-sm text-muted-foreground">
            <p>
              Por ahora solo contiene la tabla de contenidos. El contenido detallado se irá agregando con el tiempo. 
              Mientras tanto, puedes usar tu <strong>IA favorita</strong> para que te explique cada tema. 
              Usa el botón "Explicar con IA" de cada módulo o tema para generar un prompt, o el ícono de copia rápida para copiarlo directamente.
            </p>
            <p className="mt-2 text-muted-foreground/80">
              Si eres educador/a o quieres reutilizar este temario, usa el botón "Copiar temario" para obtener todo el contenido en formato de texto.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

