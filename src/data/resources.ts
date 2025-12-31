export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: "pagos" | "emails" | "database" | "vibe-coding" | "seo" | "ai";
}

export const resources: Resource[] = [
  {
    id: "1",
    name: "Paddle",
    description: "Procesador de pagos sin necesidad de empresa. Ideal para empezar a monetizar rápido.",
    url: "https://paddle.com",
    category: "pagos",
  },
  {
    id: "2",
    name: "Mercado Pago",
    description: "Integración fácil para pagos en Latinoamérica. Buena documentación.",
    url: "https://mercadopago.com",
    category: "pagos",
  },
  {
    id: "3",
    name: "Stripe",
    description: "El estándar de la industria para pagos. Excelente API y documentación.",
    url: "https://stripe.com",
    category: "pagos",
  },
  {
    id: "4",
    name: "Resend",
    description: "Emails transaccionales modernos. API simple y excelente deliverability.",
    url: "https://resend.com",
    category: "emails",
  },
  {
    id: "5",
    name: "Supabase",
    description: "Base de datos PostgreSQL + Auth + Storage. Open source y fácil de usar.",
    url: "https://supabase.com",
    category: "database",
  },
  {
    id: "6",
    name: "Airtable",
    description: "Base de datos con interfaz de spreadsheet. Perfecto para MVPs y prototipos.",
    url: "https://airtable.com",
    category: "database",
  },
  {
    id: "7",
    name: "Lovable",
    description: "Vibe coding con React. Genera apps completas desde conversaciones.",
    url: "https://lovable.dev",
    category: "vibe-coding",
  },
  {
    id: "8",
    name: "Cursor",
    description: "IDE con IA integrada. Usa Claude para escribir código directamente.",
    url: "https://cursor.sh",
    category: "vibe-coding",
  },
  {
    id: "9",
    name: "V0 by Vercel",
    description: "Genera componentes UI desde prompts. Ideal para prototipar rápido.",
    url: "https://v0.dev",
    category: "vibe-coding",
  },
  {
    id: "10",
    name: "Bolt",
    description: "Otra alternativa de vibe coding. Bueno para proyectos full-stack.",
    url: "https://bolt.new",
    category: "vibe-coding",
  },
  {
    id: "11",
    name: "NotebookLM",
    description: "Crea PRDs y documentación con IA. Útil para planificar antes de codear.",
    url: "https://notebooklm.google.com",
    category: "seo",
  },
  {
    id: "12",
    name: "Claude",
    description: "El mejor modelo para código largo y complejo. Excelente razonamiento.",
    url: "https://claude.ai",
    category: "ai",
  },
  {
    id: "13",
    name: "ChatGPT",
    description: "Versátil y creativo. Bueno para brainstorming y prompts iniciales.",
    url: "https://chat.openai.com",
    category: "ai",
  },
  {
    id: "14",
    name: "Gemini",
    description: "Buena opción gratuita con contexto largo. Integración con Google.",
    url: "https://gemini.google.com",
    category: "ai",
  },
];

export const resourceCategories = {
  pagos: {
    label: "Pagos",
    description: "Procesa pagos y monetiza tu app",
    icon: "CreditCard",
  },
  emails: {
    label: "Emails",
    description: "Envía emails transaccionales",
    icon: "Mail",
  },
  database: {
    label: "Base de Datos",
    description: "Almacena y gestiona tus datos",
    icon: "Database",
  },
  "vibe-coding": {
    label: "Vibe Coding",
    description: "Herramientas para codear con IA",
    icon: "Sparkles",
  },
  seo: {
    label: "SEO",
    description: "Optimiza tu presencia en buscadores",
    icon: "Search",
  },
  ai: {
    label: "Modelos IA",
    description: "LLMs para desarrollo",
    icon: "Brain",
  },
};
