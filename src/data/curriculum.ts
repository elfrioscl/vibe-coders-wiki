export interface Topic {
  title: string;
  description: string;
}

export type ModuleCategory = "conceptual" | "practico" | "tecnico" | "metodologico";

export interface Module {
  id: number;
  title: string;
  objective: string;
  result: string;
  topics: Topic[];
  category: ModuleCategory;
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
    category: "conceptual",
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
    category: "metodologico",
    topics: [
      { title: "Qué es un PRD mínimo", description: "Qué, para quién, cómo se ve el éxito" },
      { title: "Épicas → Tareas", description: "Dividir proyectos en pedazos" },
      { title: "Iteración sobre perfección", description: "Hacer funcionar, luego mejorar" },
      { title: "El arte de pedir cambios", description: "Específico > vago, una cosa a la vez" },
      { title: "Cuándo empezar de cero", description: "Reconocer código muy enredado" },
      { title: "Wireframes y mockups", description: "Bocetar antes de promptear, herramientas simples (papel, Excalidraw, Figma básico)" },
    ],
  },
  {
    id: 3,
    title: "MRP/MLP: Más allá del MVP",
    objective: "Construir productos que enamoren",
    result: "Diseñas productos memorables desde el inicio",
    category: "conceptual",
    topics: [
      { title: "Por qué MVP ya no alcanza", description: "El mercado cambió: usuarios esperan más desde el día uno" },
      { title: "Qué es MRP/MLP", description: "Minimum Remarkable/Lovable Product: producto mínimo que sorprende y enamora" },
      { title: "MVP vs MRP/MLP", description: "De 'viable' a 'memorable': el cambio de mentalidad" },
      { title: "El factor 'wow'", description: "Qué hace que un producto sea memorable vs olvidable" },
      { title: "Validar antes de pulir", description: "Equilibrio entre calidad inicial y velocidad de validación" },
      { title: "Señales de un buen MRP/MLP", description: "Usuarios que comparten sin que se lo pidas" },
      { title: "Ejemplos prácticos", description: "Casos de productos que aplicaron MRP/MLP exitosamente" },
    ],
  },
  {
    id: 4,
    title: "Por dónde empezar",
    objective: "Elegir tu primera herramienta",
    result: "Eliges la herramienta correcta para tu proyecto",
    category: "metodologico",
    topics: [
      { title: "Lovable", description: "Qué es, para qué sirve, cuándo usarlo" },
      { title: "Cursor", description: "Editor con IA, cuándo usarlo vs Lovable" },
      { title: "Claude Code", description: "Terminal con IA de Anthropic, ideal para flujos de trabajo en CLI" },
      { title: "Bolt y v0", description: "Alternativas para prototipos rápidos" },
      { title: "Replit y Windsurf", description: "Otras opciones del ecosistema" },
      { title: "Cómo elegir", description: "Criterios para seleccionar herramienta según proyecto" },
      { title: "Modos de trabajo agéntico", description: "Un agente (Lovable) vs múltiples agentes en paralelo (Cursor), cuándo importa" },
    ],
  },
  {
    id: 5,
    title: "Tu primera app (práctica)",
    objective: "Hacer algo real",
    result: "Tienes algo funcionando",
    category: "practico",
    topics: [
      { title: "Proyecto simple end-to-end", description: "Ej: lista de tareas con persistencia" },
      { title: "Aplicar PRD + Design System", description: "Usar lo aprendido" },
      { title: "Aceptar la \"magia\"", description: "Hacer funcionar sin entender todo" },
      { title: "Lista de preguntas", description: "Qué no entendiste para próximos módulos" },
      { title: "Build tools (Vite)", description: "Qué pasa cuando Lovable compila tu código" },
    ],
  },
  {
    id: 6,
    title: "Publicar tu app",
    objective: "Tu app en internet con dominio propio",
    result: "Tienes una app publicada y accesible",
    category: "practico",
    topics: [
      { title: "Qué es deployment", description: "De local a internet" },
      { title: "Hosting en Lovable", description: "Publicar directo desde la plataforma" },
      { title: "Netlify", description: "Alternativa a Vercel para hosting" },
      { title: "Vercel vs Netlify vs Lovable hosting", description: "Cuándo usar cada uno" },
      { title: "Dominios y DNS básico", description: "Qué es un dominio, cómo conectarlo" },
      { title: "SSL y HTTPS", description: "Por qué tu sitio necesita el candadito" },
      { title: "Analytics básico", description: "Instalar tracking simple (Plausible, GA4)" },
      { title: "Rollbacks en producción", description: "Cómo volver a una versión anterior si algo se rompe" },
    ],
  },
];

const modulosIntermedios: Module[] = [
  // 7. Control de versiones - PRIMERO: no perder trabajo es crítico
  {
    id: 7,
    title: "Control de versiones (Git)",
    objective: "No perder trabajo",
    result: "Usas commits, branches, GitHub",
    category: "practico",
    topics: [
      { title: "Qué es Git", description: "Historial de cambios" },
      { title: "Repositorio local vs remoto", description: "Dónde vive tu código" },
      { title: "Commit", description: "Checkpoint con mensaje" },
      { title: "Push y Pull", description: "Sincronizar con GitHub" },
      { title: "Branches y Main", description: "Experimentar sin romper producción" },
      { title: "SSH keys", description: "Qué son, cómo generarlas, agregarlas a GitHub, por qué son más seguras que HTTPS con password" },
      { title: "Integración Lovable ↔ GitHub", description: "Flujo práctico" },
      { title: "Rollbacks con Git", description: "Revert, reset, checkout: cuándo usar cada estrategia para volver atrás" },
    ],
  },
  // 8. DevTools - Debugging temprano, lo usas constantemente
  {
    id: 8,
    title: "DevTools del navegador",
    objective: "Debuggear sin depender 100% de la IA",
    result: "Usas Console, Network y Elements para encontrar errores",
    category: "practico",
    topics: [
      { title: "Console", description: "Ver errores, usar console.log, filtrar mensajes" },
      { title: "Network tab", description: "Ver requests, responses, tiempos de carga" },
      { title: "Elements", description: "Inspeccionar HTML/CSS, modificar en vivo" },
      { title: "Copiar errores correctamente", description: "Qué información darle a la IA" },
      { title: "Application tab", description: "Ver localStorage, cookies, storage" },
    ],
  },
  // 9. Arquitectura básica - Entender qué construyes
  {
    id: 9,
    title: "Arquitectura básica",
    objective: "Entender qué construiste",
    result: "Sabes frontend/backend, funciones, variables",
    category: "tecnico",
    topics: [
      { title: "Frontend vs Backend", description: "Qué ves vs qué procesa" },
      { title: "Qué es una función", description: "Input → proceso → output" },
      { title: "Variables y tipos", description: "String, número, booleano, array, objeto" },
      { title: "Función wrapper", description: "Patrón común en código generado" },
      { title: "Estado temporal vs persistente", description: "Por qué algo desaparece al refrescar" },
      { title: "Separación de responsabilidades", description: "Cada parte del código hace UNA cosa, por qué importa para mantener y debuggear" },
      { title: "Arquitectura de carpetas", description: "Cómo organizar archivos en un proyecto, convenciones comunes" },
      { title: "Ruteo y navegación", description: "Cómo funcionan las rutas en una SPA, archivo App.tsx, React Router básico, páginas vs componentes" },
      { title: "Convenciones de código", description: "PascalCase para componentes, camelCase para funciones/variables, convenciones comunes" },
      { title: "HTML5 semántico", description: "Estructura de una página web: header, main, section, article, aside, footer, importancia para SEO y accesibilidad" },
    ],
  },
  // 10. Design Systems - Consistencia visual
  {
    id: 10,
    title: "Design Systems",
    objective: "Consistencia visual",
    result: "Sabes especificar un sistema de diseño",
    category: "conceptual",
    topics: [
      { title: "Qué es un design system", description: "Componentes, colores, tipografía consistentes" },
      { title: "Por qué importa desde el inicio", description: "Evitar inconsistencias visuales" },
      { title: "Sistemas populares (Tailwind, Shadcn, etc.)", description: "Qué opciones hay" },
      { title: "Cómo especificarlo en el PRD", description: "Darle a la IA referencias claras" },
      { title: "Tokens de diseño", description: "Variables para colores, espaciado, tipografía" },
      { title: "Responsive design básico", description: "Mobile-first, breakpoints, por qué importa desde el inicio" },
      { title: "Animaciones y transiciones CSS", description: "Transiciones suaves, keyframes, cuándo animar y cuándo no (performance, accesibilidad)" },
    ],
  },
  // 11. Metodologías ágiles - Cómo organizar el trabajo con IA
  {
    id: 11,
    title: "Metodologías ágiles para vibe-coders",
    objective: "Organizar el trabajo de forma profesional",
    result: "Aplicas Scrum/Kanban adaptados a trabajar con IA",
    category: "metodologico",
    topics: [
      { title: "Qué es Agile", description: "Principios del Manifiesto Ágil, por qué importan" },
      { title: "Scrum para uno", description: "Sprints personales, planificación semanal, review y retro" },
      { title: "Kanban para vibe-coders", description: "Tableros (Trello, Notion, GitHub Projects), columnas, WIP limits" },
      { title: "User stories", description: "'Como [rol] quiero [feature] para [beneficio]' - input para prompts" },
      { title: "Épicas y tareas", description: "Dividir proyectos grandes en pedazos manejables" },
      { title: "Backlog management", description: "Priorizar, refinar, mantener enfoque" },
      { title: "Estimación con IA", description: "Story points, timeboxing, cómo estimar cuando la IA hace el trabajo" },
      { title: "Definition of Done", description: "Cuándo una feature está lista vs cuándo es perfecta" },
      { title: "Retrospectivas", description: "Qué funcionó, qué no, qué cambiar en la próxima sesión" },
    ],
  },
  // 12. Formatos de datos - JSON, CSV
  {
    id: 12,
    title: "Formatos de datos",
    objective: "Leer y estructurar información",
    result: "Entiendes JSON, CSV",
    category: "tecnico",
    topics: [
      { title: "JSON", description: "Formato estándar de intercambio" },
      { title: "CSV / TSV", description: "Datos tabulares, importar/exportar" },
      { title: "Cómo leer y validar estos formatos", description: "Herramientas, errores comunes" },
      { title: "Cuándo usar cada uno", description: "Trade-offs" },
    ],
  },
  // 13. APIs y comunicación - Conectar sistemas
  {
    id: 13,
    title: "APIs y comunicación",
    objective: "Conectar sistemas",
    result: "Integras servicios externos",
    category: "tecnico",
    topics: [
      { title: "Qué es una API", description: "Contrato entre sistemas" },
      { title: "Request / Response", description: "Flujo de comunicación" },
      { title: "Métodos HTTP (GET, POST, PUT, DELETE)", description: "Tipos de operaciones" },
      { title: "Headers y Body", description: "Qué viaja en cada request" },
      { title: "Variables de entorno / API keys", description: "Proteger secretos" },
      { title: "Códigos de estado HTTP", description: "200, 201, 400, 401, 403, 404, 500 y qué significan" },
      { title: "Webhooks", description: "Qué son, cómo recibirlos, casos de uso comunes" },
      { title: "SSE (Server-Sent Events)", description: "Comunicación en tiempo real del servidor al cliente, diferencia con webhooks" },
      { title: "Variables de entorno", description: "Qué son y por qué nunca hardcodear API keys" },
      { title: "Secrets en Lovable", description: "Cómo usar el panel de Environment Variables" },
      { title: ".env local vs producción", description: "Diferencia entre desarrollo y deploy" },
    ],
  },
  // 14. Bases de datos I - Diseño de datos
  {
    id: 14,
    title: "Bases de datos I: Fundamentos",
    objective: "Diseñar datos",
    result: "Especificas un modelo de datos",
    category: "conceptual",
    topics: [
      { title: "Qué es una base de datos relacional", description: "Modelo mental de tablas" },
      { title: "Tablas, filas, columnas", description: "Estructura básica" },
      { title: "Primary Key (PK)", description: "Identificador único" },
      { title: "Foreign Key (FK)", description: "Referencias entre tablas" },
      { title: "Tipos de relaciones (1:1, 1:N, N:N)", description: "Cómo conectar tablas" },
      { title: "NULL", description: "Qué significa \"vacío\"" },
      { title: "Dónde guardar qué", description: "Local storage vs Base de datos vs Storage de archivos (buckets), criterios para elegir" },
      { title: "UUIDs vs IDs auto-incrementales", description: "Cuándo usar cada uno, pros y contras" },
      { title: "Timestamps y zonas horarias", description: "Guardar en UTC, convertir para mostrar" },
      { title: "Soft delete vs hard delete", description: "Marcar como eliminado vs borrar realmente" },
      { title: "Diagramas con Mermaid", description: "Visualizar modelos de datos (ER diagrams), flujos y arquitectura usando texto que la IA entiende" },
    ],
  },
  // 15. Bases de datos II - Queries
  {
    id: 15,
    title: "Bases de datos II: SQL",
    objective: "Consultar y cruzar datos",
    result: "Escribes queries, JOINs",
    category: "tecnico",
    topics: [
      { title: "SELECT, WHERE", description: "Leer y filtrar datos" },
      { title: "ORDER BY, LIMIT", description: "Ordenar y paginar" },
      { title: "INNER JOIN", description: "Solo matches en ambas tablas" },
      { title: "LEFT JOIN", description: "Todo de izquierda + matches" },
      { title: "RIGHT JOIN / OUTER JOIN", description: "Otras variantes" },
      { title: "GROUP BY, COUNT, SUM", description: "Agregaciones básicas" },
      { title: "Subqueries", description: "Queries dentro de queries" },
      { title: "Índices", description: "Qué son, por qué las queries son lentas, cuándo crearlos" },
    ],
  },
  // 16. Autenticación - Login/usuarios
  {
    id: 16,
    title: "Autenticación",
    objective: "Identificar usuarios",
    result: "Implementas login, SSO",
    category: "conceptual",
    topics: [
      { title: "Qué es autenticación", description: "Verificar identidad" },
      { title: "Usuario anónimo vs autenticado", description: "Estados posibles" },
      { title: "Flujo de login/logout", description: "Cómo funciona el proceso" },
      { title: "SSO (Single Sign-On)", description: "Login con Google/GitHub/etc" },
      { title: "Tokens y sesiones", description: "Cómo se \"recuerda\" que estás logueado" },
      { title: "Refresh tokens", description: "Mantener sesión sin re-login" },
      { title: "OAuth", description: "El protocolo detrás de 'Login con Google/GitHub/Facebook'" },
      { title: "Tokens (JWT)", description: "Qué son, por qué expiran" },
      { title: "OAuth vs API keys", description: "Cuándo usar cada uno" },
    ],
  },
  // 17. Herramientas y ecosistema - Al final: ya sabes más para comparar
  {
    id: 17,
    title: "Herramientas y ecosistema",
    objective: "Comparar y elegir herramientas según el proyecto",
    result: "Sabes cuándo migrar o combinar herramientas",
    category: "metodologico",
    topics: [
      { title: "Lovable vs Cursor", description: "Cuándo usar cada uno, trade-offs entre velocidad de iteración y control" },
      { title: "Claude Code", description: "Terminal con IA, flujos CLI, cuándo elegirlo sobre otras opciones" },
      { title: "Bolt, v0, Replit, Windsurf", description: "Nichos específicos de cada herramienta" },
      { title: "Migrar de Lovable a Cursor", description: "Flujo práctico paso a paso, cuándo tiene sentido" },
      { title: "Combinar herramientas", description: "Lovable + Git + Cursor: flujo de trabajo híbrido" },
      { title: "Cuándo una herramienta ya no alcanza", description: "Señales de que debes cambiar o combinar" },
      { title: "Modos agénticos avanzados", description: "Múltiples Composers en Cursor, dividir trabajo entre agentes" },
    ],
  },
];

const modulosAvanzados: Module[] = [
  // 18. Manejo de errores - Lo primero que enfrentas cuando algo falla
  {
    id: 18,
    title: "Manejo de errores en la interfaz",
    objective: "Saber qué hacer cuando algo falla",
    result: "Tomas mejores decisiones ante errores de la IA",
    category: "metodologico",
    topics: [
      { title: "Tipos de errores comunes", description: "Sintaxis, runtime, lógica, integración" },
      { title: "Cuándo usar 'Try to Fix'", description: "Errores simples que la IA puede resolver" },
      { title: "Cuándo no usar 'Try to Fix'", description: "Errores que requieren contexto o decisiones" },
      { title: "Cuándo cambiar a Cursor", description: "Tareas multi-archivo, refactors grandes, trabajo en paralelo con múltiples agentes" },
      { title: "Trabajo de largo aliento", description: "Tareas que tocan muchos archivos, límites de contexto, estrategias de sesiones largas" },
      { title: "Múltiples agentes en paralelo", description: "Composers en Cursor, dividir trabajo entre agentes, cuándo tiene sentido" },
      { title: "Límites de herramientas web vs IDE", description: "Por qué Lovable es mejor para iterar rápido, por qué Cursor es mejor para proyectos grandes" },
      { title: "Rollback vs seguir iterando", description: "Cuándo volver atrás vs intentar arreglar" },
    ],
  },
  // 19. Specs técnicos - Mantener contexto para el LLM desde temprano
  {
    id: 19,
    title: "Specs técnicos y documentación",
    objective: "Memoria para el LLM",
    result: "Mantienes docs técnicos",
    category: "metodologico",
    topics: [
      { title: "Diferencia PRD vs Spec técnico", description: "Producto vs implementación" },
      { title: "Qué documentar para el LLM", description: "Decisiones técnicas, lógica compleja" },
      { title: "Estructura de un spec técnico", description: "Formato útil para la IA" },
      { title: "Mantener docs actualizados", description: "Cuándo y cómo actualizar" },
      { title: "Knowledge base del proyecto", description: "Archivos de contexto persistente" },
    ],
  },
  // 20. Refactorización - Limpiar código cuando crece
  {
    id: 20,
    title: "Refactorización",
    objective: "Limpiar código",
    result: "Sabes cuándo y cómo refactorizar",
    category: "metodologico",
    topics: [
      { title: "Qué es refactorizar", description: "Reorganizar sin cambiar funcionalidad" },
      { title: "Señales de que necesitas refactor", description: "Código repetido, difícil de modificar" },
      { title: "Cómo pedir refactor a la IA", description: "Usar PRD/specs como referencia" },
      { title: "Refactor incremental vs total", description: "Cuándo hacer cada uno" },
      { title: "Separación de concerns", description: "Cada archivo/función hace UNA cosa" },
    ],
  },
  // 21. Testing y TDD - Asegurar que funciona correctamente
  {
    id: 21,
    title: "Testing y TDD",
    objective: "Escribir código confiable",
    result: "Implementas tests y usas TDD",
    category: "tecnico",
    topics: [
      { title: "Qué es TDD", description: "Test-Driven Development: Red-Green-Refactor" },
      { title: "Tipos de tests", description: "Unit, integration, e2e: qué cubre cada uno" },
      { title: "Cuándo vale la pena testear", description: "ROI de tests, qué priorizar" },
      { title: "Pedirle tests a la IA", description: "Cómo promptear para que genere tests útiles" },
      { title: "Vitest/Jest", description: "Frameworks para unit tests en JavaScript/TypeScript" },
      { title: "Playwright/Cypress", description: "Herramientas para tests end-to-end" },
      { title: "Mocking", description: "Qué es, cuándo usarlo, cómo mockear APIs y dependencias" },
      { title: "Coverage", description: "Qué medir, qué ignorar, cuánto es suficiente" },
    ],
  },
  // 22. Ambientes de desarrollo - Separar dev/staging/prod profesionalmente
  {
    id: 22,
    title: "Ambientes de desarrollo",
    objective: "Trabajar de forma profesional",
    result: "Entiendes dev/staging/prod",
    category: "tecnico",
    topics: [
      { title: "Ambientes de desarrollo", description: "Dev, staging, producción, para qué sirve cada uno" },
      { title: "Variables de entorno por ambiente", description: "Diferentes configs para cada ambiente" },
      { title: "Rate limiting", description: "Proteger tu API de abuso, límites por usuario" },
    ],
  },
  // 23. Rendering y tipos de páginas - Entender arquitectura web
  {
    id: 23,
    title: "Rendering y tipos de páginas",
    objective: "Cómo se construye una página",
    result: "Entiendes SSR, SSG, CSR",
    category: "conceptual",
    topics: [
      { title: "Client-side rendering (CSR)", description: "El browser construye la página" },
      { title: "Server-side rendering (SSR)", description: "El servidor envía HTML listo" },
      { title: "Static Site Generation (SSG)", description: "Páginas pre-generadas en build" },
      { title: "Incremental Static Regeneration (ISR)", description: "Regenerar páginas bajo demanda" },
      { title: "Cuándo usar cada uno", description: "Trade-offs de cada approach" },
      { title: "Hidratación", description: "Qué es, por qué importa" },
      { title: "Impacto en SEO", description: "Por qué SSG/SSR ayudan" },
      { title: "Edge functions", description: "Qué son, cuándo usarlas" },
      { title: "Serverless", description: "Concepto, ventajas, limitaciones" },
      { title: "Lazy loading de componentes", description: "React.lazy, Suspense, cargar componentes bajo demanda" },
      { title: "Code splitting", description: "Dividir bundles para mejor performance inicial" },
      { title: "Dynamic imports", description: "Cuándo y cómo usarlos para optimizar carga" },
    ],
  },
  // 24. Bases de datos III - Decisiones de arquitectura de datos
  {
    id: 24,
    title: "Bases de datos III: SQL vs NoSQL",
    objective: "Elegir el paradigma correcto",
    result: "Diseñas con el modelo adecuado para cada caso",
    category: "conceptual",
    topics: [
      { title: "Relacional vs documental", description: "Diferencias fundamentales entre SQL y NoSQL" },
      { title: "Firebase/Firestore", description: "Cuándo usarlo, pros y contras, modelo de datos" },
      { title: "MongoDB", description: "Casos de uso típicos, documentos y colecciones" },
      { title: "Híbridos", description: "Supabase con JSON columns, lo mejor de ambos mundos" },
      { title: "Migrar entre paradigmas", description: "Qué considerar al cambiar de SQL a NoSQL o viceversa" },
      { title: "Trade-offs", description: "Consistencia vs flexibilidad vs escalabilidad" },
    ],
  },
  // 25. Autorización y permisos - Cuando tienes usuarios con roles
  {
    id: 25,
    title: "Autorización y permisos",
    objective: "Controlar acceso",
    result: "Implementas RLS, roles",
    category: "conceptual",
    topics: [
      { title: "Qué es autorización", description: "Controlar acceso a recursos" },
      { title: "Roles y permisos", description: "Admin vs usuario vs viewer" },
      { title: "RLS (Row Level Security)", description: "Cada usuario ve solo sus datos" },
      { title: "Políticas de acceso", description: "Definir reglas en base de datos" },
      { title: "Políticas RLS explícitas", description: "Por qué usar auth.role() = 'role' en USING vs cláusula TO, compatibilidad con escáneres de seguridad" },
      { title: "Data Layer", description: "Separar lógica de acceso de la UI" },
    ],
  },
  // 26. Seguridad de datos - Proteger información sensible
  {
    id: 26,
    title: "Seguridad de datos",
    objective: "Proteger información",
    result: "Manejas secrets, signed URLs, CORS",
    category: "tecnico",
    topics: [
      { title: "Variables de entorno", description: "Dónde guardar secrets" },
      { title: "API keys", description: "Cómo protegerlas" },
      { title: "Signed URLs", description: "Acceso temporal seguro a archivos" },
      { title: "CORS", description: "Qué es, por qué falla, cómo configurar" },
      { title: "HTTPS", description: "Por qué importa" },
      { title: "Sanitización de inputs", description: "Evitar inyecciones" },
    ],
  },
  // 27. Growth: SEO, AEO y CRO - Cuando quieres que te encuentren y conviertan
  {
    id: 27,
    title: "Growth: SEO, AEO y CRO",
    objective: "Que te encuentren y conviertan",
    result: "Optimizas para buscadores, LLMs y conversión",
    category: "practico",
    topics: [
      { title: "SEO básico", description: "Títulos, meta descriptions, headings" },
      { title: "Páginas estáticas para SEO", description: "Por qué funcionan mejor" },
      { title: "Sitemap y robots.txt", description: "Ayudar a crawlers" },
      { title: "Structured data (JSON-LD)", description: "Rich snippets en Google" },
      { title: "Core Web Vitals", description: "LCP, FID, CLS" },
      { title: "Open Graph / Twitter Cards", description: "Cómo se ve al compartir" },
      { title: "Accesibilidad básica", description: "Alt text, contraste, ARIA" },
      { title: "Knowledge bases para contenido SEO", description: "Dar contexto a la IA" },
      { title: "SEO Programático", description: "Crear páginas automáticas a escala con templates y datos (comparadores, directorios)" },
      { title: "PLSEO (Product-Led SEO)", description: "El producto como motor de SEO: perfiles públicos, contenido de usuarios, herramientas gratuitas indexables" },
      { title: "Caching", description: "Qué es, tipos de cache, cuándo invalidar" },
      { title: "Qué es AEO", description: "Answer Engine Optimization: optimizar para ChatGPT, Perplexity, Gemini" },
      { title: "SEO vs AEO", description: "Diferencias, similitudes, por qué necesitas ambos" },
      { title: "Contenido para LLMs", description: "Estructura clara, respuestas directas, fuentes citables" },
      { title: "Ser fuente citable", description: "Cómo hacer que los LLMs te referencien" },
      { title: "Qué es CRO", description: "Conversion Rate Optimization: mejorar % de usuarios que convierten" },
      { title: "Métricas de conversión", description: "CR, CTR, bounce rate, tiempo en página" },
      { title: "Funnels de conversión", description: "Awareness, consideración, decisión, acción" },
      { title: "Landing pages", description: "Anatomía de una landing que convierte" },
      { title: "A/B testing", description: "Qué testear, herramientas, significancia estadística" },
    ],
  },
  // 28. Monetización - Cuando quieres cobrar
  {
    id: 28,
    title: "Monetización",
    objective: "Cobrar por tu producto",
    result: "Integras pagos",
    category: "practico",
    topics: [
      { title: "Stripe vs Paddle", description: "Diferencias, pros y contras" },
      { title: "Merchant of Record (Paddle)", description: "Ellos manejan impuestos" },
      { title: "Payment processor (Stripe)", description: "Tú manejas impuestos" },
      { title: "Suscripciones vs pagos únicos", description: "Modelos de negocio" },
      { title: "Webhooks de pago", description: "Cómo tu app se entera de un pago" },
      { title: "Planes y pricing tiers", description: "Cómo estructurar precios" },
    ],
  },
  // 29. Privacidad y compliance - Requisitos legales para monetizar
  {
    id: 29,
    title: "Privacidad y compliance",
    objective: "Cumplir regulaciones",
    result: "GDPR, cookies",
    category: "conceptual",
    topics: [
      { title: "GDPR básico", description: "Qué aplica si tienes usuarios EU" },
      { title: "Consent y cookies", description: "Cómo pedir permiso correctamente" },
      { title: "Banner de cookies", description: "Implementación práctica" },
      { title: "Derecho al olvido", description: "Borrar datos de usuarios" },
      { title: "Privacy policy", description: "Qué debe incluir" },
      { title: "Data Processing Agreements", description: "Cuándo los necesitas" },
    ],
  },
  // 30. Internacionalización - Expansión a otros mercados
  {
    id: 30,
    title: "Internacionalización (i18n)",
    objective: "Múltiples idiomas",
    result: "Tu app funciona en varios idiomas",
    category: "tecnico",
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
  // 31. Personalización de IA - Técnicas avanzadas de IA
  {
    id: 31,
    title: "Personalización de IA",
    objective: "Configurar comportamiento del LLM",
    result: "Usas system prompts, knowledge bases, guardrails",
    category: "conceptual",
    topics: [
      { title: "System prompt", description: "Instrucciones persistentes" },
      { title: "Knowledge base", description: "Contexto específico para la IA" },
      { title: "Guardrails", description: "Validaciones para evitar alucinaciones y respuestas fuera de contexto" },
      { title: "Cuándo la IA no es la solución", description: "Reconocer límites" },
    ],
  },
  // 32. Agentes y MCP - Conectar IA con herramientas
  {
    id: 32,
    title: "Agentes y MCP",
    objective: "Conectar IA con herramientas externas",
    result: "Configuras agentes y MCP",
    category: "tecnico",
    topics: [
      { title: "Agentes y herramientas", description: "IA que ejecuta acciones" },
      { title: "MCP (Model Context Protocol)", description: "Qué es, cómo conecta la IA con herramientas externas" },
      { title: "Configurar MCP en Cursor", description: "Setup práctico paso a paso" },
    ],
  },
  // 33. RAG y búsqueda semántica - Lo más especializado
  {
    id: 33,
    title: "RAG y búsqueda semántica",
    objective: "Dar conocimiento específico al LLM",
    result: "Implementas RAG con bases vectoriales",
    category: "tecnico",
    topics: [
      { title: "RAG (Retrieval-Augmented Generation)", description: "Pasar documentos relevantes al LLM en vez de esperar que 'sepa'" },
      { title: "Embeddings y vectores", description: "Convertir texto en números para buscar por significado semántico" },
      { title: "Chunking", description: "Cómo dividir documentos (muy grandes = ruido, muy chicos = sin contexto)" },
      { title: "Grounding", description: "Anclar respuestas del LLM en datos reales" },
      { title: "Bases de datos vectoriales (cloud)", description: "Pinecone, Vertex AI Search, Bedrock Knowledge Bases, Supabase pgvector" },
      { title: "Bases de datos vectoriales (open source)", description: "Chroma, Weaviate, Qdrant, Milvus" },
    ],
  },
];

export const cursoInicial: Course = {
  id: "inicial",
  slug: "inicial",
  title: "Guía Inicial",
  subtitle: "Fundamentos",
  description: "Aprende los fundamentos del vibe-coding: cómo funciona la IA, la metodología de trabajo, MRP/MLP, herramientas del ecosistema, y publica tu primera app.",
  level: "inicial",
  modules: modulosIniciales,
};

export const cursoIntermedio: Course = {
  id: "intermedio",
  slug: "intermedio",
  title: "Guía Intermedia",
  subtitle: "Desarrollo",
  description: "Domina arquitectura, design systems, bases de datos, APIs, control de versiones, autenticación y debugging.",
  level: "intermedio",
  modules: modulosIntermedios,
};

export const cursoAvanzado: Course = {
  id: "avanzado",
  slug: "avanzado",
  title: "Guía Avanzada",
  subtitle: "Especialización",
  description: "Lleva tus apps al siguiente nivel con autorización, seguridad, SEO, monetización, internacionalización, testing y técnicas avanzadas de IA.",
  level: "avanzado",
  modules: modulosAvanzados,
};

export const allCourses: Course[] = [cursoInicial, cursoIntermedio, cursoAvanzado];

export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find((c) => c.slug === slug);
}
