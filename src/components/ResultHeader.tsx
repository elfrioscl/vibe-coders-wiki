import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Nivel, nivelDescripciones } from "@/utils/testLogic";

interface ResultHeaderProps {
  nivel: Nivel;
  className?: string;
}

export function ResultHeader({ nivel, className }: ResultHeaderProps) {
  const { titulo, descripcion, color, emoji } = nivelDescripciones[nivel];

  return (
    <div className={cn("text-center", className)}>
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
        <span className="text-4xl" role="img" aria-label={titulo}>
          {emoji}
        </span>
      </div>
      
      <h1 className={cn("mb-2 text-3xl font-bold", color)}>
        {titulo}
      </h1>
      <p className="mb-4 text-muted-foreground">
        {descripcion}
      </p>
    </div>
  );
}

