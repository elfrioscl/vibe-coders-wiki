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
  }
];
