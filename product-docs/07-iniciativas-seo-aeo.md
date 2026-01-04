# PRD-07: Iniciativas de SEO y AEO

## Metadata
- Version: 5.1
- Fecha creacion: 2026-01-02
- Ultima actualizacion: 2026-01-04
- Estado: En definicion

---

## 1. Objetivo

Dar a conocer Vibe Coders Wiki generando contenido de valor que:
- Permita a usuarios descubrir que existe el sitio cuando buscan terminos relacionados con vibe coding
- Muestre las diferentes secciones del sitio y el valor que puede aportar al usuario
- Posicione al sitio como referente en vibe coding en espanol, tanto en buscadores tradicionales (SEO) como en motores de respuesta de IA (AEO)

---

## 2. Problema que Resuelve

- El sitio tiene expertise valiosa sobre vibe coding que no esta siendo aprovechada para atraer usuarios
- Personas buscan terminos relacionados con vibe coding en Google y en motores de IA (ChatGPT, Perplexity, etc.) pero no encuentran el sitio
- No existe contenido indexable que conecte las busquedas de usuarios con el valor que ofrece la wiki

---

## 3. Iniciativas

Este PRD agrupa iniciativas de SEO y AEO con diferentes niveles de definicion:

### 3.0 Fundamentos Tecnicos

**Estado**: Completado

Configuracion tecnica base para SEO y AEO.

#### 3.0.1 robots.txt

Archivo `public/robots.txt` configurado con:
- Bots de buscadores tradicionales: Googlebot, Bingbot
- Bots de redes sociales: Twitterbot, facebookexternalhit
- Bots de IA (AEO): GPTBot, ChatGPT-User, Claude-Web, anthropic-ai, PerplexityBot
- Referencia al sitemap: `Sitemap: https://www.vibe-coders.es/sitemap.xml`

**Beneficio AEO**: Permitir explicitamente bots de IA asegura que el contenido pueda ser indexado y citado por motores de respuesta como ChatGPT, Claude y Perplexity.

#### 3.0.2 sitemap.xml

Archivo `public/sitemap.xml` con las URLs principales del sitio:

| URL | Prioridad | Frecuencia |
|-----|-----------|------------|
| `/` | 1.0 | weekly |
| `/guias-cursos-vibe-coding` | 0.9 | weekly |
| `/guias-cursos-vibe-coding/inicial` | 0.8 | monthly |
| `/guias-cursos-vibe-coding/intermedio` | 0.8 | monthly |
| `/guias-cursos-vibe-coding/avanzado` | 0.8 | monthly |
| `/test-nivel` | 0.8 | monthly |
| `/tips` | 0.7 | weekly |
| `/recursos` | 0.7 | weekly |
| `/politica-privacidad` | 0.3 | yearly |
| `/terminos-condiciones` | 0.3 | yearly |

**Pendiente**: Agregar URLs de `/glosario/` cuando se implementen las paginas.

#### 3.0.3 Configuracion HTTPS

- Cloudflare configurado con "Always Use HTTPS" activado
- Redireccion 301 de HTTP a HTTPS para consolidar autoridad SEO

#### 3.0.4 Componente SEO (react-helmet-async)

Componente reutilizable `src/components/SEO.tsx` para meta tags dinamicos:

- **Implementado**: Title, description, canonical, Open Graph, Twitter Cards
- **Dependencia**: react-helmet-async con HelmetProvider en main.tsx
- **Props**: title, description, canonical, ogImage, ogType, noIndex

**Estado de adopcion**: Completado en todas las paginas.

#### 3.0.5 SSR/Prerender para AEO

**Estado**: Completado

**Problema**: Lovable genera SPAs con React que usan renderizado del lado del cliente (CSR). Lovable no soporta Server-Side Rendering (SSR) ni prerendering nativo. Los bots de IA (ChatGPT, Claude, Perplexity) que no ejecutan JavaScript solo ven el HTML vacio (`<div id="root"></div>`).

Referencia: https://docs.lovable.dev/tips-tricks/seo-geo

**Impacto en AEO**:
- Motores de IA no pueden indexar ni citar el contenido del sitio
- Usuarios que preguntan sobre vibe coding a ChatGPT, Claude o Perplexity no reciben referencias a Vibe Coders Wiki
- Se pierde visibilidad en un canal de descubrimiento cada vez mas importante

**Solucion implementada**: 
- Hosting migrado de Lovable a Cloudflare Pages
- Lovable despublicado (solo se usa Preview para desarrollo)
- Cloudflare Worker intercepta requests de bots
- Browser Rendering API prerenderiza el HTML completo
- Cache en KV optimiza tiempos de respuesta

**Resultado**:
- Bots de IA pueden leer y citar el contenido del sitio
- Meta tags dinamicos (via react-helmet-async) son capturados correctamente
- Tiempo de respuesta para bots: ~300ms (cache hit) vs ~3-5s (primer render)

**Spec tecnico**: [specs/ssr-prerender-aeo.md](../specs/ssr-prerender-aeo.md)

### 3.1 Glosario Programatico

**Estado**: Definido y listo para implementar

Generacion de paginas de glosario para conceptos relevantes para vibe coding, extraidos del curriculum.

**Enfoque clave**: No es un glosario tecnico generico. Cada termino se enfoca en como ese concepto se aplica a alguien que esta aprendiendo a crear aplicaciones con IA. Los slugs se formulan como los buscaria una persona aprendiendo vibe coding, no como terminos tecnicos aislados.

Ejemplo: En lugar de "que-es-un-llm" (generico), usamos "como-la-ia-escribe-codigo" (contextualizado al vibe coding).

- Extraccion de slugs de todos los modulos (solo conceptos relevantes para vibe coding)
- Consolidacion y deduplicacion por frecuencia
- Generacion de paginas con revision manual
- **Detalle completo**: [PRD-07.1 Glosario Programatico](./07.1-glosario-programatico.md)

### 3.2 Product-Led SEO

**Estado**: Intencion futura, sin definir

Usar el producto como motor de SEO. Aun no esta definido que forma tomara.

- Posibles direcciones: perfiles publicos, herramientas gratuitas, contenido generado por usuarios
- **Detalle**: [PRD-07.2 Product-Led SEO](./07.2-product-led-seo.md) (pendiente de definir)

---

## 4. Fases de Implementacion

### Fase 0: Fundamentos Tecnicos ✓
- [x] robots.txt con bots de IA
- [x] sitemap.xml con URLs principales
- [x] Configuracion HTTPS en Cloudflare
- [x] Componente SEO con react-helmet-async
- [x] Propagar SEO a todas las paginas
- [x] SSR/Prerender para AEO (Cloudflare Worker + Browser Rendering)
- [ ] Agregar URLs de glosario al sitemap (cuando se implementen)

### Fase 1: Glosario Programatico
- Implementar segun PRD-07.1
- Estrategia incremental: Guia Inicial → Intermedia → Avanzada
- Revision manual de cada termino antes de publicar

### Fase 2: Product-Led SEO
- Definir que forma tomara (perfiles, herramientas, etc.)
- Documentar en PRD-07.2
- Implementar segun definicion

---

## 5. Metricas de Exito (Generales)

| Metrica | Objetivo |
|---------|----------|
| Paginas indexadas | 100% de paginas creadas |
| Posiciones top 10 | 20% de keywords target |
| Trafico organico mensual | Crecimiento MoM |
| Tasa pagina SEO → test | >5% |
| Menciones en motores de IA | Ser citado como fuente |

Metricas especificas de cada iniciativa estan en sus respectivos sub-PRDs.

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Sub-PRD Glosario: [07.1-glosario-programatico.md](./07.1-glosario-programatico.md)
- Sub-PRD PLSEO: [07.2-product-led-seo.md](./07.2-product-led-seo.md)
- Datos del curriculum: `src/data/curriculum.ts`

