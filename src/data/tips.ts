export type TagType = "metodologicos" | "growth" | "herramientas" | "diseno" | "modelos";

export interface Tip {
  id: string;
  title: string;
  description: string;
  tags: TagType[];
  level: "basico" | "intermedio" | "avanzado";
}

export const tips: Tip[] = [
  // NIVEL BÁSICO
  {
    id: "1",
    title: "Un problema a la vez",
    description: "Resuelve un solo problema por iteración. Evita mezclar múltiples cambios en un solo commit o prompt.",
    tags: ["metodologicos"],
    level: "basico",
  },
  {
    id: "2",
    title: "Stick to the plan",
    description: "Mantén el foco en el plan original. No te desvíes con features adicionales hasta terminar lo que estás haciendo.",
    tags: ["metodologicos"],
    level: "basico",
  },
  {
    id: "3",
    title: "No mezcles problemas en un prompt",
    description: "Cada prompt debe abordar un solo tema. Si tienes múltiples issues, divídelos en prompts separados.",
    tags: ["metodologicos"],
    level: "basico",
  },
  {
    id: "4",
    title: "Pide a ChatGPT el prompt inicial",
    description: "Usa un LLM para generar el prompt inicial de tu proyecto. Así obtienes una estructura más completa desde el principio.",
    tags: ["metodologicos", "modelos"],
    level: "basico",
  },
  // NIVEL INTERMEDIO
  {
    id: "5",
    title: "Haz commits frecuentes",
    description: "Cada feature pequeña terminada = commit. Si algo se rompe, puedes volver fácilmente.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "6",
    title: "Mantén registro de acciones",
    description: "Documenta cada cambio importante que hagas. Te ahorrará horas de debugging cuando algo se rompa.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "7",
    title: "Trabaja por versiones",
    description: "Implementa features de forma incremental. v0.1, v0.2, etc. Cada versión debe ser funcional.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "8",
    title: "Documenta cada cambio",
    description: "Mantén un changelog o documento donde registres qué cambios hiciste y por qué.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "9",
    title: "Divide y vencerás",
    description: "Proyectos grandes deben dividirse en módulos pequeños. Trabaja cada módulo de forma aislada.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "10",
    title: "Dibuja el output visual primero",
    description: "Antes de implementar UI, haz un sketch o wireframe. Evita re-trabajo describiendo exactamente lo que quieres.",
    tags: ["diseno"],
    level: "intermedio",
  },
  {
    id: "11",
    title: "Usa referencias visuales",
    description: "Cuando pidas UI, adjunta screenshots o links de referencia. Los LLMs entienden mejor con ejemplos visuales.",
    tags: ["diseno", "modelos"],
    level: "intermedio",
  },
  // NIVEL AVANZADO
  {
    id: "12",
    title: "Ten un documento de contexto",
    description: "Crea un doc con toda la info de tu proyecto: stack, estructura, decisiones de diseño. Pégalo al inicio de cada chat.",
    tags: ["metodologicos", "modelos"],
    level: "avanzado",
  },
  {
    id: "13",
    title: "Versiona tu contexto",
    description: "A medida que tu proyecto crece, actualiza tu documento de contexto. El contexto desactualizado genera código malo.",
    tags: ["metodologicos", "modelos"],
    level: "avanzado",
  },
  {
    id: "14",
    title: "No te cases con un solo modelo",
    description: "Diferentes LLMs tienen diferentes fortalezas. Usa Claude para código largo, GPT-4 para creatividad, etc.",
    tags: ["modelos"],
    level: "avanzado",
  },
  {
    id: "15",
    title: "Usa agentes de QA/QC",
    description: "Configura agentes especializados para revisar tu código. Uno para lógica, otro para UI, otro para tests.",
    tags: ["metodologicos", "modelos"],
    level: "avanzado",
  },
  {
    id: "16",
    title: "Product Led SEO para keywords longtail",
    description: "Usa Google Keyword Planner para identificar keywords longtail con volumen. Crea páginas programáticas (comparadores, directorios, herramientas) que resuelvan esas búsquedas y generen tráfico orgánico hacia tu producto.",
    tags: ["growth"],
    level: "avanzado",
  },
  {
    id: "17",
    title: "Usa NotebookLM para crear Knowledge Bases",
    description: "Sube documentos, artículos o información de tu nicho a NotebookLM para crear una Knowledge Base estructurada. Luego usa esa KB como contexto en tus prompts de vibe coding para obtener respuestas más precisas y relevantes a tu dominio.",
    tags: ["herramientas", "modelos"],
    level: "avanzado",
  },
  {
    id: "18",
    title: "Piensa en MLP, no en MVP",
    description: "En vez de Minimum Viable Product, apunta a Minimum Lovable Product. Si tu producto no enamora desde el inicio, nadie lo usará. Construye algo que la gente quiera compartir.",
    tags: ["growth", "metodologicos"],
    level: "basico",
  },
  {
    id: "19",
    title: "Usa metodologías ágiles para ordenar tu vibe coding",
    description: "Aplica principios ágiles (sprints, backlog, retrospectivas) para organizar tus MVPs. Te ayuda a medir progreso real y evitar que el vibe coding se vuelva infinito.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "20",
    title: "Crea una 'constitución' del proyecto",
    description: "Arma un documento base con las reglas y límites de tu proyecto. Consúltalo antes de cada feature para evitar featuritis y mantener el foco.",
    tags: ["metodologicos"],
    level: "intermedio",
  },
  {
    id: "21",
    title: "Último paso siempre humano",
    description: "Usa guardrails y validaciones, pero siempre deja la aprobación final a un humano. El riesgo de alucinaciones no vale el ahorro de tiempo.",
    tags: ["metodologicos"],
    level: "avanzado",
  },
  {
    id: "22",
    title: "Conecta Lovable con Git + Cursor",
    description: "Para tareas complejas como PLSEO, conecta tu proyecto Lovable a Git y usa Cursor con Opus 4.5 en modo agente. Puede programar 30+ minutos autónomamente.",
    tags: ["herramientas", "metodologicos"],
    level: "avanzado",
  },
];

export const levels = {
  basico: {
    label: "Básico",
    description: "Fundamentos para empezar",
  },
  intermedio: {
    label: "Intermedio",
    description: "Mejora tu flujo de trabajo",
  },
  avanzado: {
    label: "Avanzado",
    description: "Técnicas especializadas",
  },
};

export const tags = {
  metodologicos: {
    label: "Metodológicos",
    description: "Proceso, foco y buenas prácticas de desarrollo",
    icon: "GitBranch",
  },
  growth: {
    label: "Growth",
    description: "SEO, marketing digital y tracción de usuarios",
    icon: "TrendingUp",
  },
  herramientas: {
    label: "Herramientas",
    description: "Servicios, APIs y stack técnico",
    icon: "Wrench",
  },
  diseno: {
    label: "Diseño",
    description: "Interfaces y experiencia de usuario",
    icon: "Palette",
  },
  modelos: {
    label: "Modelos",
    description: "Uso y selección de LLMs",
    icon: "Brain",
  },
};

// Keep categories as alias for backwards compatibility during transition
export const categories = tags;
