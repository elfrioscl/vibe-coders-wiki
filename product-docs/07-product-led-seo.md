# PRD-07: Product-led SEO

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-02
- Estado: Por implementar

---

## 1. Objetivo

Crear paginas de contenido SEO basadas en los modulos y temas del curriculum que:
- Posicionen en busquedas de long-tail relacionadas con vibe coding en espanol
- Aporten valor educativo real al usuario
- Conviertan trafico organico en usuarios del test de nivel y las guias

---

## 2. Problema que Resuelve

- Falta de contenido indexable para atraer trafico organico
- Los prompts del curriculum contienen conocimiento valioso que no esta disponible publicamente
- Usuarios potenciales buscan informacion sobre vibe coding pero no encuentran la wiki

---

## 3. Estrategia de Contenido

### Fuente de Contenido

Los prompts existentes en el curriculum (`curriculumPrompts.ts`) se utilizan como base para generar articulos. Cada modulo y tema tiene:
- Contexto por nivel (inicial, intermedio, avanzado)
- Instrucciones por categoria (conceptual, practico, tecnico, metodologico)
- Temas con titulo y descripcion

### Tipos de Paginas

| Tipo | Cantidad | Keyword target | Ejemplo URL |
|------|----------|----------------|-------------|
| Pagina de Modulo | 26 | Termino general del modulo | /aprende/bases-de-datos-sql |
| Pagina de Tema | ~150 | Long-tail especifico | /aprende/que-es-un-llm |

---

## 4. Experiencia del Usuario

### Estructura de Pagina SEO

Cada pagina de contenido tiene las siguientes secciones:

**1. Hero**
- Titulo optimizado para SEO (H1)
- Breadcrumb de navegacion
- Badge de nivel de dificultad (Inicial/Intermedio/Avanzado)
- Tiempo estimado de lectura

**2. Contenido Principal**
- Explicacion clara y estructurada
- Uso de analogias del mundo real (especialmente para nivel inicial)
- Subtitulos (H2, H3) para escaneabilidad
- Destacados o "callouts" para conceptos clave

**3. Seccion de Ejemplos**
- Bloques de codigo con syntax highlighting
- Casos practicos paso a paso
- Imagenes o diagramas cuando aplique
- Comparaciones "antes/despues" o "incorrecto/correcto"

**4. Seccion Q&A Interactiva**
- Acordeon con preguntas frecuentes
- Cada tema del modulo se convierte en una pregunta
- Las preguntas se expanden al hacer clic
- Schema markup FAQ para rich snippets en Google

**5. Call-to-Value Principal**
- Seccion destacada al final del articulo
- Titulo: "Mide tu nivel de Vibe Coding"
- Descripcion breve del test
- Boton prominente hacia /test-nivel

**6. Call-to-Value Secundario**
- Seccion de "Continua aprendiendo"
- Enlace a la guia completa del nivel correspondiente
- Modulos relacionados sugeridos

---

## 5. Componentes de Conversion

### Sidebar Flotante (Desktop)

En pantallas grandes, un sidebar sticky con:
- CTA principal: "Mide tu nivel" → /test-nivel
- Links rapidos a las 3 guias (Inicial, Intermedia, Avanzada)
- Suscripcion a alertas de nuevo contenido

### Banner Movil

En pantallas pequenas, banner fijo en la parte inferior:
- CTA compacto: "Haz el test de nivel"
- Se oculta al hacer scroll hacia abajo
- Reaparece al hacer scroll hacia arriba

### CTAs Inline

Dentro del contenido:
- Links contextuales a recursos relacionados
- Menciones al test cuando se habla de "saber tu nivel"
- Referencias a las guias cuando se profundiza en un tema

---

## 6. Estrategia SEO

### Optimizacion On-Page

| Elemento | Especificacion |
|----------|----------------|
| Title tag | "[Tema] - Guia de Vibe Coding \| Vibe Coders" |
| Meta description | Descripcion unica basada en el tema (max 160 chars) |
| H1 | Titulo del tema/modulo |
| URL slug | Kebab-case del titulo, sin acentos |
| Canonical | URL absoluta de la pagina |

### Schema Markup

- **Article**: Tipo de contenido principal
- **FAQPage**: Para la seccion Q&A
- **BreadcrumbList**: Navegacion estructurada
- **WebSite**: Datos del sitio

### Internal Linking

- Links entre temas relacionados del mismo modulo
- Links a modulos previos/siguientes
- Links a recursos externos relevantes
- Breadcrumb completo: Inicio > Aprende > [Nivel] > [Modulo] > [Tema]

---

## 7. Generacion de Contenido

### Proceso de Creacion

1. Los prompts del curriculum definen la estructura
2. El contenido se genera/edita usando los prompts como guia
3. Se agregan ejemplos practicos y codigo
4. Se crean las preguntas Q&A basadas en los temas
5. Se optimiza para SEO (titulos, meta, links internos)

### Criterios de Calidad

- Contenido original y de valor (no solo el prompt copiado)
- Ejemplos concretos de herramientas de vibe coding
- Lenguaje accesible segun el nivel
- Al menos 800 palabras por pagina de modulo
- Al menos 400 palabras por pagina de tema

---

## 8. Flujo de Usuario

```
Busqueda en Google
        ↓
   Pagina SEO
        ↓
   Lee contenido
        ↓
   Interactua con Q&A
        ↓
   Ve CTA "Mide tu nivel"
        ↓
   Completa test de nivel
        ↓
   Recibe recomendacion de guia
        ↓
   Accede a guias completas
```

---

## 9. Metricas de Exito

| Metrica | Objetivo |
|---------|----------|
| Paginas indexadas | 100% de paginas creadas |
| Posiciones top 10 | 20% de keywords target |
| Trafico organico mensual | Crecimiento MoM |
| Tasa pagina SEO → test | >5% |
| Tasa test → guia | >30% |
| Tiempo promedio en pagina | >2 minutos |

---

## 10. Fases de Implementacion

### Fase 1: Estructura Base
- Crear template de pagina SEO
- Implementar layout con secciones
- Agregar componentes de CTA

### Fase 2: Paginas de Modulos
- Generar paginas para los 26 modulos
- Implementar Q&A por modulo
- Agregar schema markup

### Fase 3: Paginas de Temas
- Generar paginas para temas de alta prioridad
- Priorizar por volumen de busqueda estimado
- Implementar internal linking

### Fase 4: Optimizacion
- Analizar metricas de rendimiento
- Iterar en contenido de bajo rendimiento
- Expandir a mas temas segun demanda

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Prompts del curriculum: `src/utils/curriculumPrompts.ts`
- Datos del curriculum: `src/data/curriculum.ts`

