import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { allCourses } from "@/data/curriculum";
import { Github, Bell, Target, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const CursoLanding = () => {
  const navigate = useNavigate();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <Layout>
      <div className="container py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            Roadmap de la comunidad
          </span>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Guías para Aprender Vibe Coding
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Nuestra guía para aprender vibe coding desde cero, organizada en 3 niveles. Siéntete libre de copiar esta guía y aprender a tu propio ritmo.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {allCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-20 max-w-xl">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
              ¿Por dónde empezar?
            </h2>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Waitlist Button with Collapsible */}
              <Collapsible 
                open={isWaitlistOpen} 
                onOpenChange={setIsWaitlistOpen}
                className="flex-1"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Avísame cuando haya novedades
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isWaitlistOpen && "rotate-180"
                    )} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 animate-in slide-in-from-top-2 duration-200">
                  <WaitlistForm compact />
                </CollapsibleContent>
              </Collapsible>

              {/* Test Button */}
              <Button 
                onClick={() => navigate('/test-nivel')}
                className="flex-1 gap-2"
              >
                <Target className="h-4 w-4" />
                Mide tu nivel de vibe coding
              </Button>
            </div>
          </div>
        </div>

        {/* Colaborativo */}
        <div className="mx-auto mt-20 max-w-xl text-center">
          <h2 className="mb-3 text-lg font-medium text-foreground">Proyecto Colaborativo</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Este es un repositorio público. Si quieres proponer una mejora a las guías o cualquier contenido, haz un fork y envía un pull request.
          </p>
          <a
            href="https://github.com/elfrioscl/vibe-coders-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Github className="h-4 w-4" />
            Ver en GitHub
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          Creado por la comunidad Vibe Coders 🇨🇱🇲🇽🇪🇸🇨🇴
        </div>
      </div>
    </Layout>
  );
};

export default CursoLanding;
