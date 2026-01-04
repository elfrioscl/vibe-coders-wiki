import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const CursoGracias = () => {
  return (
    <Layout>
      <SEO 
        title="Suscripción confirmada"
        description="Te has suscrito exitosamente a Vibe Coders Wiki."
        noIndex={true}
      />
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex rounded-full bg-accent/10 p-4">
            <CheckCircle className="h-12 w-12 text-accent" />
          </div>
          
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground">
            ¡Te has suscrito!
          </h1>
          
          <p className="mb-8 text-muted-foreground">
            Te avisaremos por email cuando publiquemos contenido nuevo: tips, recursos y novedades sobre vibe coding.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/tips"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Explorar Tips
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/recursos"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Ver Recursos
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CursoGracias;
