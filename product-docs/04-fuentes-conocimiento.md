# PRD-04: Fuentes de Conocimiento

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-02
- Estado: Proceso activo
- Tipo: Documentacion de procesos

---

## 1. Objetivo

Documentar las fuentes de conocimiento que alimentan el contenido de Vibe Coders Wiki y los procesos para incorporar nuevo material.

---

## 2. Politica de Anonimato

### Contenido de WhatsApp
Todo el contenido extraido del grupo de WhatsApp se publica de forma **anonima**:
- Los tips no incluyen atribucion de quien los compartio
- Las herramientas recomendadas no mencionan quien las sugirio
- Los terminos agregados a las guias no tienen fuente citada

### Por que anonimato
- Reduce friccion para compartir en el grupo (nadie se preocupa por "quedar mal")
- El conocimiento es colectivo, no individual
- Simplifica el proceso de publicacion

### Tracking interno
Para efectos de procesamiento, el mantenedor puede registrar internamente quien menciono que cosa, pero esta informacion **nunca se publica** en el sitio.

### Diferencia con Contributors
La pagina de Contributors (ver [01-comunidad-contributors.md](./01-comunidad-contributors.md)) es diferente:
- Reconoce **Pull Requests aceptados** en GitHub
- Es reconocimiento publico por contribuciones de codigo/documentacion
- Requiere accion explicita (hacer un PR)

El grupo de WhatsApp es comunicacion informal; la pagina de Contributors es reconocimiento formal.

---

## 3. Grupo de WhatsApp de Contributors

### Descripcion
Grupo privado de WhatsApp donde participan los contributors activos de la comunidad. Es el espacio principal de comunicacion informal donde se comparten:
- Experiencias del dia a dia usando vibe coding
- Dudas y problemas encontrados
- Descubrimientos de herramientas nuevas
- Discusiones sobre mejores practicas
- Temas que no tienen solucion clara aun

### Participantes
- Contributors activos (personas con PRs aceptados)
- Mantenedores del proyecto
- Miembros invitados de la comunidad

---

## 4. Proceso de Extraccion de Conocimiento

### Frecuencia
- Procesamiento periodico (sugerido: semanal o quincenal)
- Puede ser manual o semi-automatizado

### Flujo de Procesamiento

```
+-------------------+
|  Grupo WhatsApp   |
|   Contributors    |
+--------+----------+
         |
         v
+--------+----------+
|   Bajada de       |
|  Conversaciones   |
+--------+----------+
         |
         v
+--------+----------+
|  Procesamiento    |
|  (Manual o IA)    |
+--------+----------+
         |
    +----+----+----+----+
    |    |    |    |
    v    v    v    v
+------+ +------+ +------+ +------+
| Tips | |Guias | |Issues| |Recur-|
|      | |      | |Abier-| | sos  |
|      | |      | | tos  | |      |
+------+ +------+ +------+ +------+
```

---

## 5. Tipos de Contenido Extraido

### 5.1 Tips
**Que buscar:** Experiencias compartidas, trucos, soluciones a problemas comunes.

**Criterios de inclusion:**
- Consejo practico y accionable
- Aplica a mas de un caso particular
- No requiere contexto muy especifico

**Destino:** Seccion `/tips` del sitio

**Ejemplo:**
> "Descubri que si le pides a Cursor que primero te explique su plan antes de ejecutar, comete menos errores"
> -> Tip: "Usa 'explicame tu plan antes de ejecutar' para reducir errores"

### 5.2 Terminos y Procedimientos para Guias
**Que buscar:** Conceptos tecnicos mencionados, procedimientos que la gente no conoce, conocimientos que faltan en las guias actuales.

**Criterios de inclusion:**
- Termino o procedimiento no cubierto en guias actuales
- Relevante para el nivel correspondiente
- Suficientemente importante para agregarlo

**Destino:** Guias de nivel correspondiente o glosario

**Ejemplo:**
> "Alguien pregunto que es un webhook y varios no sabian"
> -> Revisar si webhook esta explicado en guias, si no, agregarlo

### 5.3 Issues Abiertos / Temas No Resueltos
**Que buscar:** Preguntas sin respuesta clara, problemas que nadie pudo resolver, temas en investigacion.

**Criterios de inclusion:**
- Pregunta o problema sin solucion conocida
- Relevante para la comunidad (no solo un caso aislado)
- Vale la pena investigar colectivamente

**Destino:** Seccion de Issues en Panel de Miembros (ver [02-panel-miembros.md](./02-panel-miembros.md))

**Ejemplo:**
> "Nadie ha logrado hacer deploy de una app vibe-coded a iOS"
> -> Issue abierto: "Bytecoding para aplicaciones moviles"

### 5.4 Herramientas para Biblioteca
**Que buscar:** Herramientas mencionadas positivamente, recomendaciones de la comunidad.

**Criterios de inclusion:**
- Herramienta util para vibe coding
- Al menos 2-3 personas la recomiendan o usan
- No esta ya en la seccion de recursos

**Destino:** Seccion `/recursos` del sitio

**Ejemplo:**
> "He estado usando Supabase para todo y es genial para vibe coding"
> -> Si no esta, agregar Supabase a recursos

### 5.5 Terminos Tecnicos para Guias
**Que buscar:** Terminos tecnicos que causan confusion, jerga de vibe coding.

**Criterios de inclusion:**
- Termino usado frecuentemente
- Genera confusion o preguntas
- No tiene definicion clara en las guias actuales

**Destino:** Guias de nivel correspondiente (no hay glosario separado, los terminos se integran en los modulos)

---

## 6. Plantilla de Procesamiento

### Resumen Semanal de WhatsApp (uso interno)

Esta plantilla es para uso del mantenedor al procesar conversaciones. La informacion de "Mencionado por" es solo para tracking interno y **no se publica**.

```markdown
## Semana: [FECHA]

### Tips Identificados
1. [Descripcion del tip]
   - (interno) Mencionado por: [persona] - NO PUBLICAR

### Terminos/Conocimientos Faltantes
1. [Termino] - Nivel sugerido: [inicial/intermedio/avanzado]

### Issues Abiertos Nuevos
1. [Titulo del issue] - Descripcion: [breve]

### Herramientas Mencionadas
1. [Nombre] - Categoria: [tipo]

### Notas Adicionales
- [Cualquier otro insight relevante]
```

**Recordatorio:** Al publicar en el sitio, omitir toda atribucion personal.

---

## 7. Otras Fuentes de Conocimiento

### 7.1 Pull Requests
- Contribuciones directas al repositorio
- Revisar PRs para identificar mejoras de contenido

### 7.2 GitHub Issues
- Feedback de usuarios
- Solicitudes de funcionalidades
- Reportes de errores o contenido faltante

### 7.3 Formulario de Contacto (futuro)
- Sugerencias de usuarios no registrados
- Preguntas frecuentes que indican gaps en contenido

---

## 8. Responsabilidades

| Rol | Responsabilidad |
|-----|-----------------|
| Mantenedor | Procesar conversaciones de WhatsApp |
| Contributors | Compartir experiencias en el grupo |
| Comunidad | Proponer tips y recursos via PRs |

---

## 9. Metricas

- Tips agregados por mes desde WhatsApp
- Issues identificados y resueltos
- Herramientas agregadas a biblioteca
- Terminos agregados a guias

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Issues abiertos: [02-panel-miembros.md](./02-panel-miembros.md)

