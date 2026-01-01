import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const CursoGracias = () => {
  return (
    <Layout>
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex rounded-full bg-accent/10 p-4">
            <CheckCircle className="h-12 w-12 text-accent" />
          </div>
          
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground">
            ¡Estás en la lista!
          </h1>
          
          <p className="mb-8 text-muted-foreground">
            Te avisaremos por email cuando las guías estén disponibles. Mientras tanto, explora nuestros tips y recursos gratuitos.
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
