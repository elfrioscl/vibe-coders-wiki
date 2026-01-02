import { Layout } from "@/components/Layout";

export default function PoliticaPrivacidad() {
  return (
    <Layout>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Última actualización: Enero 2026
          </p>

          <section className="space-y-3">
            <p>
              Vibe Coding en Español es un proyecto colaborativo de la comunidad hispanohablante, 
              creado y mantenido por entusiastas, no necesariamente profesionales técnicos. 
              Nuestro objetivo es documentar y compartir las mejores prácticas del desarrollo 
              con IA (vibe coding).
            </p>
            <p>
              Este documento explica cómo manejamos los datos que nos proporcionas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              1. Datos que recopilamos
            </h2>
            <p>
              Recopilamos los siguientes datos cuando usas nuestro sitio:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Email:</strong> Cuando te suscribes a nuestras alertas de contenido nuevo.
              </li>
              <li>
                <strong>Resultados del test de nivel:</strong> Se guardan de forma anónima para generar estadísticas agregadas. No están vinculados a tu identidad personal.
              </li>
              <li>
                <strong>Ubicación aproximada:</strong> Cuando completas el test de nivel, guardamos el idioma de tu navegador y zona horaria para generar estadísticas geográficas agregadas. No guardamos tu dirección IP ni ubicación exacta.
              </li>
              <li>
                <strong>Preferencias de tema:</strong> Qué nivel o tema te interesa para enviarte contenido relevante.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              2. Cómo usamos tus datos
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>Para enviarte notificaciones sobre contenido nuevo que coincida con tus intereses.</li>
              <li>Para generar estadísticas anónimas sobre el rendimiento del test de nivel.</li>
              <li>Para mejorar nuestro contenido educativo basándonos en patrones agregados.</li>
            </ul>
            <p>
              <strong>No vendemos ni compartimos tus datos personales con terceros</strong> para fines comerciales o publicitarios.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              3. Almacenamiento y seguridad
            </h2>
            <p>
              Tus datos se almacenan de forma segura utilizando infraestructura cloud con encriptación en tránsito y en reposo. Implementamos medidas de seguridad estándar de la industria para proteger tu información.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              4. Tus derechos
            </h2>
            <p>
              Tienes derecho a:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Solicitar acceso a los datos que tenemos sobre ti.</li>
              <li>Solicitar la eliminación de tus datos personales.</li>
              <li>Darte de baja de las alertas en cualquier momento.</li>
            </ul>
            <p>
              Para ejercer estos derechos, contáctanos usando la información al final de esta página.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              5. Cookies y tecnologías similares
            </h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia. Clasificamos nuestras cookies en dos categorías:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio, 
                como recordar tus preferencias de tema. Estas cookies siempre están activas y no requieren 
                consentimiento.
              </li>
              <li>
                <strong>Cookies analíticas:</strong> Nos ayudan a entender cómo los usuarios navegan 
                por el sitio para poder mejorarlo. Podemos utilizar servicios como Google Analytics. 
                Estas cookies son opcionales y solo se activan si das tu consentimiento.
              </li>
            </ul>
            <p>
              Puedes gestionar tus preferencias de cookies en cualquier momento haciendo clic en 
              "Ajustes de cookies" en el pie de página del sitio. Las cookies tienen una duración 
              máxima de 1 año.
            </p>
            <p>
              <strong>No utilizamos cookies de publicidad</strong> ni compartimos datos con redes 
              publicitarias.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              6. Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios significativos a través de nuestro sitio o por email si estás suscrito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              7. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, 
              puedes abrir un issue en nuestro{" "}
              <a 
                href="https://github.com/elfrioscl/vibe-coders-wiki/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                repositorio de GitHub
              </a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
