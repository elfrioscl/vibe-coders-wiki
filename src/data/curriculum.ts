export interface Topic {
  title: string;
  description: string;
}

export interface Module {
  id: number;
  title: string;
  objective: string;
  result: string;
  topics: Topic[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: "inicial" | "intermedio" | "avanzado";
  modules: Module[];
}

const modulosIniciales: Module[] = [
  {
    id: 1,
    title: "Cómo la IA genera código",
    objective: "Entender la herramienta",
    result: "Sabes comunicarte con LLMs",
    topics: [
      { title: "Qué es un LLM", description: "Predicción de tokens, no \"inteligencia\"" },
      { title: "Ventana de contexto", description: "Qué \"recuerda\", por qué se pierde en conversaciones largas" },
      { title: "\"Dime qué entendiste\"", description: "Validar interpretación antes de ejecutar" },
      { title: "Por qué importa cómo escribes", description: "El prompt como instrucción precisa" },
      { title: "Limitaciones", description: "Alucinaciones, inconsistencias, olvidos" },
    ],
  },
  {
    id: 2,
    title: "Metodología vibe-coding",
    objective: "El proceso de trabajo",
    result: "Puedes escribir un PRD e iniciar proyecto",
    topics: [
      { title: "Qué es un PRD mínimo", description: "Qué, para quién, cómo se ve el éxito" },
      { title: "Épicas → Tareas", description: "Dividir proyectos en pedazos" },
      { title: "Iteración sobre perfección", description: "Hacer funcionar, luego mejorar" },
      { title: "El arte de pedir cambios", description: "Específico > vago, una cosa a la vez" },
      { title: "Cuándo empezar de cero", description: "Reconocer código muy enredado" },
    ],
  },
  {
    id: 3,
    title: "Design Systems",
    objective: "Consistencia visual",
    result: "Sabes especificar un sistema de diseño",
    topics: [
      { title: "Qué es un design system", description: "Componentes, colores, tipografía consistentes" },
      { title: "Por qué importa desde el inicio", description: "Evitar inconsistencias visuales" },
      { title: "Sistemas populares (Tailwind, Shadcn, etc.)", description: "Qué opciones hay" },
      { title: "Cómo especificarlo en el PRD", description: "Darle a la IA referencias claras" },
      { title: "Tokens de diseño", description: "Variables para colores, espaciado, tipografía" },
    ],
  },
  {
    id: 4,
    title: "Tu primera app (práctica)",
    objective: "Hacer algo real",
    result: "Tienes algo funcionando",
    topics: [
      { title: "Proyecto simple end-to-end", description: "Ej: lista de tareas con persistencia" },
      { title: "Aplicar PRD + Design System", description: "Usar lo aprendido" },
      { title: "Aceptar la \"magia\"", description: "Hacer funcionar sin entender todo" },
      { title: "Lista de preguntas", description: "Qué no entendiste para próximos módulos" },
    ],
  },
];

const modulosIntermedios: Module[] = [
  {
    id: 5,
    title: "Arquitectura básica",
    objective: "Entender qué construiste",
    result: "Sabes frontend/backend, funciones, variables",
    topics: [
      { title: "Frontend vs Backend", description: "Qué ves vs qué procesa" },
      { title: "Qué es una función", description: "Input → proceso → output" },
      { title: "Variables y tipos", description: "String, número, booleano, array, objeto" },
      { title: "Función wrapper", description: "Patrón común en código generado" },
      { title: "Estado temporal vs persistente", description: "Por qué algo desaparece al refrescar" },
    ],
  },
  {
    id: 6,
    title: "Formatos de datos",
    objective: "Leer y estructurar información",
    result: "Entiendes JSON, CSV",
    topics: [
      { title: "JSON", description: "Formato estándar de intercambio" },
      { title: "CSV / TSV", description: "Datos tabulares, importar/exportar" },
      { title: "Cómo leer y validar estos formatos", description: "Herramientas, errores comunes" },
      { title: "Cuándo usar cada uno", description: "Trade-offs" },
    ],
  },
  {
    id: 7,
    title: "Bases de datos I: Fundamentos",
    objective: "Diseñar datos",
    result: "Especificas un modelo de datos",
    topics: [
      { title: "Qué es una base de datos relacional", description: "Modelo mental de tablas" },
      { title: "Tablas, filas, columnas", description: "Estructura básica" },
      { title: "Primary Key (PK)", description: "Identificador único" },
      { title: "Foreign Key (FK)", description: "Referencias entre tablas" },
      { title: "Tipos de relaciones (1:1, 1:N, N:N)", description: "Cómo conectar tablas" },
      { title: "NULL", description: "Qué significa \"vacío\"" },
      { title: "Local storage vs Base de datos", description: "Cuándo usar cada uno" },
    ],
  },
  {
    id: 8,
    title: "Control de versiones (Git)",
    objective: "No perder trabajo",
    result: "Usas commits, branches, GitHub",
    topics: [
      { title: "Qué es Git", description: "Historial de cambios" },
      { title: "Repositorio local vs remoto", description: "Dónde vive tu código" },
      { title: "Commit", description: "Checkpoint con mensaje" },
      { title: "Push y Pull", description: "Sincronizar con GitHub" },
      { title: "Branches y Main", description: "Experimentar sin romper producción" },
      { title: "Integración Lovable ↔ GitHub", description: "Flujo práctico" },
    ],
  },
  {
    id: 9,
    title: "APIs y comunicación",
    objective: "Conectar sistemas",
    result: "Integras servicios externos",
    topics: [
      { title: "Qué es una API", description: "Contrato entre sistemas" },
      { title: "Request / Response", description: "Flujo de comunicación" },
      { title: "Métodos HTTP (GET, POST, PUT, DELETE)", description: "Tipos de operaciones" },
      { title: "Headers y Body", description: "Qué viaja en cada request" },
      { title: "Variables de entorno / API keys", description: "Proteger secretos" },
    ],
  },
  {
    id: 10,
    title: "Bases de datos II: SQL",
    objective: "Consultar y cruzar datos",
    result: "Escribes queries, JOINs",
    topics: [
      { title: "SELECT, WHERE", description: "Leer y filtrar datos" },
      { title: "ORDER BY, LIMIT", description: "Ordenar y paginar" },
      { title: "INNER JOIN", description: "Solo matches en ambas tablas" },
      { title: "LEFT JOIN", description: "Todo de izquierda + matches" },
      { title: "RIGHT JOIN / OUTER JOIN", description: "Otras variantes" },
      { title: "GROUP BY, COUNT, SUM", description: "Agregaciones básicas" },
      { title: "Subqueries", description: "Queries dentro de queries" },
    ],
  },
  {
    id: 11,
    title: "Autenticación",
    objective: "Identificar usuarios",
    result: "Implementas login, SSO",
    topics: [
      { title: "Qué es autenticación", description: "Verificar identidad" },
      { title: "Usuario anónimo vs autenticado", description: "Estados posibles" },
      { title: "Flujo de login/logout", description: "Cómo funciona el proceso" },
      { title: "SSO (Single Sign-On)", description: "Login con Google/GitHub/etc" },
      { title: "Tokens y sesiones", description: "Cómo se \"recuerda\" que estás logueado" },
      { title: "Refresh tokens", description: "Mantener sesión sin re-login" },
    ],
  },
  {
    id: 12,
    title: "Autorización y permisos",
    objective: "Controlar acceso",
    result: "Implementas RLS, roles",
    topics: [
      { title: "Qué es autorización", description: "Controlar acceso a recursos" },
      { title: "Roles y permisos", description: "Admin vs usuario vs viewer" },
      { title: "RLS (Row Level Security)", description: "Cada usuario ve solo sus datos" },
      { title: "Políticas de acceso", description: "Definir reglas en base de datos" },
      { title: "Data Layer", description: "Separar lógica de acceso de la UI" },
    ],
  },
  {
    id: 13,
    title: "Seguridad de datos",
    objective: "Proteger información",
    result: "Manejas secrets, signed URLs, CORS",
    topics: [
      { title: "Variables de entorno", description: "Dónde guardar secrets" },
      { title: "API keys", description: "Cómo protegerlas" },
      { title: "Signed URLs", description: "Acceso temporal seguro a archivos" },
      { title: "CORS", description: "Qué es, por qué falla, cómo configurar" },
      { title: "HTTPS", description: "Por qué importa" },
      { title: "Sanitización de inputs", description: "Evitar inyecciones" },
    ],
  },
];

const modulosAvanzados: Module[] = [
  {
    id: 14,
    title: "Specs técnicos y documentación",
    objective: "Memoria para el LLM",
    result: "Mantienes docs técnicos",
    topics: [
      { title: "Diferencia PRD vs Spec técnico", description: "Producto vs implementación" },
      { title: "Qué documentar para el LLM", description: "Decisiones técnicas, lógica compleja" },
      { title: "Estructura de un spec técnico", description: "Formato útil para la IA" },
      { title: "Mantener docs actualizados", description: "Cuándo y cómo actualizar" },
      { title: "Knowledge base del proyecto", description: "Archivos de contexto persistente" },
    ],
  },
  {
    id: 15,
    title: "Refactorización",
    objective: "Limpiar código",
    result: "Sabes cuándo y cómo refactorizar",
    topics: [
      { title: "Qué es refactorizar", description: "Reorganizar sin cambiar funcionalidad" },
      { title: "Señales de que necesitas refactor", description: "Código repetido, difícil de modificar" },
      { title: "Cómo pedir refactor a la IA", description: "Usar PRD/specs como referencia" },
      { title: "Refactor incremental vs total", description: "Cuándo hacer cada uno" },
      { title: "Separación de concerns", description: "Cada archivo/función hace UNA cosa" },
    ],
  },
  {
    id: 16,
    title: "Internacionalización (i18n)",
    objective: "Múltiples idiomas",
    result: "Tu app funciona en varios idiomas",
    topics: [
      { title: "Qué es i18n", description: "Preparar app para múltiples idiomas" },
      { title: "Arquitectura de traducciones", description: "Archivos de idioma, keys" },
      { title: "i18n en base de datos", description: "Cómo estructurar contenido traducible" },
      { title: "Detección de idioma", description: "Por browser, por URL, por preferencia" },
      { title: "Formateo localizado", description: "Fechas, números, monedas" },
      { title: "RTL (right-to-left)", description: "Consideraciones para árabe, hebreo" },
      { title: "Contenido estático vs dinámico", description: "Diferentes estrategias" },
    ],
  },
  {
    id: 17,
    title: "Rendering y tipos de páginas",
    objective: "Cómo se construye una página",
    result: "Entiendes SSR, SSG, CSR",
    topics: [
      { title: "Client-side rendering (CSR)", description: "El browser construye la página" },
      { title: "Server-side rendering (SSR)", description: "El servidor envía HTML listo" },
      { title: "Static Site Generation (SSG)", description: "Páginas pre-generadas en build" },
      { title: "Incremental Static Regeneration (ISR)", description: "Regenerar páginas bajo demanda" },
      { title: "Cuándo usar cada uno", description: "Trade-offs de cada approach" },
      { title: "Hidratación", description: "Qué es, por qué importa" },
      { title: "Impacto en SEO", description: "Por qué SSG/SSR ayudan" },
    ],
  },
  {
    id: 18,
    title: "SEO y optimización web",
    objective: "Que te encuentren",
    result: "Optimizas para buscadores",
    topics: [
      { title: "SEO básico", description: "Títulos, meta descriptions, headings" },
      { title: "Páginas estáticas para SEO", description: "Por qué funcionan mejor" },
      { title: "Sitemap y robots.txt", description: "Ayudar a crawlers" },
      { title: "Structured data (JSON-LD)", description: "Rich snippets en Google" },
      { title: "Core Web Vitals", description: "LCP, FID, CLS" },
      { title: "Open Graph / Twitter Cards", description: "Cómo se ve al compartir" },
      { title: "Accesibilidad básica", description: "Alt text, contraste, ARIA" },
      { title: "Knowledge bases para contenido SEO", description: "Dar contexto a la IA" },
    ],
  },
  {
    id: 19,
    title: "Monetización",
    objective: "Cobrar por tu producto",
    result: "Integras pagos",
    topics: [
      { title: "Stripe vs Paddle", description: "Diferencias, pros y contras" },
      { title: "Merchant of Record (Paddle)", description: "Ellos manejan impuestos" },
      { title: "Payment processor (Stripe)", description: "Tú manejas impuestos" },
      { title: "Suscripciones vs pagos únicos", description: "Modelos de negocio" },
      { title: "Webhooks de pago", description: "Cómo tu app se entera de un pago" },
      { title: "Planes y pricing tiers", description: "Cómo estructurar precios" },
    ],
  },
  {
    id: 20,
    title: "Privacidad y compliance",
    objective: "Cumplir regulaciones",
    result: "GDPR, cookies",
    topics: [
      { title: "GDPR básico", description: "Qué aplica si tienes usuarios EU" },
      { title: "Consent y cookies", description: "Cómo pedir permiso correctamente" },
      { title: "Banner de cookies", description: "Implementación práctica" },
      { title: "Derecho al olvido", description: "Borrar datos de usuarios" },
      { title: "Privacy policy", description: "Qué debe incluir" },
      { title: "Data Processing Agreements", description: "Cuándo los necesitas" },
    ],
  },
  {
    id: 21,
    title: "Conceptos avanzados de IA",
    objective: "Personalizar comportamiento",
    result: "System prompts, knowledge bases",
    topics: [
      { title: "System prompt", description: "Instrucciones persistentes" },
      { title: "Knowledge base", description: "Contexto específico para la IA" },
      { title: "Agentes y herramientas", description: "IA que ejecuta acciones" },
      { title: "Cuándo la IA no es la solución", description: "Reconocer límites" },
    ],
  },
];

export const cursoInicial: Course = {
  id: "inicial",
  slug: "inicial",
  title: "Curso Inicial",
  subtitle: "Fundamentos",
  description: "Aprende los fundamentos del vibe-coding: cómo funciona la IA, la metodología de trabajo, y construye tu primera app.",
  level: "inicial",
  modules: modulosIniciales,
};

export const cursoIntermedio: Course = {
  id: "intermedio",
  slug: "intermedio",
  title: "Curso Intermedio",
  subtitle: "Desarrollo",
  description: "Domina arquitectura, bases de datos, APIs, control de versiones, autenticación y seguridad.",
  level: "intermedio",
  modules: modulosIntermedios,
};

export const cursoAvanzado: Course = {
  id: "avanzado",
  slug: "avanzado",
  title: "Curso Avanzado",
  subtitle: "Especialización",
  description: "Lleva tus apps al siguiente nivel con SEO, monetización, internacionalización y técnicas avanzadas de IA.",
  level: "avanzado",
  modules: modulosAvanzados,
};

export const allCourses: Course[] = [cursoInicial, cursoIntermedio, cursoAvanzado];

export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find((c) => c.slug === slug);
}
