import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/data/curriculum";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

const levelStyles = {
  inicial: "bg-accent/10 text-accent",
  intermedio: "bg-primary/10 text-primary",
  avanzado: "bg-destructive/10 text-destructive",
};

export function CourseCard({ course }: CourseCardProps) {
  const totalTopics = course.modules.reduce((acc, m) => acc + m.topics.length, 0);

  return (
    <Link
      to={`/guias-cursos-vibe-coding/${course.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            levelStyles[course.level]
          )}
        >
          {course.subtitle}
        </span>
        <span className="text-xs text-muted-foreground">
          {course.modules.length} módulos
        </span>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">{course.title}</h3>
      <p className="mb-4 flex-1 text-sm text-muted-foreground">{course.description}</p>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">{totalTopics} temas</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform group-hover:translate-x-1">
          Ver temario
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
