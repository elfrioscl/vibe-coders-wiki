import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Record<string, { label: string }>;
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "rounded-full px-3 py-1.5 text-sm transition-colors",
          selected === "all"
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        Todos
      </button>
      {Object.entries(categories).map(([key, category]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm transition-colors",
            selected === key
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
