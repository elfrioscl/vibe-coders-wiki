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

## 2. Grupo de WhatsApp de Contributors

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

## 3. Proceso de Extraccion de Conocimiento

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
    |    |    |    |    |
    v    v    v    v    v
+------+ +------+ +------+ +------+ +------+
| Tips | |Guias | |Issues| |Recur-| |Glosa-|
|      | |      | |Abier-| | sos  | | rio  |
|      | |      | | tos  | |      | |      |
+------+ +------+ +------+ +------+ +------+
```

---

## 4. Tipos de Contenido Extraido

### 4.1 Tips
**Que buscar:** Experiencias compartidas, trucos, soluciones a problemas comunes.

**Criterios de inclusion:**
- Consejo practico y accionable
- Aplica a mas de un caso particular
- No requiere contexto muy especifico

**Destino:** Seccion `/tips` del sitio

**Ejemplo:**
> "Descubri que si le pides a Cursor que primero te explique su plan antes de ejecutar, comete menos errores"
> -> Tip: "Usa 'explicame tu plan antes de ejecutar' para reducir errores"

### 4.2 Terminos y Procedimientos para Guias
**Que buscar:** Conceptos tecnicos mencionados, procedimientos que la gente no conoce, conocimientos que faltan en las guias actuales.

**Criterios de inclusion:**
- Termino o procedimiento no cubierto en guias actuales
- Relevante para el nivel correspondiente
- Suficientemente importante para agregarlo

**Destino:** Guias de nivel correspondiente o glosario

**Ejemplo:**
> "Alguien pregunto que es un webhook y varios no sabian"
> -> Revisar si webhook esta explicado en guias, si no, agregarlo

### 4.3 Issues Abiertos / Temas No Resueltos
**Que buscar:** Preguntas sin respuesta clara, problemas que nadie pudo resolver, temas en investigacion.

**Criterios de inclusion:**
- Pregunta o problema sin solucion conocida
- Relevante para la comunidad (no solo un caso aislado)
- Vale la pena investigar colectivamente

**Destino:** Seccion de Issues en Panel de Miembros (ver [02-panel-miembros.md](./02-panel-miembros.md))

**Ejemplo:**
> "Nadie ha logrado hacer deploy de una app vibe-coded a iOS"
> -> Issue abierto: "Bytecoding para aplicaciones moviles"

### 4.4 Herramientas para Biblioteca
**Que buscar:** Herramientas mencionadas positivamente, recomendaciones de la comunidad.

**Criterios de inclusion:**
- Herramienta util para vibe coding
- Al menos 2-3 personas la recomiendan o usan
- No esta ya en la seccion de recursos

**Destino:** Seccion `/recursos` del sitio

**Ejemplo:**
> "He estado usando Supabase para todo y es genial para vibe coding"
> -> Si no esta, agregar Supabase a recursos

### 4.5 Glosario de Terminos
**Que buscar:** Terminos tecnicos que causan confusion, jerga de vibe coding.

**Criterios de inclusion:**
- Termino usado frecuentemente
- Genera confusion o preguntas
- No tiene definicion clara en el sitio

**Destino:** Glosario (por crear) o seccion de guias

---

## 5. Plantilla de Procesamiento

### Resumen Semanal de WhatsApp

```markdown
## Semana: [FECHA]

### Tips Identificados
1. [Descripcion del tip] - Mencionado por: [persona]

### Terminos/Conocimientos Faltantes
1. [Termino] - Contexto: [donde se menciono]

### Issues Abiertos Nuevos
1. [Titulo del issue] - Descripcion: [breve]

### Herramientas Mencionadas
1. [Nombre] - Categoria: [tipo] - Recomendado por: [cuantos]

### Notas Adicionales
- [Cualquier otro insight relevante]
```

---

## 6. Otras Fuentes de Conocimiento

### 6.1 Pull Requests
- Contribuciones directas al repositorio
- Revisar PRs para identificar mejoras de contenido

### 6.2 GitHub Issues
- Feedback de usuarios
- Solicitudes de funcionalidades
- Reportes de errores o contenido faltante

### 6.3 Formulario de Contacto (futuro)
- Sugerencias de usuarios no registrados
- Preguntas frecuentes que indican gaps en contenido

---

## 7. Responsabilidades

| Rol | Responsabilidad |
|-----|-----------------|
| Mantenedor | Procesar conversaciones de WhatsApp |
| Contributors | Compartir experiencias en el grupo |
| Comunidad | Proponer tips y recursos via PRs |

---

## 8. Metricas

- Tips agregados por mes desde WhatsApp
- Issues identificados y resueltos
- Herramientas agregadas a biblioteca
- Terminos agregados a guias/glosario

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Issues abiertos: [02-panel-miembros.md](./02-panel-miembros.md)

