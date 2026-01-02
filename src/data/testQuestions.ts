export interface TestQuestion {
  id: string;
  level: 'inicial' | 'intermedio' | 'avanzado' | 'expert';
  module: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const testQuestions: TestQuestion[] = [
  {
    id: "ini-01",
    level: "inicial",
    module: 1,
    question: "Cuando un LLM genera código, ¿qué está haciendo realmente?",
    options: [
      "Ejecutando el código para verificar que funcione",
      "Prediciendo el siguiente token más probable basado en el contexto",
      "Buscando en una base de datos de código existente",
      "Compilando instrucciones en lenguaje máquina"
    ],
    correctAnswer: 1,
    explanation: "Los LLMs funcionan prediciendo tokens. No 'entienden' ni ejecutan código, predicen qué texto viene después."
  },
  {
    id: "ini-02",
    level: "inicial",
    module: 1,
    question: "La IA empieza a dar respuestas incoherentes o a olvidar cosas que le dijiste antes. ¿Qué está pasando probablemente?",
    options: [
      "La IA se confundió y hay que reiniciarla",
      "Hay un error en el servidor",
      "Se llenó la ventana de contexto",
      "La IA está sobrecargada de usuarios"
    ],
    correctAnswer: 2,
    explanation: "La ventana de contexto tiene un límite. Cuando se llena, la IA pierde acceso a mensajes anteriores."
  },
  {
    id: "ini-03",
    level: "inicial",
    module: 1,
    question: "Antes de pedirle a la IA que implemente algo complejo, ¿qué es buena práctica hacer?",
    options: [
      "Pedirle que lo haga todo de una vez para ahorrar tiempo",
      "Preguntarle 'dime qué entendiste' para validar",
      "Darle el menor contexto posible para no confundirla",
      "Pedirle que busque ejemplos en internet primero"
    ],
    correctAnswer: 1,
    explanation: "Validar que la IA entendió correctamente antes de ejecutar evita errores y retrabajo."
  },
  {
    id: "ini-04",
    level: "inicial",
    module: 2,
    question: "Un PRD mínimo para vibe coding debe incluir principalmente:",
    options: [
      "Código de ejemplo y librerías a usar",
      "Qué se construye, para quién, y cómo se ve el éxito",
      "Presupuesto y timeline del proyecto",
      "Nombres de las variables y funciones"
    ],
    correctAnswer: 1,
    explanation: "El PRD mínimo define el qué, para quién y criterios de éxito. Los detalles técnicos vienen después."
  },
  {
    id: "ini-05",
    level: "inicial",
    module: 2,
    question: "Tienes que construir una app compleja. ¿Cuál es el mejor approach?",
    options: [
      "Describir toda la app en un solo prompt muy detallado",
      "Dividir en épicas y tareas pequeñas, pedir de a poco",
      "Dejar que la IA decida cómo estructurar todo",
      "Copiar código de proyectos similares y pedir que lo adapte"
    ],
    correctAnswer: 1,
    explanation: "Dividir en partes pequeñas da mejor resultado que pedir todo de una vez."
  },
  {
    id: "ini-06",
    level: "inicial",
    module: 2,
    question: "¿Cuándo conviene empezar de cero en lugar de seguir iterando sobre el código existente?",
    options: [
      "Nunca, siempre es mejor iterar",
      "Cuando el código está muy enredado y cada fix genera nuevos bugs",
      "Cuando la IA sugiere empezar de nuevo",
      "Solo si el cliente lo pide explícitamente"
    ],
    correctAnswer: 1,
    explanation: "A veces el código acumula tanta deuda técnica que es más eficiente empezar limpio."
  },
  {
    id: "ini-07",
    level: "inicial",
    module: 3,
    question: "¿Por qué es importante definir un design system antes de empezar a construir?",
    options: [
      "Porque la IA no puede generar estilos sin él",
      "Para evitar inconsistencias visuales después",
      "Es obligatorio para publicar la app",
      "Solo importa si trabajas con diseñadores"
    ],
    correctAnswer: 1,
    explanation: "Definir colores, tipografía y componentes desde el inicio evita una UI inconsistente."
  },
  {
    id: "ini-08",
    level: "inicial",
    module: 3,
    question: "¿Qué son los 'tokens de diseño'?",
    options: [
      "Créditos que gastas al usar herramientas de diseño",
      "Variables que definen colores, espaciado, tipografía de forma consistente",
      "Elementos gráficos como iconos y logos",
      "Permisos de acceso al design system"
    ],
    correctAnswer: 1,
    explanation: "Los tokens son variables que centralizan decisiones de diseño para mantener consistencia."
  },
  {
    id: "ini-09",
    level: "inicial",
    module: 4,
    question: "¿Cuándo elegirías Cursor sobre Lovable?",
    options: [
      "Cuando quieres prototipar algo rápido sin mucho control",
      "Cuando necesitas más control sobre el código y debugging",
      "Cuando no tienes experiencia en programación",
      "Cuando el proyecto es muy simple"
    ],
    correctAnswer: 1,
    explanation: "Cursor da más control y es mejor para debugging complejo. Lovable es mejor para prototipos rápidos."
  },
  {
    id: "ini-10",
    level: "inicial",
    module: 4,
    question: "Bolt y v0 son especialmente útiles para:",
    options: [
      "Proyectos de producción a largo plazo",
      "Prototipos y MVPs rápidos",
      "Aplicaciones móviles nativas",
      "Bases de datos complejas"
    ],
    correctAnswer: 1,
    explanation: "Bolt y v0 están optimizados para crear prototipos funcionales rápidamente."
  },
  {
    id: "ini-11",
    level: "inicial",
    module: 5,
    question: "Al construir tu primera app con vibe coding, ¿cuál es la actitud correcta hacia el código generado?",
    options: [
      "Entender cada línea antes de continuar",
      "Aceptar algo de 'magia' y enfocarse en que funcione",
      "Reescribir todo manualmente para asegurarte",
      "Ignorar el código y solo mirar el resultado visual"
    ],
    correctAnswer: 1,
    explanation: "Al inicio es válido aceptar que no entiendes todo. El entendimiento profundo viene después."
  },
  {
    id: "ini-12",
    level: "inicial",
    module: 6,
    question: "¿Qué es 'deployment'?",
    options: [
      "El proceso de diseñar la interfaz",
      "Subir tu app a internet para que otros puedan accederla",
      "Guardar tu código en GitHub",
      "Comprar un dominio"
    ],
    correctAnswer: 1,
    explanation: "Deployment es el proceso de publicar tu aplicación en un servidor accesible por internet."
  },
  {
    id: "ini-13",
    level: "inicial",
    module: 6,
    question: "¿Para qué sirve el SSL/HTTPS (el candadito en el navegador)?",
    options: [
      "Hace que tu sitio cargue más rápido",
      "Encripta la comunicación entre el usuario y tu servidor",
      "Es solo un indicador visual sin función real",
      "Permite usar más funciones de JavaScript"
    ],
    correctAnswer: 1,
    explanation: "HTTPS encripta los datos en tránsito, protegiendo información sensible de los usuarios."
  },
  {
    id: "ini-14",
    level: "inicial",
    module: 3,
    question: "¿Qué significa 'mobile-first' en responsive design?",
    options: [
      "La app solo funciona en móviles",
      "Diseñar primero para móvil y luego adaptar a pantallas más grandes",
      "Priorizar la app móvil sobre la web",
      "Usar solo componentes que funcionan en móvil"
    ],
    correctAnswer: 1,
    explanation: "Mobile-first significa diseñar primero para la pantalla más pequeña y luego escalar."
  },
  {
    id: "ini-15",
    level: "inicial",
    module: 2,
    question: "¿Por qué es útil hacer un wireframe antes de pedirle código a la IA?",
    options: [
      "La IA solo acepta wireframes como input",
      "Ayuda a clarificar qué quieres antes de promptear",
      "Es obligatorio para usar Lovable",
      "Reduce el costo de tokens"
    ],
    correctAnswer: 1,
    explanation: "Un boceto ayuda a tener claridad sobre lo que quieres, resultando en mejores prompts."
  },
  {
    id: "int-01",
    level: "intermedio",
    module: 7,
    question: "¿Cuál es la diferencia principal entre frontend y backend?",
    options: [
      "Frontend es JavaScript, backend es Python",
      "Frontend es lo que ve el usuario, backend procesa datos y lógica",
      "Frontend es más difícil que backend",
      "No hay diferencia real, son términos intercambiables"
    ],
    correctAnswer: 1,
    explanation: "Frontend maneja la interfaz de usuario, backend maneja lógica de negocio y datos."
  },
  {
    id: "int-02",
    level: "intermedio",
    module: 7,
    question: "¿Qué significa 'separación de responsabilidades' en código?",
    options: [
      "Que cada desarrollador trabaja en archivos diferentes",
      "Que cada parte del código hace UNA cosa específica",
      "Que el frontend y backend están en servidores separados",
      "Que las funciones no pueden llamar a otras funciones"
    ],
    correctAnswer: 1,
    explanation: "Cada módulo/función debe tener una responsabilidad clara. Facilita mantener y debuggear."
  },
  {
    id: "int-03",
    level: "intermedio",
    module: 7,
    question: "Un valor que guardaste desaparece cuando refrescas la página. ¿Qué está pasando?",
    options: [
      "Hay un bug en el navegador",
      "Está guardado en estado temporal (memoria) en lugar de persistente (base de datos)",
      "El servidor se reinició",
      "El valor era demasiado grande"
    ],
    correctAnswer: 1,
    explanation: "El estado en memoria (como useState) se pierde al refrescar. Para persistir necesitas BD o localStorage."
  },
  {
    id: "int-04",
    level: "intermedio",
    module: 8,
    question: "¿Cuál es el formato más común para intercambiar datos entre APIs?",
    options: [
      "CSV",
      "JSON",
      "XML",
      "TXT"
    ],
    correctAnswer: 1,
    explanation: "JSON es el estándar para APIs modernas por ser legible y fácil de parsear."
  },
  {
    id: "int-05",
    level: "intermedio",
    module: 9,
    question: "¿Qué es una Primary Key en una base de datos?",
    options: [
      "La contraseña de acceso a la base de datos",
      "Un identificador único para cada registro en una tabla",
      "El nombre de la tabla principal",
      "Una clave de encriptación"
    ],
    correctAnswer: 1,
    explanation: "La Primary Key identifica de forma única cada fila en una tabla."
  },
  {
    id: "int-06",
    level: "intermedio",
    module: 9,
    question: "Una tabla 'usuarios' y una tabla 'posts'. Cada post pertenece a un usuario. ¿Qué tipo de relación es?",
    options: [
      "Uno a uno (1:1)",
      "Uno a muchos (1:N)",
      "Muchos a muchos (N:N)",
      "No hay relación"
    ],
    correctAnswer: 1,
    explanation: "Un usuario puede tener muchos posts, pero cada post tiene un solo autor. Es 1:N."
  },
  {
    id: "int-07",
    level: "intermedio",
    module: 9,
    question: "¿Cuándo conviene usar UUID en lugar de IDs auto-incrementales?",
    options: [
      "Nunca, los auto-incrementales siempre son mejores",
      "Cuando necesitas generar IDs antes de insertar o en sistemas distribuidos",
      "Solo cuando usas PostgreSQL",
      "Cuando tienes menos de 1000 registros"
    ],
    correctAnswer: 1,
    explanation: "UUIDs son útiles cuando necesitas IDs únicos sin depender de la base de datos central."
  },
  {
    id: "int-08",
    level: "intermedio",
    module: 9,
    question: "¿Por qué es buena práctica guardar timestamps en UTC?",
    options: [
      "Porque es más corto de escribir",
      "Para evitar problemas de zonas horarias al mostrar en diferentes países",
      "Es obligatorio en todas las bases de datos",
      "Para que las queries sean más rápidas"
    ],
    correctAnswer: 1,
    explanation: "UTC es un estándar universal. Conviertes a hora local solo al mostrar al usuario."
  },
  {
    id: "int-09",
    level: "intermedio",
    module: 9,
    question: "¿Qué es 'soft delete'?",
    options: [
      "Borrar datos de forma más lenta para evitar errores",
      "Marcar un registro como eliminado sin borrarlo realmente",
      "Borrar solo del frontend pero no del backend",
      "Una forma de borrar que no requiere confirmación"
    ],
    correctAnswer: 1,
    explanation: "Soft delete mantiene el registro con un flag 'deleted'. Permite recuperar y mantener historial."
  },
  {
    id: "int-10",
    level: "intermedio",
    module: 10,
    question: "¿Qué hace un 'commit' en Git?",
    options: [
      "Sube los cambios a GitHub",
      "Guarda un snapshot de tus cambios con un mensaje descriptivo",
      "Borra los cambios que no quieres",
      "Descarga la última versión del código"
    ],
    correctAnswer: 1,
    explanation: "Commit guarda un checkpoint local de tus cambios. Push los sube al remoto."
  },
  {
    id: "int-11",
    level: "intermedio",
    module: 10,
    question: "¿Para qué sirven las branches (ramas) en Git?",
    options: [
      "Para hacer el código más rápido",
      "Para experimentar sin afectar el código principal (main)",
      "Para organizar archivos en carpetas",
      "Son obligatorias para usar GitHub"
    ],
    correctAnswer: 1,
    explanation: "Las branches permiten trabajar en features sin riesgo de romper la versión estable."
  },
  {
    id: "int-12",
    level: "intermedio",
    module: 11,
    question: "Una API responde con código 401. ¿Qué significa?",
    options: [
      "La solicitud fue exitosa",
      "No autorizado - falta autenticación válida",
      "El recurso no existe",
      "Error interno del servidor"
    ],
    correctAnswer: 1,
    explanation: "401 significa que necesitas autenticarte. 403 es 'autenticado pero sin permiso'."
  },
  {
    id: "int-13",
    level: "intermedio",
    module: 11,
    question: "¿Qué es un webhook?",
    options: [
      "Un tipo de base de datos",
      "Una URL que recibe notificaciones automáticas cuando algo pasa en otro sistema",
      "Una herramienta para debuggear APIs",
      "Un método HTTP especial"
    ],
    correctAnswer: 1,
    explanation: "Webhooks permiten que un servicio notifique a tu app cuando ocurre un evento."
  },
  {
    id: "int-14",
    level: "intermedio",
    module: 12,
    question: "¿Qué hace un INNER JOIN en SQL?",
    options: [
      "Combina todas las filas de ambas tablas",
      "Devuelve solo las filas que tienen coincidencia en ambas tablas",
      "Elimina duplicados de una tabla",
      "Une las tablas físicamente en una sola"
    ],
    correctAnswer: 1,
    explanation: "INNER JOIN solo incluye registros que tienen match en ambas tablas."
  },
  {
    id: "int-15",
    level: "intermedio",
    module: 12,
    question: "Tus queries están muy lentas en una tabla grande. ¿Qué podría ayudar?",
    options: [
      "Usar SELECT * siempre",
      "Crear índices en las columnas que filtras frecuentemente",
      "Hacer más JOINs",
      "Cambiar a otro lenguaje de programación"
    ],
    correctAnswer: 1,
    explanation: "Los índices aceleran las búsquedas en columnas específicas, como un índice en un libro."
  },
  {
    id: "int-16",
    level: "intermedio",
    module: 13,
    question: "¿Cuál es la diferencia entre autenticación y autorización?",
    options: [
      "Son lo mismo, términos intercambiables",
      "Autenticación verifica quién eres, autorización qué puedes hacer",
      "Autenticación es para admins, autorización para usuarios",
      "Autenticación es frontend, autorización es backend"
    ],
    correctAnswer: 1,
    explanation: "Primero verificas identidad (autenticación), luego permisos (autorización)."
  },
  {
    id: "int-17",
    level: "intermedio",
    module: 14,
    question: "¿Qué hace RLS (Row Level Security) en Supabase?",
    options: [
      "Encripta cada fila de la tabla",
      "Hace que cada usuario solo pueda ver/editar sus propios datos",
      "Limita el número de filas por tabla",
      "Acelera las consultas a la base de datos"
    ],
    correctAnswer: 1,
    explanation: "RLS aplica políticas para que los usuarios solo accedan a sus propios registros."
  },
  {
    id: "int-18",
    level: "intermedio",
    module: 15,
    question: "CORS te está bloqueando requests. ¿Qué está pasando?",
    options: [
      "Tu API está caída",
      "El navegador bloquea requests a dominios diferentes por seguridad",
      "Te quedaste sin memoria",
      "El SSL expiró"
    ],
    correctAnswer: 1,
    explanation: "CORS es una protección del navegador. Se configura en el servidor permitiendo orígenes específicos."
  },
  {
    id: "int-19",
    level: "intermedio",
    module: 16,
    question: "En DevTools, ¿qué tab usarías para ver por qué un request a tu API está fallando?",
    options: [
      "Elements",
      "Network",
      "Sources",
      "Application"
    ],
    correctAnswer: 1,
    explanation: "Network muestra todos los requests HTTP, sus respuestas, códigos de estado y tiempos."
  },
  {
    id: "int-20",
    level: "intermedio",
    module: 16,
    question: "¿Qué información es más útil al copiar un error para preguntarle a la IA?",
    options: [
      "Solo 'no funciona'",
      "El mensaje de error completo, stack trace y qué acción lo causó",
      "Una captura de pantalla de la página",
      "El nombre del archivo únicamente"
    ],
    correctAnswer: 1,
    explanation: "Mientras más contexto des (error, stack trace, qué hacías), mejor puede ayudar la IA."
  },
  {
    id: "adv-01",
    level: "avanzado",
    module: 17,
    question: "¿Cuál es la diferencia principal entre un PRD y un spec técnico?",
    options: [
      "El PRD es más largo",
      "El PRD define QUÉ construir, el spec técnico CÓMO implementarlo",
      "El spec técnico es para diseñadores",
      "No hay diferencia real"
    ],
    correctAnswer: 1,
    explanation: "PRD es de producto (qué y por qué), spec técnico es de implementación (cómo)."
  },
  {
    id: "adv-02",
    level: "avanzado",
    module: 17,
    question: "¿Por qué mantener un knowledge base del proyecto ayuda al vibe coding?",
    options: [
      "Es requerido por Lovable",
      "Da contexto persistente a la IA para decisiones consistentes",
      "Hace las respuestas más rápidas",
      "Solo sirve para documentación legal"
    ],
    correctAnswer: 1,
    explanation: "Un knowledge base ayuda a la IA a mantener contexto y tomar decisiones alineadas con el proyecto."
  },
  {
    id: "adv-03",
    level: "avanzado",
    module: 18,
    question: "¿Cuál es una señal clara de que necesitas refactorizar?",
    options: [
      "El código funciona perfectamente",
      "Cada cambio pequeño genera bugs en lugares inesperados",
      "Tienes menos de 100 líneas de código",
      "La IA sugiere nuevas features"
    ],
    correctAnswer: 1,
    explanation: "Código frágil donde cada fix genera nuevos bugs indica deuda técnica alta."
  },
  {
    id: "adv-04",
    level: "avanzado",
    module: 19,
    question: "¿Cuándo es mejor NO usar 'Try to Fix' en Lovable?",
    options: [
      "Nunca, siempre es la mejor opción",
      "Cuando el error requiere decisiones de arquitectura o contexto que la IA no tiene",
      "Cuando el error es de sintaxis",
      "Cuando estás apurado"
    ],
    correctAnswer: 1,
    explanation: "Try to Fix es bueno para errores simples. Errores complejos necesitan tu criterio o más contexto."
  },
  {
    id: "adv-05",
    level: "avanzado",
    module: 19,
    question: "Has intentado arreglar un bug 5 veces y cada fix genera un nuevo problema. ¿Qué deberías considerar?",
    options: [
      "Seguir intentando hasta que funcione",
      "Hacer rollback a una versión que funcionaba y replantear el approach",
      "Ignorar el bug si no es crítico",
      "Cambiar de herramienta"
    ],
    correctAnswer: 1,
    explanation: "A veces es más eficiente volver atrás que seguir acumulando fixes sobre fixes."
  },
  {
    id: "adv-06",
    level: "avanzado",
    module: 20,
    question: "Para i18n, ¿cómo deberías estructurar el contenido traducible en la base de datos?",
    options: [
      "Una columna por idioma (title_en, title_es)",
      "Una tabla separada de traducciones con foreign key al contenido",
      "Guardar todo en un solo campo JSON",
      "No se guarda en BD, solo en archivos"
    ],
    correctAnswer: 1,
    explanation: "Una tabla de traducciones relacionada es más escalable y mantenible que columnas por idioma."
  },
  {
    id: "adv-07",
    level: "avanzado",
    module: 21,
    question: "¿Cuál es la principal ventaja de SSG (Static Site Generation) sobre SSR?",
    options: [
      "Contenido siempre actualizado en tiempo real",
      "Páginas pre-generadas que cargan muy rápido desde CDN",
      "Mejor para contenido personalizado por usuario",
      "Requiere menos configuración"
    ],
    correctAnswer: 1,
    explanation: "SSG genera HTML en build time, permitiendo servir desde CDN con latencia mínima."
  },
  {
    id: "adv-08",
    level: "avanzado",
    module: 21,
    question: "¿Qué son las edge functions?",
    options: [
      "Funciones que solo funcionan en el frontend",
      "Código que se ejecuta en servidores cercanos geográficamente al usuario",
      "Funciones para manejar errores",
      "Un tipo especial de componente de React"
    ],
    correctAnswer: 1,
    explanation: "Edge functions corren en la 'edge' de la red CDN, cerca del usuario para baja latencia."
  },
  {
    id: "adv-09",
    level: "avanzado",
    module: 22,
    question: "¿Qué es cache invalidation y por qué es considerado difícil?",
    options: [
      "Borrar la caché del navegador, es fácil",
      "Decidir cuándo actualizar datos cacheados sin servir información vieja",
      "Encriptar datos en caché",
      "Nunca es necesario en apps modernas"
    ],
    correctAnswer: 1,
    explanation: "Saber cuándo el caché está desactualizado es complejo. Invalidar muy pronto pierde beneficios, muy tarde sirve datos viejos."
  },
  {
    id: "adv-10",
    level: "avanzado",
    module: 23,
    question: "¿Cuál es la ventaja principal de usar Paddle sobre Stripe?",
    options: [
      "Es más barato",
      "Actúa como Merchant of Record, manejando impuestos internacionales por ti",
      "Tiene mejor UI",
      "Funciona sin código"
    ],
    correctAnswer: 1,
    explanation: "Paddle maneja IVA, impuestos y compliance de cada país. Con Stripe tú eres responsable."
  },
  {
    id: "adv-11",
    level: "avanzado",
    module: 23,
    question: "¿Cómo se entera tu app de que un pago fue exitoso en Stripe?",
    options: [
      "El frontend revisa periódicamente",
      "Stripe envía un webhook a tu servidor con el evento",
      "El usuario te avisa manualmente",
      "Stripe actualiza tu base de datos directamente"
    ],
    correctAnswer: 1,
    explanation: "Los webhooks de Stripe notifican a tu backend cuando ocurren eventos de pago."
  },
  {
    id: "adv-12",
    level: "avanzado",
    module: 24,
    question: "Según GDPR, ¿qué es el 'derecho al olvido'?",
    options: [
      "El derecho a olvidar tu contraseña",
      "El derecho del usuario a que borres todos sus datos personales",
      "Una excepción para no cumplir GDPR",
      "El derecho a no recibir emails"
    ],
    correctAnswer: 1,
    explanation: "Los usuarios EU pueden solicitar eliminación completa de sus datos personales."
  },
  {
    id: "adv-13",
    level: "avanzado",
    module: 25,
    question: "¿Qué es MCP (Model Context Protocol)?",
    options: [
      "Un lenguaje de programación para IA",
      "Un protocolo que permite conectar la IA con herramientas y datos externos",
      "El nombre del modelo de Claude",
      "Una forma de comprimir prompts"
    ],
    correctAnswer: 1,
    explanation: "MCP estandariza cómo los LLMs se conectan con bases de datos, APIs y otras herramientas."
  },
  {
    id: "adv-14",
    level: "avanzado",
    module: 26,
    question: "¿Por qué es importante tener ambientes separados (dev, staging, prod)?",
    options: [
      "Es requisito legal",
      "Para probar cambios sin afectar a usuarios reales",
      "Para gastar más en servidores",
      "Solo importa en equipos grandes"
    ],
    correctAnswer: 1,
    explanation: "Staging permite probar en condiciones similares a producción sin riesgo de afectar usuarios."
  },
  {
    id: "adv-15",
    level: "avanzado",
    module: 26,
    question: "¿Qué es rate limiting y por qué implementarlo?",
    options: [
      "Limitar la velocidad de carga de imágenes",
      "Limitar cuántas requests puede hacer un usuario en un período para prevenir abuso",
      "Limitar el tamaño de la base de datos",
      "Solo es necesario para APIs públicas"
    ],
    correctAnswer: 1,
    explanation: "Rate limiting protege tu API de abuso, ataques DDoS y uso excesivo de recursos."
  },
  // ========== NIVEL EXPERT ==========
  {
    id: "exp-01",
    level: "expert",
    module: 25,
    question: "Estás implementando RAG para un chatbot que responde sobre documentación técnica de 500 páginas. ¿Cuál es el problema principal de pasar todo el documento al LLM?",
    options: [
      "Excede la ventana de contexto y el costo es prohibitivo",
      "El LLM no puede leer PDFs",
      "Solo funciona con documentos en inglés",
      "Los documentos técnicos confunden al modelo"
    ],
    correctAnswer: 0,
    explanation: "RAG existe porque los documentos grandes exceden la ventana de contexto del LLM y enviar todo sería extremadamente costoso. Por eso se hace retrieval de chunks relevantes."
  },
  {
    id: "exp-02",
    level: "expert",
    module: 25,
    question: "¿Qué son los embeddings en el contexto de RAG?",
    options: [
      "Links embebidos en páginas web",
      "Representaciones vectoriales numéricas del significado semántico del texto",
      "Imágenes incrustadas en documentos",
      "Fragmentos de código insertados en prompts"
    ],
    correctAnswer: 1,
    explanation: "Los embeddings convierten texto en vectores numéricos que capturan el significado semántico, permitiendo buscar por similitud de conceptos, no solo palabras exactas."
  },
  {
    id: "exp-03",
    level: "expert",
    module: 25,
    question: "Al hacer chunking de documentos para RAG, tus chunks son de 100 tokens. Los usuarios se quejan de que las respuestas carecen de contexto. ¿Qué está pasando?",
    options: [
      "Necesitas más documentos",
      "El modelo no soporta chunks",
      "Los chunks son muy pequeños y pierden contexto necesario para respuestas coherentes",
      "100 tokens es demasiado grande"
    ],
    correctAnswer: 2,
    explanation: "Chunks muy pequeños pierden contexto. Chunks muy grandes añaden ruido. El balance típico es 500-1500 tokens con overlap entre chunks."
  },
  {
    id: "exp-04",
    level: "expert",
    module: 25,
    question: "¿Qué significa 'grounding' en el contexto de LLMs?",
    options: [
      "Limitar los temas sobre los que puede hablar",
      "Anclar las respuestas del LLM en datos reales y verificables para reducir alucinaciones",
      "Conectar el LLM a tierra eléctrica para evitar estática",
      "Entrenar el modelo desde cero"
    ],
    correctAnswer: 1,
    explanation: "Grounding significa basar las respuestas en datos concretos (documentos, bases de datos) en lugar de depender solo del conocimiento entrenado, reduciendo alucinaciones."
  },
  {
    id: "exp-05",
    level: "expert",
    module: 25,
    question: "Necesitas implementar búsqueda semántica en tu app. ¿Cuál opción es más práctica si ya usas Supabase?",
    options: [
      "Usar solo búsqueda de texto completo",
      "Migrar todo a MongoDB",
      "Usar pgvector, la extensión de vectores de PostgreSQL integrada en Supabase",
      "Implementar búsqueda manual con LIKE queries"
    ],
    correctAnswer: 2,
    explanation: "Supabase soporta pgvector nativamente, permitiendo almacenar embeddings y hacer búsqueda por similitud sin agregar infraestructura adicional."
  },
  {
    id: "exp-06",
    level: "expert",
    module: 25,
    question: "¿Cuál es la diferencia principal entre Pinecone y pgvector?",
    options: [
      "Pinecone es un servicio cloud especializado en vectores; pgvector es una extensión que añades a PostgreSQL existente",
      "Pinecone es gratis, pgvector es de pago",
      "No hay diferencia, son lo mismo",
      "pgvector solo funciona con OpenAI"
    ],
    correctAnswer: 0,
    explanation: "Pinecone es un servicio cloud dedicado a vectores (más escalable, más caro). pgvector es una extensión que añade capacidades vectoriales a tu PostgreSQL existente (más simple si ya usas Postgres)."
  },
  {
    id: "exp-07",
    level: "expert",
    module: 11,
    question: "Necesitas que tu servidor envíe actualizaciones al cliente en tiempo real sin que el cliente pregunte constantemente. ¿Qué tecnología usarías?",
    options: [
      "Webhooks",
      "Polling cada segundo con fetch",
      "SSE (Server-Sent Events) para stream unidireccional del servidor",
      "LocalStorage"
    ],
    correctAnswer: 2,
    explanation: "SSE permite al servidor enviar datos al cliente de forma continua sobre una conexión HTTP persistente. Webhooks son servidor-a-servidor, no servidor-a-cliente."
  },
  {
    id: "exp-08",
    level: "expert",
    module: 11,
    question: "¿Cuál es la diferencia clave entre SSE y Webhooks?",
    options: [
      "Son lo mismo con diferente nombre",
      "SSE es servidor→cliente (browser); Webhooks son servidor→servidor",
      "Webhooks funcionan en tiempo real, SSE no",
      "SSE es más rápido"
    ],
    correctAnswer: 1,
    explanation: "SSE mantiene conexión abierta para enviar datos al navegador. Webhooks son llamadas HTTP entre servidores cuando ocurre un evento. Casos de uso completamente diferentes."
  },
  {
    id: "exp-09",
    level: "expert",
    module: 13,
    question: "En OAuth 2.0, ¿qué es el 'authorization code flow' y por qué es más seguro que el 'implicit flow'?",
    options: [
      "No hay diferencia de seguridad",
      "Implicit flow requiere más pasos",
      "El authorization code se intercambia en el backend por tokens, evitando exponer tokens en el navegador",
      "Authorization code solo funciona con Google"
    ],
    correctAnswer: 2,
    explanation: "En authorization code flow, el código se intercambia por tokens en el servidor, nunca exponiendo tokens en URLs o localStorage del browser. Implicit flow exponía tokens en el navegador."
  },
  {
    id: "exp-10",
    level: "expert",
    module: 13,
    question: "Un JWT tiene tres partes separadas por puntos. ¿Qué contiene cada parte?",
    options: [
      "Token, refresh token, expiration",
      "ID, nombre, email",
      "Usuario, contraseña, permisos",
      "Header (algoritmo), Payload (claims/datos), Signature (verificación)"
    ],
    correctAnswer: 3,
    explanation: "JWT = Header (tipo y algoritmo) + Payload (claims como user_id, exp, rol) + Signature (para verificar que no fue modificado). El payload NO está encriptado, solo codificado en base64."
  },
  {
    id: "exp-11",
    level: "expert",
    module: 13,
    question: "¿Por qué NO debes guardar información sensible en el payload de un JWT?",
    options: [
      "Solo Google puede leer JWT",
      "No cabe suficiente información",
      "El payload solo está codificado en base64, no encriptado - cualquiera puede leerlo",
      "Los JWT expiran muy rápido"
    ],
    correctAnswer: 2,
    explanation: "El payload del JWT está en base64, que es trivial de decodificar. Cualquiera con el token puede ver su contenido. La firma solo verifica integridad, no confidencialidad."
  },
  {
    id: "exp-12",
    level: "expert",
    module: 14,
    question: "Estás diseñando un sistema multi-tenant donde cada empresa tiene datos sensibles. ¿Cuál es el approach más robusto para aislamiento?",
    options: [
      "Filtrar por company_id en cada query del frontend",
      "Confiar en que los usuarios no cambien la URL",
      "Una base de datos separada por cliente",
      "RLS policies basadas en claims del JWT combinado con validación en el backend"
    ],
    correctAnswer: 3,
    explanation: "RLS a nivel de base de datos con claims del JWT asegura que el aislamiento se aplica siempre, independiente de bugs en el código. Filtrar solo en frontend es inseguro."
  },
  {
    id: "exp-13",
    level: "expert",
    module: 22,
    question: "Tu app tiene un endpoint que devuelve datos que cambian cada hora. ¿Qué estrategia de caching usarías?",
    options: [
      "Cache infinito con invalidación manual",
      "Cache-Control: no-store",
      "Cache-Control: max-age=3600, stale-while-revalidate=60",
      "No usar cache nunca"
    ],
    correctAnswer: 2,
    explanation: "max-age=3600 cachea por 1 hora. stale-while-revalidate permite servir datos 'viejos' mientras se revalida en background, mejorando UX sin datos muy desactualizados."
  },
  {
    id: "exp-14",
    level: "expert",
    module: 22,
    question: "¿Qué es cache invalidation y por qué se considera uno de los problemas más difíciles en computación?",
    options: [
      "Solo aplica a CDNs",
      "Borrar la caché del navegador, es fácil",
      "Decidir cuándo los datos cacheados están desactualizados sin servir datos viejos ni perder beneficios del cache",
      "Crear archivos de cache"
    ],
    correctAnswer: 2,
    explanation: "El dilema: invalidar muy pronto pierde beneficios del cache, muy tarde sirve datos incorrectos. No hay solución perfecta, depende del caso de uso."
  },
  {
    id: "exp-15",
    level: "expert",
    module: 21,
    question: "¿Cuál es la ventaja principal de edge functions sobre serverless functions tradicionales?",
    options: [
      "Son más baratas",
      "No tienen cold starts",
      "Pueden usar más memoria",
      "Se ejecutan geográficamente cerca del usuario, reduciendo latencia"
    ],
    correctAnswer: 3,
    explanation: "Edge functions corren en el 'edge' de la CDN, cerca del usuario. Esto reduce latencia significativamente para operaciones que no necesitan acceder a una base de datos central."
  },
  {
    id: "exp-16",
    level: "expert",
    module: 21,
    question: "Tu edge function necesita hacer queries a tu base de datos en us-east-1. ¿Cuál es el problema?",
    options: [
      "Solo funciona con MongoDB",
      "Edge functions no pueden conectarse a bases de datos",
      "No hay problema",
      "La latencia a la BD elimina el beneficio de estar en el edge, porque igual viaja a us-east-1"
    ],
    correctAnswer: 3,
    explanation: "Si tu edge function en Europa tiene que llamar a una BD en Virginia, la latencia de ese viaje elimina el beneficio de edge. Edge functions brillan para lógica que no necesita BD central."
  },
  {
    id: "exp-17",
    level: "expert",
    module: 26,
    question: "¿Por qué es importante tener variables de entorno diferentes para dev, staging y producción?",
    options: [
      "Solo es preferencia personal",
      "Solo importa para el frontend",
      "Para evitar que código en desarrollo afecte datos reales o use APIs de producción",
      "Las variables son iguales en todos los ambientes"
    ],
    correctAnswer: 2,
    explanation: "Ambientes separados con sus propias variables evitan desastres como borrar datos de producción durante desarrollo o agotar límites de APIs de pago mientras testeas."
  },
  {
    id: "exp-18",
    level: "expert",
    module: 26,
    question: "¿Qué tipo de tests correrías primero para una app vibe-coded con muchas integraciones?",
    options: [
      "No se necesitan tests si la IA generó el código",
      "Tests de performance",
      "Tests unitarios de cada función",
      "Tests de integración que verifican los flujos críticos end-to-end"
    ],
    correctAnswer: 3,
    explanation: "En apps vibe-coded, los tests de integración que verifican flujos completos (login→crear→guardar→mostrar) dan más valor que tests unitarios de código que puede cambiar frecuentemente."
  },
  {
    id: "exp-19",
    level: "expert",
    module: 26,
    question: "Implementas rate limiting de 100 requests por minuto por IP. Un usuario legítimo se queja de que lo bloquean. ¿Qué podría estar pasando?",
    options: [
      "El usuario miente",
      "El rate limit es muy bajo para cualquier usuario",
      "Múltiples usuarios comparten IP (oficina, universidad, VPN) y agotan el límite colectivamente",
      "El rate limiting no funciona"
    ],
    correctAnswer: 2,
    explanation: "Rate limit por IP falla cuando múltiples usuarios comparten IP (NAT, VPN corporativa). Considera rate limit por usuario autenticado o combinación de factores."
  },
  {
    id: "exp-20",
    level: "expert",
    module: 25,
    question: "Quieres que tu chatbot de soporte use MCP para acceder a tu base de datos de tickets. ¿Cuál es el beneficio principal?",
    options: [
      "MCP es obligatorio para chatbots",
      "Reduce el costo de tokens",
      "Es más rápido que una API normal",
      "El LLM puede consultar datos actualizados en tiempo real sin reentrenamiento"
    ],
    correctAnswer: 3,
    explanation: "MCP permite al LLM acceder a herramientas y datos externos en tiempo real. El modelo puede consultar tu BD de tickets actual sin necesidad de fine-tuning o incluir datos en el prompt."
  },
  {
    id: "exp-21",
    level: "expert",
    module: 7,
    question: "Tu proyecto React tiene componentes en 15 carpetas diferentes sin estructura clara. ¿Cuál es el impacto principal?",
    options: [
      "No hay impacto real",
      "Es difícil encontrar y modificar código, aumentando tiempo de desarrollo y bugs",
      "React no compila",
      "El código corre más lento"
    ],
    correctAnswer: 1,
    explanation: "Una arquitectura de carpetas inconsistente hace que tanto humanos como IA tengan problemas para navegar el código, aumentando errores y tiempo de desarrollo."
  },
  {
    id: "exp-22",
    level: "expert",
    module: 7,
    question: "En React Router, ¿qué pasa si defines dos rutas con el mismo path?",
    options: [
      "Se muestran ambos componentes",
      "Solo la primera ruta que matchea se renderiza",
      "Se alternan aleatoriamente",
      "La app crashea"
    ],
    correctAnswer: 1,
    explanation: "React Router renderiza la primera ruta que matchea y se detiene. Las rutas duplicadas causan que la segunda nunca se muestre, un bug común difícil de debuggear."
  },
  {
    id: "exp-23",
    level: "expert",
    module: 20,
    question: "Tu app tiene contenido dinámico (posts de usuarios) y estático (UI labels). ¿Cómo manejarías i18n para cada uno?",
    options: [
      "Solo traducir el contenido estático",
      "Igual para ambos, todo en archivos JSON",
      "Google Translate automático para todo",
      "Estático en archivos JSON de traducción; dinámico con columnas de idioma o tabla de traducciones en BD"
    ],
    correctAnswer: 3,
    explanation: "UI labels son predecibles (archivos JSON en build). Contenido dinámico de usuarios necesita solución en BD, ya sea columnas por idioma o tabla de traducciones relacionada."
  },
  {
    id: "exp-24",
    level: "expert",
    module: 17,
    question: "Tu proyecto tiene un PRD de hace 3 meses y el código evolucionó significativamente. ¿Qué deberías hacer?",
    options: [
      "Los PRDs son solo para el inicio del proyecto",
      "Crear un PRD nuevo desde cero",
      "El PRD ya no importa una vez que empezaste a codear",
      "Actualizar el PRD para reflejar el estado actual y decisiones tomadas"
    ],
    correctAnswer: 3,
    explanation: "El PRD es documentación viva. Mantenerlo actualizado ayuda a la IA a tener contexto correcto y a ti a recordar por qué tomaste ciertas decisiones."
  },
  {
    id: "exp-25",
    level: "expert",
    module: 18,
    question: "Después de 6 meses de vibe coding, tienes 50 componentes y cada cambio rompe algo inesperado. ¿Qué tipo de refactor priorizarías?",
    options: [
      "Reescribir todo desde cero",
      "No refactorizar, seguir agregando features",
      "Agregar más componentes para dividir mejor",
      "Identificar y extraer lógica compartida, aplicar separación de concerns gradualmente"
    ],
    correctAnswer: 3,
    explanation: "Refactor incremental: identificar código duplicado, extraer a funciones/hooks compartidos, clarificar responsabilidades. Reescribir todo es riesgoso y pierde conocimiento embebido."
  },
  {
    id: "exp-26",
    level: "expert",
    module: 19,
    question: "Lovable muestra un error de TypeScript que no entiendes. Has intentado 'Try to Fix' 4 veces y cada fix genera un nuevo error. ¿Qué harías?",
    options: [
      "Desactivar TypeScript",
      "Seguir intentando 'Try to Fix' hasta que funcione",
      "Ignorar el error de TypeScript",
      "Hacer rollback al último commit funcional y replantear el approach"
    ],
    correctAnswer: 3,
    explanation: "Después de varios intentos fallidos, es más eficiente volver a un estado conocido que funciona y probar un approach diferente, en lugar de acumular fixes sobre fixes."
  },
  {
    id: "exp-27",
    level: "expert",
    module: 11,
    question: "Tienes API keys de OpenAI en tu código. ¿Cuál es el riesgo si las subes a GitHub en un repo público?",
    options: [
      "Solo es problema si compartes el link",
      "No hay riesgo, GitHub es seguro",
      "Bots escanean repos públicos y usan las keys en minutos, generándote cargos inesperados",
      "GitHub elimina las keys automáticamente"
    ],
    correctAnswer: 2,
    explanation: "Existen bots que escanean GitHub constantemente buscando API keys expuestas. En minutos pueden generar miles de dólares en cargos usando tu key."
  },
  {
    id: "exp-28",
    level: "expert",
    module: 9,
    question: "Tienes una tabla 'orders' con millones de registros. Una query con WHERE status='pending' tarda 30 segundos. ¿Qué harías primero?",
    options: [
      "Comprar un servidor más potente",
      "Cambiar a una base de datos NoSQL",
      "Crear un índice en la columna 'status'",
      "Dividir la tabla en varias tablas"
    ],
    correctAnswer: 2,
    explanation: "Un índice en la columna que filtras frecuentemente es la solución más simple y efectiva. Sin índice, la BD escanea millones de filas cada vez."
  },
  {
    id: "exp-29",
    level: "expert",
    module: 6,
    question: "Tu app en Lovable funciona perfecto en desarrollo pero falla en producción con errores de CORS. ¿Por qué?",
    options: [
      "Necesitas un certificado SSL diferente",
      "Producción siempre tiene errores",
      "En desarrollo el navegador es más permisivo; en producción los dominios diferentes disparan protección CORS",
      "Lovable tiene un bug"
    ],
    correctAnswer: 2,
    explanation: "En desarrollo local, a menudo todo corre en localhost. En producción, tu frontend y API pueden estar en dominios diferentes, activando restricciones CORS del navegador."
  },
  {
    id: "exp-30",
    level: "expert",
    module: 25,
    question: "Estás evaluando bases de datos vectoriales. ¿Cuál sería la mejor opción si ya tienes PostgreSQL en Supabase y tu caso de uso es moderado (< 1M vectores)?",
    options: [
      "Implementar búsqueda vectorial manual con cosine similarity en JavaScript",
      "Migrar todo a Pinecone porque es 'especializado'",
      "Usar pgvector en Supabase para evitar complejidad adicional",
      "No usar vectores, solo búsqueda de texto"
    ],
    correctAnswer: 2,
    explanation: "Para volúmenes moderados, pgvector en tu Postgres existente es suficiente y evita agregar otro servicio. Pinecone tiene sentido a escala mayor o con requerimientos especiales."
  }
];
