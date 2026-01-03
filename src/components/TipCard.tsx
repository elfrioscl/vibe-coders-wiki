import { Tip, tags, levels } from "@/data/tips";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TipCardProps {
  tip: Tip;
  index: number;
}

export function TipCard({ tip, index }: TipCardProps) {
  const [copied, setCopied] = useState(false);
  const level = levels[tip.level];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${tip.title}: ${tip.description}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        className={cn(
          "group relative rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20",
          "opacity-0 animate-fade-in"
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Level badge */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={cn(
              "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
              tip.level === "basico" && "bg-green-500/10 text-green-600 dark:text-green-400",
              tip.level === "intermedio" && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
              tip.level === "avanzado" && "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            {level.label}
          </span>
        </div>

        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-medium text-foreground">{tip.title}</h3>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100"
            aria-label="Copiar tip"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {tip.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {tip.tags.map((tagKey) => (
            <span
              key={tagKey}
              className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {tags[tagKey].label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
