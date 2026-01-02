import type { Module, Topic, Course, ModuleCategory } from "@/data/curriculum";

type CourseLevel = "inicial" | "intermedio" | "avanzado";

const levelContexts: Record<CourseLevel, { intro: string; assumption: string }> = {
  inicial: {
    intro: "Soy alguien aprendiendo vibe coding (crear aplicaciones usando inteligencia artificial).",
    assumption: "Asume que no tengo conocimientos previos de programación. Usa analogías del mundo real y evita jerga técnica innecesaria. Explícame paso a paso como si fuera la primera vez que escucho estos conceptos.",
  },
  intermedio: {
    intro: "Soy alguien aprendiendo vibe coding (crear aplicaciones usando inteligencia artificial). Ya entiendo conceptos básicos de programación.",
    assumption: "Puedes asumir que entiendo HTML, CSS básico, y conceptos como variables y funciones. Incluye ejemplos de código cuando sea relevante y explica el \"por qué\" detrás de las decisiones técnicas.",
  },
  avanzado: {
    intro: "Soy alguien aprendiendo vibe coding (crear aplicaciones usando inteligencia artificial). Tengo experiencia construyendo aplicaciones.",
    assumption: "Incluye mejores prácticas, edge cases, y patrones comunes. Puedes ser técnico y detallado. Menciona trade-offs y consideraciones de arquitectura cuando aplique.",
  },
};

const categoryTemplates: Record<ModuleCategory, string> = {
  conceptual: `
**Instrucciones para este tipo de módulo (conceptual):**
- Usa analogías del mundo real para explicar cada concepto
- Explica el "por qué" antes del "cómo"
- Incluye modelos mentales o visualizaciones cuando ayude a entender
- Conecta cada concepto con su aplicación práctica en vibe coding`,

  practico: `
**Instrucciones para este tipo de módulo (práctico):**
- Incluye pasos numerados cuando aplique
- Menciona 1-2 errores comunes que los principiantes cometen y cómo evitarlos
- Da ejemplos concretos de qué escribir o hacer en la herramienta
- Incluye capturas mentales de lo que el usuario debería ver/hacer`,

  tecnico: `
**Instrucciones para este tipo de módulo (técnico):**
- Incluye ejemplos de código comentados
- Muestra errores de sintaxis o configuración comunes a evitar
- Explica qué hace cada línea relevante del código
- Cuando sea posible, muestra un "antes y después" o "incorrecto vs correcto"`,

  metodologico: `
**Instrucciones para este tipo de módulo (metodológico):**
- Presenta criterios claros de decisión (cuándo usar qué)
- Incluye "señales" o indicadores para saber cuándo aplicar cada opción
- Usa ejemplos de escenarios reales donde estas decisiones importan
- Ayúdame a desarrollar el criterio para tomar estas decisiones por mi cuenta`,
};

const levelNames: Record<CourseLevel, string> = {
  inicial: "Inicial",
  intermedio: "Intermedia",
  avanzado: "Avanzada",
};

export function generateModulePrompt(
  module: Module,
  level: CourseLevel,
  moduleIndex: number = 0,
  _course: Course
): string {
  const context = levelContexts[level];
  const categoryInstructions = categoryTemplates[module.category];

  const topicsText = module.topics
    .map((topic) => `- **${topic.title}**: ${topic.description}`)
    .join("\n");

  return `${context.intro}

Este contenido es parte de las guías de aprendizaje de https://www.vibe-coders.es — Módulo ${moduleIndex + 1} de la Guía ${levelNames[level]}.

---

Por favor, explícame el siguiente módulo:

**Módulo ${module.id}: ${module.title}**
**Objetivo:** ${module.objective}
**Resultado esperado:** ${module.result}

**Temas a cubrir:**
${topicsText}

---

${context.assumption}
${categoryInstructions}

Al finalizar, resume los 2-3 puntos más importantes para aplicar en vibe coding.`;
}

export function generateTopicPrompt(
  module: Module,
  topic: Topic,
  level: CourseLevel,
  moduleIndex: number = 0,
  _topicIndex: number = 0,
  _course: Course
): string {
  const context = levelContexts[level];
  const categoryInstructions = categoryTemplates[module.category];

  return `${context.intro}

Este contenido es parte de las guías de aprendizaje de https://www.vibe-coders.es — Módulo ${moduleIndex + 1} de la Guía ${levelNames[level]}.

---

Por favor, explícame de forma detallada el siguiente tema:

**Módulo:** ${module.title}
**Tema:** ${topic.title}
**Descripción:** ${topic.description}

---

${context.assumption}
${categoryInstructions}

Termina con un ejemplo concreto de cómo este conocimiento me ayudará cuando esté creando apps con herramientas como Lovable, Cursor o Claude.`;
}

export function formatCurriculumAsMarkdown(course: Course): string {
  const lines: string[] = [];

  lines.push(`# ${course.title}`);
  lines.push("");
  lines.push(`> ${course.description}`);
  lines.push("");

  for (const module of course.modules) {
    lines.push(`## Módulo ${module.id}: ${module.title}`);
    lines.push("");
    lines.push(`- **Objetivo:** ${module.objective}`);
    lines.push(`- **Resultado:** ${module.result}`);
    lines.push(`- **Tipo:** ${module.category}`);
    lines.push("");
    lines.push("### Temas:");
    lines.push("");

    for (const topic of module.topics) {
      lines.push(`- **${topic.title}:** ${topic.description}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}
