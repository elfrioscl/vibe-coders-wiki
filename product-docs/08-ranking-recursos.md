# PRD-08: Ranking de Recursos y Herramientas

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-03
- Estado: Por desarrollar
- Tipo: Funcionalidad mixta (publica + interna)

---

## 1. Objetivo

Transformar la pagina de "Recursos y Herramientas" de una lista plana a un sistema de ranking que muestre las recomendaciones de la comunidad, permitiendo a usuarios nuevos identificar rapidamente que herramientas usar.

### Problema que resuelve
- **Paralisis de decision**: Un usuario nuevo ve 20+ herramientas sin saber por donde empezar
- **Falta de contexto**: No hay indicacion de cual es la preferida por la comunidad
- **Informacion implicita**: El conocimiento de "que usar" esta solo en la cabeza de los miembros experimentados

### Usuarios target
- Personas nuevas en vibe coding que necesitan orientacion
- Usuarios que quieren validar si estan usando las herramientas correctas
- Miembros de la comunidad que quieren expresar su opinion

---

## 2. Mecanica del Ranking

### 2.1 Sistema de Votacion (Solo Admins)

Los admins de la comunidad pueden votar por los recursos que recomiendan:

- **Un voto por admin por recurso**: Cada admin puede votar una sola vez por cada herramienta
- **Voto binario**: Es un voto de recomendacion (no hay escala 1-5)
- **Votacion por categoria**: Los votos se cuentan dentro de cada categoria
- **Cambio de voto**: Un admin puede quitar su voto en cualquier momento

### 2.2 Calculo del Ranking

El ranking dentro de cada categoria se determina por:

1. **Cantidad de votos**: Ordenados de mayor a menor
2. **Empate**: En caso de empate, orden alfabetico

### 2.3 Categorias con Ranking

El ranking aplica a todas las categorias, con enfasis especial en:

| Categoria | Recursos actuales | Importancia |
|-----------|------------------|-------------|
| Vibe Coding | Cursor, Lovable, Bolt, V0, Claude Code | Alta - Decision critica para empezar |
| Modelos IA | Claude, ChatGPT, Gemini, OpenRouter | Alta - Afecta calidad del output |
| Base de Datos | Supabase, Firebase, Airtable | Media - Depende del caso de uso |
| Pagos | Stripe, Paddle, Mercado Pago | Media - Depende de la region |
| Hosting | Vercel, Digital Ocean | Media |

---

## 3. UI Publica (Pagina Recursos)

### 3.1 Visualizacion del Ranking

Para cada categoria, los recursos se muestran ordenados por ranking con indicadores visuales:

- **Posicion 1**: Badge "Recomendado por la comunidad" destacado
- **Posiciones 2-3**: Indicador de ranking secundario
- **Resto**: Sin indicador especial, ordenados por votos

### 3.2 Informacion Mostrada

Cada recurso muestra:
- Nombre y descripcion (actual)
- Posicion en ranking (nuevo)
- Numero de votos de admins (nuevo)
- Badge de recomendacion si aplica (nuevo)

### 3.3 Ordenamiento

- **Por defecto**: Ordenado por ranking (votos)
- **Opcion alternativa**: Ordenar alfabeticamente

---

## 4. UI Interna (Panel Miembros - Solo Admins)

### 4.1 Seccion de Votacion

Los admins ven una seccion adicional en el panel de miembros:

- Lista de todos los recursos agrupados por categoria
- Boton para votar/quitar voto en cada recurso
- Indicador de su voto actual
- Contador de votos totales por recurso

### 4.2 Historial

- Registro de cuando voto cada admin (para auditoria)
- No se muestra publicamente quien voto por que

---

## 5. Consideraciones

### 5.1 Quien es Admin

El rol de "Admin" se define como:
- Mantenedores del repositorio
- Contributors con permisos especiales
- Definido explicitamente en la base de datos

### 5.2 Transparencia

- El ranking es publico y visible para todos
- Los votos individuales son privados (solo se muestra el total)
- El sistema es auditable internamente

### 5.3 Evolucion

- Se pueden agregar nuevos recursos y entraran sin votos
- Los admins pueden actualizar votos cuando quieran
- El ranking se actualiza en tiempo real

---

## 6. Metricas de Exito

- Reduccion en preguntas tipo "que herramienta uso?" en el grupo
- Aumento de clics en recursos top-ranked
- Participacion de admins en votaciones

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Panel de miembros: [02-panel-miembros.md](./02-panel-miembros.md)
- Datos actuales: `src/data/resources.ts`


