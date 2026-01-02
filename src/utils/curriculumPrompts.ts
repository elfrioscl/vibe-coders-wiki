import type { Module, Topic, Course } from "@/data/curriculum";

type CourseLevel = "inicial" | "intermedio" | "avanzado";

const levelContexts: Record<CourseLevel, { intro: string; assumption: string }> = {
  inicial: {
    intro: "Soy alguien aprendiendo vibe coding (escribir código usando inteligencia artificial). Estoy en el nivel inicial.",
    assumption: "Asume que no tengo conocimientos previos de programación. Usa analogías del mundo real y evita jerga técnica innecesaria. Explícame paso a paso como si fuera la primera vez que escucho estos conceptos.",
  },
  intermedio: {
    intro: "Soy alguien aprendiendo vibe coding (escribir código usando inteligencia artificial). Estoy en el nivel intermedio y ya entiendo conceptos básicos.",
    assumption: "Puedes asumir que entiendo HTML, CSS básico, y conceptos como variables y funciones. Incluye ejemplos de código cuando sea relevante y explica el \"por qué\" detrás de las decisiones técnicas.",
  },
  avanzado: {
    intro: "Soy alguien aprendiendo vibe coding (escribir código usando inteligencia artificial). Estoy en el nivel avanzado y tengo experiencia construyendo aplicaciones.",
    assumption: "Incluye mejores prácticas, edge cases, y patrones comunes. Puedes ser técnico y detallado. Menciona trade-offs y consideraciones de arquitectura cuando aplique.",
  },
};

const vibeCodingModuleInstructions = `

**IMPORTANTE sobre la estructura de tu respuesta:**
- Para CADA concepto, sigue esta estructura:
  1. Primero explica el concepto con ejemplos generales (del mundo real o técnicos según el nivel)
  2. Después, conecta específicamente con vibe coding: por qué es importante y cómo se aplica al crear apps con IA
- Usa ejemplos prácticos de herramientas como Lovable, Cursor, Bolt, etc.
- Después de explicar cada concepto, añade: "En vibe coding, esto es útil porque..." o "Cuando trabajes con IA, esto te ayudará a..."
- Al finalizar, resume los puntos clave de aplicabilidad práctica`;

const vibeCodingTopicInstructions = `

**IMPORTANTE sobre la estructura de tu respuesta:**
- Sigue esta estructura para explicar el tema:
  1. Primero explica el concepto con ejemplos generales claros
  2. Luego conecta con vibe coding: por qué es importante y cómo se aplica prácticamente
- Dame ejemplos concretos de cuándo necesitaré este conocimiento al crear apps con IA
- Incluye al menos un escenario real donde este concepto marca la diferencia al usar herramientas como Lovable, Cursor o Claude`;

const getContinuityIntro = (isFirst: boolean, type: "module" | "topic"): string => {
  if (isFirst) return "";
  
  if (type === "module") {
    return `

Continuando con mi aprendizaje de vibe coding (ya hemos cubierto los módulos anteriores, así que puedes hacer referencia a conceptos que ya debería conocer).
`;
  }
  
  return `

Continuando con el mismo módulo (este tema sigue a los anteriores, así que puedes asumir que ya los entiendo).
`;
};

const getGuideContext = (course: Course, moduleIndex: number, level: CourseLevel): string => {
  const levelNames: Record<CourseLevel, string> = { inicial: "1", intermedio: "2", avanzado: "3" };
  const levelName = levelNames[level];
  
  const curriculumText = course.modules
    .map((m) => {
      const topics = m.topics.map((t) => `  - ${t.title}`).join("\n");
      return `**Módulo ${m.id}: ${m.title}**\n${topics}`;
    })
    .join("\n\n");
  
  return `Estoy usando las guías de aprendizaje de vibe-coders.es, y estoy en el nivel ${levelName} (${level}), módulo ${moduleIndex + 1}.

Te adjunto el temario completo del curso para que tengas contexto:

${curriculumText}`;
};

export function generateModulePrompt(
  module: Module, 
  level: CourseLevel, 
  moduleIndex: number = 0,
  course: Course
): string {
  const context = levelContexts[level];
  const isFirst = moduleIndex === 0;
  const continuity = getContinuityIntro(isFirst, "module");
  const guideContext = getGuideContext(course, moduleIndex, level);
  
  const topicsText = module.topics
    .map((topic) => `- **${topic.title}**: ${topic.description}`)
    .join("\n");
  
  return `${context.intro}${continuity}

${guideContext}

---

Por favor, explícame el siguiente módulo:

**Módulo ${module.id}: ${module.title}**
**Objetivo:** ${module.objective}
**Resultado esperado:** ${module.result}

**Temas a cubrir:**
${topicsText}

---

${context.assumption}${vibeCodingModuleInstructions}`;
}

export function generateTopicPrompt(
  module: Module, 
  topic: Topic, 
  level: CourseLevel, 
  moduleIndex: number = 0, 
  topicIndex: number = 0,
  course: Course
): string {
  const context = levelContexts[level];
  const isFirst = moduleIndex === 0 && topicIndex === 0;
  const continuity = getContinuityIntro(isFirst, "topic");
  const guideContext = getGuideContext(course, moduleIndex, level);
  
  return `${context.intro}${continuity}

${guideContext}

---

Por favor, explícame de forma detallada el siguiente tema:

**Módulo:** ${module.title}
**Tema:** ${topic.title}
**Descripción:** ${topic.description}

---

${context.assumption}${vibeCodingTopicInstructions}`;
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
