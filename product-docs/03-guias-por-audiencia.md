# PRD-03: Guias por Audiencia

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-02
- Estado: Vision futura
- Tipo: Expansion de contenido
- Prioridad: Baja (desarrollo posterior)

---

## 1. Objetivo

Expandir las guias de vibe coding para atender diferentes tipos de audiencias con contenido adaptado a su contexto, lenguaje y necesidades especificas.

### Vision
Actualmente las guias estan orientadas a un publico general adulto. Esta epica propone crear versiones alternativas del contenido para audiencias especificas.

---

## 2. Audiencias Propuestas

### 2.1 Ninos y Adolescentes (Prioridad Alta dentro de esta epica)

**Caracteristicas del contenido:**
- Lenguaje mas simple y accesible
- Ejemplos relacionados con su contexto (juegos, redes sociales, apps que usan)
- Menos jerga tecnica, mas explicaciones visuales
- Proyectos divertidos y creativos
- Duracion mas corta por modulo

**Consideraciones:**
- Revisar ejemplos para que sean apropiados para menores
- Posible supervision de adultos sugerida
- Gamificacion del progreso (badges, logros)

**Nombre sugerido:** "Vibe Coding Junior" o "Vibe Coding para Jovenes"

### 2.2 Emprendedores No-Tech (Futuro)

**Caracteristicas del contenido:**
- Enfoque en resultados de negocio
- Menos detalle tecnico, mas "como lograr X"
- Casos de estudio de startups
- Integracion con herramientas de negocio (pagos, analytics)

### 2.3 Disenadores (Futuro)

**Caracteristicas del contenido:**
- Enfoque en UI/UX
- Integracion con Figma y herramientas de diseno
- Como prototipar ideas visuales rapidamente
- Menos backend, mas frontend

### 2.4 Docentes/Educadores (Futuro)

**Caracteristicas del contenido:**
- Material para ensenar vibe coding
- Ejercicios para aulas
- Evaluaciones sugeridas
- Licencia de uso educativo

---

## 3. Estructura de Guia para Ninos/Adolescentes

### Propuesta de Modulos (Version Inicial)

| # | Modulo | Objetivo | Lenguaje Adaptado |
|---|--------|----------|-------------------|
| 1 | Que es la IA | Entender que hace la computadora | "La IA es como un asistente super inteligente que te ayuda a crear cosas" |
| 2 | Tu primer proyecto | Crear algo simple | Proyecto: "Haz una pagina para tu banda favorita" |
| 3 | Hablando con la IA | Escribir buenos prompts | "Es como darle instrucciones claras a un amigo" |
| 4 | Cuando algo no funciona | Debugging basico | "La IA a veces se confunde, asi la ayudamos" |
| 5 | Compartir tu proyecto | Deploy simple | "Mostrale a tus amigos lo que creaste" |

### Diferencias con Guia Adultos

| Aspecto | Guia Adultos | Guia Jovenes |
|---------|--------------|--------------|
| Lenguaje | Tecnico | Casual, amigable |
| Ejemplos | Negocios, apps profesionales | Juegos, hobbies, redes |
| Modulos | 6-10 por nivel | 5 modulos mas cortos |
| Profundidad | Alta | Conceptos esenciales |
| Tono | Profesional | Divertido, motivador |

---

## 4. Implementacion

### Fase 1: Investigacion
- Validar interes de la audiencia
- Consultar con educadores
- Definir rango de edad objetivo (ej: 12-17 anos)

### Fase 2: Contenido Piloto
- Crear version adaptada de 2-3 modulos
- Probar con grupo pequeno
- Iterar segun feedback

### Fase 3: Lanzamiento
- Completar todos los modulos
- Crear ruta de navegacion separada
- Posible subdominio o seccion dedicada

---

## 5. Consideraciones Tecnicas

### Rutas sugeridas
```
/guias/jovenes                -> Landing guia jovenes
/guias/jovenes/modulo-1       -> Que es la IA
/guias/jovenes/modulo-2       -> Tu primer proyecto
...
```

### UI/UX
- Colores mas vibrantes
- Iconografia amigable
- Posible mascota o personaje guia
- Progreso visual con elementos de gamificacion

---

## 6. Dependencias

- Definicion de audiencia objetivo exacta
- Recursos para crear contenido adaptado
- Validacion legal si aplica (COPPA, etc. para menores)

---

## 7. Criterios de Exito

- [ ] Contenido validado por al menos 5 jovenes del rango de edad
- [ ] Feedback positivo de educadores/padres
- [ ] Tasa de completacion comparable o superior a guias adultos
- [ ] Proyectos finales compartidos por usuarios jovenes

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)

