import { Link } from "react-router-dom";
import { Bell, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertSubscriptionForm } from "@/components/AlertSubscriptionForm";

interface CTASidebarProps {
  defaultCourse?: string;
}

export function CTASidebar({ defaultCourse = "todos" }: CTASidebarProps) {
  return (
    <div className="space-y-4">
      {/* Card 1: Waitlist */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-2">
          <Bell className="h-5 w-5 text-accent" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground">
          Avísame cuando haya novedades
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Déjanos tu email y te avisamos cuando publiquemos contenido nuevo.
        </p>
        <AlertSubscriptionForm defaultCourse={defaultCourse} compact />
      </div>

      {/* Card 2: Test de Nivel */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-2">
          <Target className="h-5 w-5 text-accent" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground">
          ¿No sabes por dónde empezar?
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Descubre tu nivel actual y recibe una recomendación personalizada.
        </p>
        <Button asChild className="w-full gap-2">
          <Link to="/test-nivel">
            <Target className="h-4 w-4" />
            Mide tu nivel de vibe coding
          </Link>
        </Button>
      </div>
    </div>
  );
}
