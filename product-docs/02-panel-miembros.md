# PRD-02: Panel Interno para Miembros

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-02
- Estado: Por desarrollar
- Tipo: Funcionalidad interna (requiere autenticacion)

---

## 1. Objetivo

Crear un panel interno accesible solo para miembros de la comunidad donde puedan:
- Ver su progreso de aprendizaje
- Acceder a informacion exclusiva
- Ver issues abiertos de la comunidad
- Gestionar bookmarks y favoritos

### Diferencia con pagina publica
- **Pagina publica de Contributors**: Visible para todos, reconoce aportes
- **Panel de Miembros**: Solo para miembros autenticados, funcionalidades internas

---

## 2. Funcionalidades

### 2.1 Dashboard Personal
- Resumen de progreso en guias
- Tips guardados como favoritos
- Recursos marcados
- Estadisticas de uso

### 2.2 Progreso en Guias
- Marcar modulos como completados
- Barra de progreso por nivel (Inicial, Intermedio, Avanzado)
- Historial de actividad

### 2.3 Bookmarks y Favoritos
- Guardar tips favoritos
- Guardar recursos de interes
- Lista personalizada de acceso rapido

### 2.4 Issues Abiertos de la Comunidad
Seccion visible **solo para miembros** con temas no resueltos que la comunidad esta investigando:

#### Issues Actuales

> **Nota:** Los issues provienen del grupo de WhatsApp y se publican de forma anonima. El campo "Reportado por" es solo para tracking interno del mantenedor y no se muestra en la UI publica.

| ID | Titulo | Descripcion | Estado |
|----|--------|-------------|--------|
| ISS-001 | Bytecoding para Apps Moviles | Como llevar proyectos de vibe coding a aplicaciones moviles nativas. Investigar frameworks, limitaciones y mejores practicas. | Abierto |
| ISS-002 | Integracion Logo + Shopify | Feedback y documentacion sobre como integrar Logo con Shopify. Casos de uso, problemas comunes, soluciones. | Abierto |
| ISS-003 | Social Preview dinamico en Lovable | No se ha logrado que el social preview (og:title, og:description) cambie dinamicamente por pagina en apps de Lovable. | Abierto |
| ISS-004 | Separar pre-produccion y produccion en Supabase con Lovable | Lovable solo permite un ambiente de Supabase. No hay forma clara de tener staging y produccion separados, lo que limita escalabilidad. | Abierto |
| ISS-005 | Grounding + Structured Output en Vertex AI | En Vertex AI, el tool de grounding (RAG con documentos) no puede coexistir con structured output en JSON. Fuerza a limpiar errores manualmente. | Abierto |
| ISS-006 | Conversion de webapps a apps moviles con Capacitor | Falta documentacion y casos de exito de comunidad sobre como usar Capacitor u otras herramientas para convertir apps vibe-coded a movil. | Abierto |

#### Gestion de Issues
- Cualquier miembro puede proponer nuevos issues
- Los issues se alimentan del grupo de WhatsApp (temas no resueltos)
- Se pueden cerrar cuando se encuentra solucion (y se documenta)

### 2.5 Certificados (Futuro)
- Certificado de completacion por nivel
- Exportable como imagen o PDF
- Verificable con codigo unico

### 2.6 Votacion de Recursos (Solo Admins)
Sistema para rankear herramientas y recursos basado en votos de admins:

- Cada admin puede votar una vez por recurso
- Los votos determinan el orden de recomendacion publica en la pagina de Recursos
- Interface para ver, agregar y quitar votos por categoria
- El ranking resultante es visible para todos los visitantes

Ver documento detallado: [08-ranking-recursos.md](./08-ranking-recursos.md)

---

## 3. Niveles de Acceso

- **Visitante**: Solo contenido publico
- **Miembro**: Panel personal, issues, bookmarks
- **Contributor**: Todo lo anterior + reconocimiento en pagina publica
- **Admin**: Todo lo anterior + votacion de recursos para ranking

---

## 4. Criterios de Aceptacion

- [ ] Sistema de autenticacion funcional (GitHub OAuth minimo)
- [ ] Dashboard con resumen de progreso
- [ ] Poder marcar modulos como completados
- [ ] Seccion de issues visible para miembros
- [ ] Agregar/quitar bookmarks de tips y recursos
- [ ] Responsive en mobile y desktop

---

## 5. Dependencias

- Sistema de autenticacion
- Definir flujo de onboarding para nuevos miembros

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Fuente de issues: [04-fuentes-conocimiento.md](./04-fuentes-conocimiento.md)

