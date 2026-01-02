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
              Vibe Coding en Español es un esfuerzo colaborativo de la comunidad hispanohablante 
              cuyo objetivo es documentar las mejores prácticas que vamos identificando en el 
              desarrollo con IA (vibe coding) y compartirlas para ayudar a avanzar la disciplina.
            </p>
            <p>
              El proyecto es de código abierto y su repositorio es público en GitHub. 
              Cualquier persona puede contribuir enviando un pull request con mejoras, 
              correcciones o nuevo contenido. Las contribuciones son revisadas antes 
              de ser incorporadas al sitio.
            </p>
            <p>
              Puedes encontrar el repositorio en:{" "}
              <a 
                href="https://github.com/vibecoding-es/vibecoding" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                github.com/vibecoding-es/vibecoding
              </a>
            </p>
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
              Sí está permitido, mientras se cite la fuente:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Reproducir o redistribuir el contenido con atribución.</li>
              <li>Usar el contenido para fines comerciales citando la fuente.</li>
              <li>Modificar o crear obras derivadas con atribución.</li>
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
              Este proyecto es creado y mantenido por entusiastas y miembros de la comunidad, 
              no necesariamente por profesionales técnicos. Contribuimos con la mejor intención 
              de compartir conocimiento, pero reconocemos nuestras limitaciones.
            </p>
            <p>
              El contenido educativo se proporciona "tal cual" con fines informativos:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>El contenido puede contener errores, imprecisiones u omisiones.</li>
              <li>No debes tomar la información como verdad absoluta.</li>
              <li>Es tu responsabilidad verificar y contrastar la información antes de aplicarla.</li>
              <li>No garantizamos resultados específicos al aplicar lo aprendido.</li>
              <li>Las herramientas y tecnologías mencionadas pueden cambiar con el tiempo.</li>
              <li>Recomendamos siempre consultar la documentación oficial y fuentes actualizadas.</li>
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
