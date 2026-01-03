# PRD-00: Vibe Coders Wiki - Vision

## Metadata
- Version: 1.4
- Fecha creacion: 2026-01-01
- Ultima actualizacion: 2026-01-03
- Estado: En desarrollo activo

---

## Convenciones de Documentacion PRD

Estos documentos son para personas de producto. Siguen estas reglas:

**Los PRDs describen el QUE, no el COMO**

| Incluir | No incluir |
|---------|------------|
| Objetivo y problema que resuelve | Arquitectura tecnica |
| Usuarios target | Codigo o SQL |
| Funcionalidades esperadas | Rutas o endpoints |
| Metricas de exito | Archivos afectados |
| | Diagramas de implementacion |
| | Criterios de aceptacion (van en tickets) |

Si se necesita documentar el COMO, se crea un spec tecnico separado.

---

## 1. Vision del Producto

**Vibe Coders Wiki** es el lugar para aprender vibe coding en espanol. Un esfuerzo comunitario de vibe coders que comparten aprendizajes, tips, recursos y metodologia para consolidar las mejores practicas de esta nueva disciplina.

- **Sitio web**: https://vibe-coders.es
- **Repositorio**: https://github.com/elfrioscl/vibe-coders-wiki

### Problema que resuelve
- Falta de recursos estructurados en espanol para aprender vibe coding
- Informacion dispersa sin una metodologia clara
- Barrera de entrada para hispanohablantes que quieren construir con IA

### Usuarios target
- Personas sin experiencia tecnica que quieren crear productos digitales
- Emprendedores que buscan prototipar rapido con herramientas AI-first
- Colaboradores de empresas que construyen productos internos (herramientas, dashboards, automatizaciones) sin depender de IT tradicional
- Marketers y profesionales de Growth que crean side products de adquisicion (calculadoras, comparadores, herramientas gratis) como canales de crecimiento

### Fuentes de Conocimiento
El contenido de Vibe Coders Wiki se nutre de multiples fuentes:
- **Grupo de WhatsApp de Contributors**: Comunidad activa donde se comparten experiencias, dudas y descubrimientos. Las conversaciones se procesan periodicamente para alimentar tips, guias, recursos e identificar temas no resueltos. **Todo el contenido extraido se publica de forma anonima.**
- **Pull Requests de la comunidad**: Contribuciones directas al repositorio (estas si tienen reconocimiento publico)
- **Feedback de usuarios**: A traves de GitHub Issues

Ver documento detallado: [04-fuentes-conocimiento.md](./04-fuentes-conocimiento.md)

### Estructura del Curriculum

El curriculum se organiza en tres niveles progresivos:
- **Guia Inicial**: Fundamentos para empezar a construir
- **Guia Intermedia**: Desarrollo y herramientas profesionales  
- **Guia Avanzada**: Especializacion y escalamiento

**Principio de ordenamiento: utilidad practica**

Los modulos dentro de cada guia se ordenan por lo que mas necesitas primero al construir productos, no por complejidad teorica. Ejemplos:
- Git y debugging van temprano porque los usas desde el dia uno
- Herramientas y ecosistema van al final de intermedia porque necesitas experiencia para comparar
- Monetizacion y compliance van juntos porque son requisitos legales para cobrar
- Tecnicas especializadas de IA van al final porque son las menos frecuentes

La estructura evoluciona segun el feedback de la comunidad.

---

## 2. Epicas - Indice de Documentos

Las epicas de desarrollo estan documentadas en archivos separados para mayor profundidad:

| Epica | Documento | Descripcion |
|-------|-----------|-------------|
| Contributors | [01-comunidad-contributors.md](./01-comunidad-contributors.md) | Pagina publica de reconocimiento a contributors |
| Panel Miembros | [02-panel-miembros.md](./02-panel-miembros.md) | Panel interno para miembros de la comunidad |
| Guias por Audiencia | [03-guias-por-audiencia.md](./03-guias-por-audiencia.md) | Guias adaptadas para diferentes audiencias |
| Fuentes de Conocimiento | [04-fuentes-conocimiento.md](./04-fuentes-conocimiento.md) | Flujo de procesamiento del grupo WhatsApp |
| Compartir LinkedIn | [05-compartir-linkedin.md](./05-compartir-linkedin.md) | Sistema de compartir con OG dinamicos |
| Algoritmo Test Adaptativo | [06-algoritmo-test-adaptativo.md](./06-algoritmo-test-adaptativo.md) | Logica del test de nivel con sistema de gates |
| Product-led SEO | [07-product-led-seo.md](./07-product-led-seo.md) | Paginas de contenido SEO basadas en modulos del curriculum |
| Ranking Recursos | [08-ranking-recursos.md](./08-ranking-recursos.md) | Sistema de ranking con votos de admins |

---

## 3. Decisiones de Diseno

- **Tema claro por defecto**: Limpio y accesible para todo tipo de usuarios
- **Minimalismo**: Foco en contenido, sin distracciones
- **Mobile-first**: Aunque la experiencia desktop es completa
- **Sin login obligatorio**: Reducir friccion para nuevos usuarios
- **Open source**: Codigo publico en GitHub para fomentar contribuciones
- **Design System documentado**: Pagina interna `/design-system` como referencia visual para producto y fuente de especificaciones CSS para LLMs (via atributos data-*)

---

## 4. Metricas de Exito (por definir)

- Usuarios unicos mensuales
- Tasa de completacion de guias
- Suscriptores a alertas
- Contribuciones en GitHub
- Tests de nivel completados

