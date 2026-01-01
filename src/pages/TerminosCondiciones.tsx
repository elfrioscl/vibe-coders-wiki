import { Layout } from "@/components/Layout";

export default function TerminosCondiciones() {
  return (
    <Layout>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          Términos y Condiciones
        </h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Última actualización: Enero 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              1. Aceptación de términos
            </h2>
            <p>
              Al acceder y utilizar este sitio web, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes usar este sitio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              2. Descripción del servicio
            </h2>
            <p>
              Vibe Coding en Español es una plataforma educativa que ofrece:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Contenido educativo gratuito sobre desarrollo con IA (vibe coding).</li>
              <li>Test de nivel para evaluar conocimientos.</li>
              <li>Tips, recursos y guías prácticas.</li>
              <li>Sistema de alertas para notificar sobre contenido nuevo.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              3. Uso del contenido
            </h2>
            <p>
              El contenido de este sitio es para uso personal y educativo. Puedes:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Leer y aprender del contenido para tu desarrollo personal.</li>
              <li>Compartir enlaces a nuestras páginas.</li>
              <li>Citar pequeñas porciones con atribución adecuada.</li>
            </ul>
            <p>
              No está permitido:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Reproducir o redistribuir el contenido sin autorización.</li>
              <li>Usar el contenido para fines comerciales sin permiso.</li>
              <li>Modificar o crear obras derivadas sin autorización.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              4. Propiedad intelectual
            </h2>
            <p>
              Todo el contenido, incluyendo textos, gráficos, logos, imágenes y software, está protegido por derechos de autor y otras leyes de propiedad intelectual. La titularidad pertenece a Vibe Coding en Español o a sus licenciantes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              5. Exención de responsabilidad
            </h2>
            <p>
              El contenido educativo se proporciona "tal cual" con fines informativos:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>No garantizamos resultados específicos al aplicar lo aprendido.</li>
              <li>Las herramientas y tecnologías mencionadas pueden cambiar con el tiempo.</li>
              <li>Recomendamos verificar la información con fuentes oficiales actualizadas.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              6. Limitación de responsabilidad
            </h2>
            <p>
              En ningún caso seremos responsables por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de este sitio o su contenido.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              7. Enlaces externos
            </h2>
            <p>
              Este sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o las prácticas de privacidad de esos sitios y no asumimos responsabilidad por ellos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              8. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio. El uso continuado del sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              9. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos a través de nuestro sitio web.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
