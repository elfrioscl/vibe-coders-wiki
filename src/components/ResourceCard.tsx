import { Resource, resourceCategories } from "@/data/resources";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
  const category = resourceCategories[resource.category];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
          {resource.name}
        </h3>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {resource.description}
      </p>
      <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
        {category.label}
      </span>
    </a>
  );
}
