# PRD-00: Vibe Coders Wiki - Vision

## Metadata
- Version: 1.3
- Fecha creacion: 2026-01-01
- Ultima actualizacion: 2026-01-02
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
| Criterios de aceptacion | Archivos afectados |
| Metricas de exito | Diagramas de implementacion |

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

---

## 3. Decisiones de Diseno

- **Tema claro por defecto**: Limpio y accesible para todo tipo de usuarios
- **Minimalismo**: Foco en contenido, sin distracciones
- **Mobile-first**: Aunque la experiencia desktop es completa
- **Sin login obligatorio**: Reducir friccion para nuevos usuarios
- **Open source**: Codigo publico en GitHub para fomentar contribuciones

---

## 4. Metricas de Exito (por definir)

- Usuarios unicos mensuales
- Tasa de completacion de guias
- Suscriptores a alertas
- Contribuciones en GitHub
- Tests de nivel completados

