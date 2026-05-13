## Objetivo

Hacer las 3 verificaciones pendientes y regenerar la OG image usando el branding real del sitio.

## Branding detectado en el código

- **Color accent**: verde `hsl(142 45% 35%)` (definido en `src/index.css`)
- **Tipografía**: DM Sans (display) + JetBrains Mono
- **Icono**: estrella/sparkle de Lucide (`public/favicon.svg`, stroke `#22c55e`)
- **Tagline H1 home**: "El lugar para aprender vibe coding en español"
- **Tono visual**: minimalista, fondo casi blanco (`0 0% 99%`), acentos verdes puntuales

## Pasos

### 1. Regenerar `public/og-image.png` con branding (1200×630, premium)

Prompt orientado a:
- Fondo claro neutro (off-white #FCFCFC)
- Icono sparkle/estrella verde grande a la izquierda en color `#1E7A3D`
- Texto "Vibe Coders Wiki" en DM Sans bold, negro
- Subtítulo "Aprende vibe coding en español" en gris medio
- Composición limpia, generosa en negative space
- Pequeño detalle: línea o badge verde acentuando

Usaré `imagegen` con quality `premium` (texto legible) y aspect 16:9 → 1920×1080 escalado, guardado como `public/og-image.png`.

### 2. Verificar SEO en páginas restantes

Confirmar que las 14 páginas tienen `<SEO>` con title/description/canonical correctos. De la búsqueda inicial, todas las páginas (`Index`, `Tips`, `Recursos`, `CursoLanding`, `CursoInicial`, `CursoIntermedio`, `CursoAvanzado`, `CursoGracias`, `TestNivel`, `DesignSystem`, `PoliticaPrivacidad`, `TerminosCondiciones`, `NotFound`, `glosario/que-es-vibe-coding`) ya importan el componente. Solo necesito leer rápidamente cada una y validar:
- `title` y `description` únicos y descriptivos
- `canonical` apuntando a la ruta correcta
- `noIndex` donde corresponde

### 3. Añadir `noIndex` a `/design-system`

Es página interna de referencia para devs, no debe aparecer en buscadores. Añadir `noIndex` en el `<SEO>` de `src/pages/DesignSystem.tsx`.

### 4. Verificación final de archivos modificados anteriormente

Re-leer y confirmar integridad de:
- `src/components/SEO.tsx` (prop `jsonLd` activo)
- `src/pages/Index.tsx` (JSON-LD WebSite + Organization)
- `src/pages/glosario/que-es-vibe-coding.tsx` (JSON-LD Article)
- `public/robots.txt` (sitemap apunta a `www.vibe-coders.es`)
- `public/sitemap.xml` (incluye glosario)
- `public/llms.txt` (índice de páginas)

### 5. Marcar findings como `fixed` ya están — no requiere acción

Los 5 findings del último escaneo están marcados como fixed. Tras estos cambios no se introducen findings nuevos. Sugeriré al usuario hacer Rescan desde la pestaña SEO.

## Archivos a modificar

- `public/og-image.png` (regenerar)
- `src/pages/DesignSystem.tsx` (añadir `noIndex`)

## Archivos a leer (verificación, sin cambios)

- Todas las páginas en `src/pages/` para auditar SEO
- Archivos SEO ya editados anteriormente

## Fuera de alcance

- No tocar `index.html` (ya tiene los meta sitewide correctos)
- No cambiar dominio en sitemap/robots (es `www.vibe-coders.es` a propósito según PRD-07)
- No crear nuevas páginas de glosario
