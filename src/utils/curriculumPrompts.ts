import type { Module, Topic, Course } from "@/data/curriculum";

type CourseLevel = "inicial" | "intermedio" | "avanzado";

const levelContexts: Record<CourseLevel, { intro: string; assumption: string }> = {
  inicial: {
    intro: "Soy alguien aprendiendo vibe coding (crear software usando inteligencia artificial). Estoy en el nivel inicial.",
    assumption: "Asume que no tengo conocimientos previos de programación. Usa analogías del mundo real y evita jerga técnica innecesaria. Explícame paso a paso como si fuera la primera vez que escucho estos conceptos.",
  },
  intermedio: {
    intro: "Soy alguien aprendiendo vibe coding (crear software usando inteligencia artificial). Estoy en el nivel intermedio y ya entiendo conceptos básicos.",
    assumption: "Puedes asumir que entiendo HTML, CSS básico, y conceptos como variables y funciones. Incluye ejemplos de código cuando sea relevante y explica el \"por qué\" detrás de las decisiones técnicas.",
  },
  avanzado: {
    intro: "Soy alguien aprendiendo vibe coding (crear software usando inteligencia artificial). Estoy en el nivel avanzado y tengo experiencia construyendo aplicaciones.",
    assumption: "Incluye mejores prácticas, edge cases, y patrones comunes. Puedes ser técnico y detallado. Menciona trade-offs y consideraciones de arquitectura cuando aplique.",
  },
};

export function generateModulePrompt(module: Module, level: CourseLevel): string {
  const context = levelContexts[level];
  
  const topicsText = module.topics
    .map((topic) => `- **${topic.title}**: ${topic.description}`)
    .join("\n");
  
  return `${context.intro}

Por favor, explícame el siguiente módulo completo:

---

**Módulo ${module.id}: ${module.title}**
**Objetivo:** ${module.objective}
**Resultado esperado:** ${module.result}

**Temas a cubrir:**
${topicsText}

---

${context.assumption}`;
}

export function generateTopicPrompt(module: Module, topic: Topic, level: CourseLevel): string {
  const context = levelContexts[level];
  
  return `${context.intro}

Por favor, explícame de forma detallada el siguiente tema:

---

**Módulo:** ${module.title}
**Tema:** ${topic.title}
**Descripción:** ${topic.description}

---

${context.assumption}`;
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
