export interface Tip {
  id: string;
  title: string;
  description: string;
  category: "productividad" | "prompts" | "flujo" | "llms" | "ui-ux";
  level: "basico" | "intermedio" | "avanzado";
}

export const tips: Tip[] = [
  // NIVEL BÁSICO
  {
    id: "1",
    title: "Un problema a la vez",
    description: "Resuelve un solo problema por iteración. Evita mezclar múltiples cambios en un solo commit o prompt.",
    category: "productividad",
    level: "basico",
  },
  {
    id: "2",
    title: "Stick to the plan",
    description: "Mantén el foco en el plan original. No te desvíes con features adicionales hasta terminar lo que estás haciendo.",
    category: "productividad",
    level: "basico",
  },
  {
    id: "3",
    title: "No mezcles problemas en un prompt",
    description: "Cada prompt debe abordar un solo tema. Si tienes múltiples issues, divídelos en prompts separados.",
    category: "prompts",
    level: "basico",
  },
  {
    id: "4",
    title: "Pide a ChatGPT el prompt inicial",
    description: "Usa un LLM para generar el prompt inicial de tu proyecto. Así obtienes una estructura más completa desde el principio.",
    category: "prompts",
    level: "basico",
  },
  // NIVEL INTERMEDIO
  {
    id: "5",
    title: "Haz commits frecuentes",
    description: "Cada feature pequeña terminada = commit. Si algo se rompe, puedes volver fácilmente.",
    category: "flujo",
    level: "intermedio",
  },
  {
    id: "6",
    title: "Mantén registro de acciones",
    description: "Documenta cada cambio importante que hagas. Te ahorrará horas de debugging cuando algo se rompa.",
    category: "productividad",
    level: "intermedio",
  },
  {
    id: "7",
    title: "Trabaja por versiones",
    description: "Implementa features de forma incremental. v0.1, v0.2, etc. Cada versión debe ser funcional.",
    category: "flujo",
    level: "intermedio",
  },
  {
    id: "8",
    title: "Documenta cada cambio",
    description: "Mantén un changelog o documento donde registres qué cambios hiciste y por qué.",
    category: "flujo",
    level: "intermedio",
  },
  {
    id: "9",
    title: "Divide y vencerás",
    description: "Proyectos grandes deben dividirse en módulos pequeños. Trabaja cada módulo de forma aislada.",
    category: "productividad",
    level: "intermedio",
  },
  {
    id: "10",
    title: "Dibuja el output visual primero",
    description: "Antes de implementar UI, haz un sketch o wireframe. Evita re-trabajo describiendo exactamente lo que quieres.",
    category: "ui-ux",
    level: "intermedio",
  },
  {
    id: "11",
    title: "Usa referencias visuales",
    description: "Cuando pidas UI, adjunta screenshots o links de referencia. Los LLMs entienden mejor con ejemplos visuales.",
    category: "ui-ux",
    level: "intermedio",
  },
  // NIVEL AVANZADO
  {
    id: "12",
    title: "Ten un documento de contexto",
    description: "Crea un doc con toda la info de tu proyecto: stack, estructura, decisiones de diseño. Pégalo al inicio de cada chat.",
    category: "llms",
    level: "avanzado",
  },
  {
    id: "13",
    title: "Versiona tu contexto",
    description: "A medida que tu proyecto crece, actualiza tu documento de contexto. El contexto desactualizado genera código malo.",
    category: "llms",
    level: "avanzado",
  },
  {
    id: "14",
    title: "No te cases con un solo modelo",
    description: "Diferentes LLMs tienen diferentes fortalezas. Usa Claude para código largo, GPT-4 para creatividad, etc.",
    category: "llms",
    level: "avanzado",
  },
  {
    id: "15",
    title: "Usa agentes de QA/QC",
    description: "Configura agentes especializados para revisar tu código. Uno para lógica, otro para UI, otro para tests.",
    category: "flujo",
    level: "avanzado",
  },
  {
    id: "16",
    title: "SEO Programático con keywords",
    description: "Usa Google Keyword Planner para identificar búsquedas con volumen. Crea páginas programáticas que ataquen esas keywords de forma automática, como comparadores o directorios.",
    category: "productividad",
    level: "avanzado",
  },
  {
    id: "17",
    title: "Usa NotebookLM para crear PRDs de SEO",
    description: "Sube información de tu nicho a NotebookLM y pídele que genere un PRD (Product Requirements Document) enfocado en SEO. Obtendrás un documento estructurado que puedes usar como contexto para tu vibe coding.",
    category: "llms",
    level: "avanzado",
  },
  {
    id: "18",
    title: "Piensa en MLP, no en MVP",
    description: "En vez de Minimum Viable Product, apunta a Minimum Lovable Product. Si tu producto no enamora desde el inicio, nadie lo usará. Construye algo que la gente quiera compartir.",
    category: "productividad",
    level: "basico",
  },
  {
    id: "19",
    title: "Usa Scrum para ordenar tu vibe coding",
    description: "Aplica metodologías ágiles para organizar tus MVPs. Te ayuda a medir progreso real y evitar que el vibe coding se vuelva infinito.",
    category: "productividad",
    level: "intermedio",
  },
  {
    id: "20",
    title: "Crea una 'constitución' del proyecto",
    description: "Arma un documento base con las reglas y límites de tu proyecto. Consúltalo antes de cada feature para evitar featuritis y mantener el foco.",
    category: "flujo",
    level: "intermedio",
  },
  {
    id: "21",
    title: "OpenRouter para tokens económicos",
    description: "Con $10 USD en OpenRouter tienes 1 año de uso y hasta 1000 queries diarias de modelos gratuitos. Ideal para apps que consumen muchos tokens.",
    category: "llms",
    level: "avanzado",
  },
  {
    id: "22",
    title: "Digital Ocean como alternativa a Vercel",
    description: "App Platform de Digital Ocean cuesta $5 USD/mes y permite deploys automáticos con git push. Más económico que Vercel para proyectos en producción.",
    category: "productividad",
    level: "avanzado",
  },
  {
    id: "23",
    title: "Último paso siempre humano",
    description: "Usa guardrails y validaciones, pero siempre deja la aprobación final a un humano. El riesgo de alucinaciones no vale el ahorro de tiempo.",
    category: "flujo",
    level: "avanzado",
  },
  {
    id: "24",
    title: "Replicate para procesamiento de audio",
    description: "Usa Replicate con modelos como Sonnet 3.7 para procesar audio y pide output en TSV. Es más barato que APIs nativas y muy flexible.",
    category: "llms",
    level: "avanzado",
  },
  {
    id: "25",
    title: "Conecta Lovable con Git + Cursor",
    description: "Para tareas complejas como PLSEO, conecta tu proyecto Lovable a Git y usa Cursor con Opus 4.5 en modo agente. Puede programar 30+ minutos autónomamente.",
    category: "flujo",
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

export const categories = {
  productividad: {
    label: "Productividad",
    description: "Mantén el foco y avanza eficientemente",
    icon: "Zap",
  },
  prompts: {
    label: "Prompts",
    description: "Escribe mejores prompts para mejores resultados",
    icon: "MessageSquare",
  },
  flujo: {
    label: "Flujo de Trabajo",
    description: "Organiza tu proceso de desarrollo",
    icon: "GitBranch",
  },
  llms: {
    label: "LLMs",
    description: "Saca el máximo provecho de los modelos",
    icon: "Brain",
  },
  "ui-ux": {
    label: "UI/UX",
    description: "Diseña mejores interfaces",
    icon: "Palette",
  },
};
