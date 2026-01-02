# PRD-00: Vibe Coders Wiki - Vision

## Metadata
- Version: 1.1
- Fecha creacion: 2026-01-01
- Ultima actualizacion: 2026-01-02
- Estado: En desarrollo activo

---

## 1. Vision del Producto

**Vibe Coders Wiki** es el lugar para aprender vibe coding en espanol. Un esfuerzo comunitario de vibe coders que comparten aprendizajes, tips, recursos y metodologia para consolidar las mejores practicas de esta nueva disciplina.

### Problema que resuelve
- Falta de recursos estructurados en espanol para aprender vibe coding
- Informacion dispersa sin una metodologia clara
- Barrera de entrada para hispanohablantes que quieren construir con IA

### Usuarios target
- Personas sin experiencia tecnica que quieren crear productos digitales
- Desarrolladores que quieren integrar IA en su flujo de trabajo
- Emprendedores que buscan prototipar rapido con herramientas AI-first

---

## 2. Funcionalidades Implementadas

### 2.1 Guias de Vibe Coding
- 3 niveles: Inicial (6 modulos), Intermedio (10 modulos), Avanzado (10 modulos)
- Cada modulo con objetivo, resultado esperado y temas detallados
- Navegacion entre niveles
- CTA sidebar para suscripcion
- Temas avanzados: RAG, embeddings, bases de datos vectoriales
- Cobertura de hosting: Lovable, Vercel, Netlify
- Variables de entorno y secrets
- Autenticacion: OAuth, JWT, SSE

### 2.2 Tips
- Tips organizados por nivel (basico, intermedio, avanzado)
- Categorias: prompts, debugging, arquitectura, deploy, productividad, vibe-coding
- Busqueda y filtrado por categoria
- Soporte para imagenes de ejemplo
- Boton copiar en cada tip

### 2.3 Recursos y Herramientas
- Catalogo de herramientas recomendadas
- Categorias: pagos, emails, bases-de-datos, ia, vibe-coding, analytics, auth, otros
- Busqueda y filtrado
- Links externos a cada recurso

### 2.4 Test de Nivel
- 10 preguntas para evaluar nivel del usuario
- Recomendacion de guia segun resultado
- Guardado de resultados en base de datos

### 2.5 Suscripcion a Alertas
- Formulario inline para capturar email
- Guardado en base de datos (tabla suscripciones_alertas)
- Seleccion de curso de interes

### 2.6 Design System
- Documentacion interna de componentes
- Preview de UI components reutilizables

### 2.7 Paginas Legales
- Terminos y Condiciones con filosofia open source
- Politica de Privacidad con contexto del proyecto
- Enlaces a GitHub Issues para contacto
- Documentacion interna de componentes
- Preview de UI components reutilizables

---

## 3. Arquitectura Actual

### Stack
- Frontend: React + Vite + TypeScript
- Estilos: Tailwind CSS + shadcn/ui
- Routing: React Router DOM
- Backend: Lovable Cloud (Supabase)
- Fuentes: DM Sans, JetBrains Mono

### Base de datos
- `suscripciones_alertas`: email, curso, created_at
- `test_results`: score, nivel, respuestas

### Rutas
```
/                                    -> Home
/guias-cursos-vibe-coding            -> Landing guias
/guias-cursos-vibe-coding/inicial    -> Guia nivel 1
/guias-cursos-vibe-coding/intermedio -> Guia nivel 2
/guias-cursos-vibe-coding/avanzado   -> Guia nivel 3
/guias-cursos-vibe-coding/gracias    -> Thank you page
/test-nivel                          -> Evaluacion
/tips                                -> Tips
/recursos                            -> Herramientas
/design-system                       -> Documentacion interna
/terminos-condiciones                -> Terminos y Condiciones
/politica-privacidad                 -> Politica de Privacidad
```

---

## 4. Epicas Pendientes

### EPICA 1: Comunidad y Contribuciones
- [ ] Sistema de comentarios en tips
- [ ] Formulario para proponer nuevos tips
- [ ] Votacion/likes en recursos
- [ ] Perfil de contribuidores

### EPICA 2: Contenido Expandido
- [ ] Videos embebidos en guias
- [ ] Proyectos de ejemplo paso a paso
- [ ] Glosario de terminos vibe coding
- [ ] FAQ section

### EPICA 3: Personalizacion
- [ ] Progreso guardado por guia (con auth)
- [ ] Bookmarks de tips favoritos
- [ ] Dashboard personal de aprendizaje
- [ ] Certificado de completacion

### EPICA 4: SEO y Crecimiento
- [ ] Paginas individuales por tip (mejora SEO)
- [ ] Blog con articulos
- [ ] Newsletter automatizado
- [ ] Integracion con redes sociales

### EPICA 5: Mobile Experience
- [ ] Menu hamburguesa responsive
- [ ] PWA (instalable)
- [ ] Modo offline para guias

### EPICA 6: Internacionalizacion
- [ ] Soporte multi-idioma (portugues)
- [ ] Contenido localizado por pais

---

## 5. Decisiones de Diseno

- **Tema oscuro por defecto**: Preferencia de developers
- **Minimalismo**: Foco en contenido, sin distracciones
- **Mobile-first**: Aunque la experiencia desktop es completa
- **Sin login obligatorio**: Reducir friccion para nuevos usuarios
- **Open source**: Fomentar contribuciones de la comunidad
- **Responsive padding**: Espaciado diferenciado para mobile vs desktop
- **GitHub como punto de contacto**: Issues para feedback y contribuciones

---

## 6. Metricas de Exito (por definir)

- Usuarios unicos mensuales
- Tasa de completacion de guias
- Suscriptores a alertas
- Contribuciones en GitHub
- Tests de nivel completados

---

## Changelog

### v1.1 (2026-01-02)
- Corregido conteo de modulos en guias (Inicial: 6, Intermedio: 10, Avanzado: 10)
- Expandido curriculum con temas de RAG, embeddings y bases de datos vectoriales
- Agregados temas de OAuth, JWT y SSE en autenticacion
- Agregados temas de hosting (Netlify, Vercel, Lovable)
- Creadas paginas de Terminos y Condiciones y Politica de Privacidad
- Mejorado espaciado responsive en mobile (padding diferenciado)
- Documentado GitHub Issues como punto de contacto
