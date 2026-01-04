# Spec Tecnico: SSR/Prerender para AEO

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-04
- Estado: Implementado

---

## 1. Contexto

### Por que se necesita prerendering

Lovable genera SPAs (Single Page Applications) con React que usan renderizado del lado del cliente (CSR). Esto significa que:

1. El servidor devuelve un HTML minimo con `<div id="root"></div>`
2. JavaScript carga y renderiza el contenido en el navegador
3. Los bots que no ejecutan JavaScript solo ven el HTML vacio

**Referencia**: https://docs.lovable.dev/tips-tricks/seo-geo

### Impacto en AEO (AI Engine Optimization)

Los motores de respuesta de IA (ChatGPT, Claude, Perplexity) no ejecutan JavaScript cuando indexan contenido. Sin prerendering:
- No pueden leer ni citar el contenido del sitio
- El sitio es invisible para usuarios que preguntan sobre vibe coding a estos motores
- Se pierde un canal de descubrimiento cada vez mas importante

### Solucion implementada

Migrar el hosting de Lovable a Cloudflare Pages + Worker:
- Cloudflare Pages hostea la SPA
- Un Worker intercepta requests de bots
- Browser Rendering API prerenderiza el HTML
- Cache en KV optimiza tiempos de respuesta

---

## 2. Arquitectura

### Arquitectura anterior (Lovable hosting)

```
Cursor ──push──▶ GitHub ──sync──▶ Lovable ──deploy──▶ Lovable Hosting
```

### Arquitectura actual (Cloudflare Pages)

```
Lovable ──push──┐                                    
  (preview)     │                                    
                ├──▶ GitHub (main) ──auto deploy──▶ Cloudflare Pages
Cursor ──push───┘                                    (produccion)
                                                          │
                                                          ▼
                                                  Cloudflare Worker
                                                  (prerender bots)
```

### Flujo de requests

```
Usuario/Bot ──▶ Cloudflare DNS ──▶ Worker Route
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
              Bot detectado                           Usuario normal
                    │                                       │
                    ▼                                       ▼
           ¿Cache existe?                            Proxy a Pages
              │       │                                     │
              ▼       ▼                                     ▼
            hit     miss                             SPA React normal
              │       │
              ▼       ▼
         Devolver   Browser Rendering API
          cache           │
                          ▼
                    Guardar en cache
                          │
                          ▼
                    Devolver HTML
```

---

## 3. Cloudflare Pages

### Configuracion del proyecto

| Setting | Valor |
|---------|-------|
| Framework preset | React (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 18.x |

### Deployment automatico

- Conectado a GitHub (branch `main`)
- Cada push dispara un build automatico
- Los builds fallidos no afectan produccion

### Custom domains

| Dominio | Tipo |
|---------|------|
| vibe-coders.es | Apex (CNAME flattening) |
| www.vibe-coders.es | CNAME |

### Variables de entorno

Si el build falla por problemas con `bun.lockb`:

| Variable | Valor | Proposito |
|----------|-------|-----------|
| INSTALL_COMMAND | `npm install` | Forzar uso de npm en lugar de bun |

**Nota**: Si existe `bun.lockb` en el repositorio, Cloudflare detecta bun automaticamente y falla si el lockfile esta desactualizado. Solucion: eliminar `bun.lockb` del repo.

---

## 4. Cloudflare Worker

### Nombre del Worker

`prerender-vibe-coders`

### Bindings requeridos

| Binding | Tipo | Descripcion |
|---------|------|-------------|
| CACHE | KV Namespace | Cache de HTML prerenderizado |
| ACCOUNT_ID | KV Namespace | Account ID de Cloudflare (secreto) |
| API_TOKEN | KV Namespace | Token con permisos de Browser Rendering (secreto) |
| PURGE_SECRET | KV Namespace | Secret para endpoints de purge (secreto) |

**Nota**: Los valores de ACCOUNT_ID, API_TOKEN y PURGE_SECRET no se documentan por seguridad.

### Worker Route

| Zona | Route |
|------|-------|
| vibe-coders.es | `*vibe-coders.es/*` |

### Codigo del Worker

```javascript
export default {
  async fetch(request, env, ctx) {
    const CONFIG = {
      ORIGIN: "https://vibe-coders-wiki.pages.dev",
      CACHE_TTL: 604800 // 7 dias
    };
    
    // Lista actualizada de User-Agents de bots (Enero 2026)
    const BOT_USER_AGENTS = [
      // Buscadores
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
      // Redes sociales
      'facebot', 'facebookexternalhit', 'twitterbot', 'linkedinbot', 
      'whatsapp', 'telegrambot', 'pinterest', 'slackbot', 'discordbot',
      // Apple
      'applebot',
      // OpenAI
      'gptbot', 'chatgpt-user', 'oai-searchbot',
      // Anthropic/Claude (Oficiales 2026)
      'claude-user',        // Navegacion en tiempo real
      'claudebot',          // Rastreador de entrenamiento
      'claude-searchbot',   // Indexacion para busqueda
      'anthropic-ai',       // Token generico
      'anthropic',          // Fallback
      // Perplexity
      'perplexitybot', 'perplexity-user',
      // Otros IA
      'cohere-ai', 'meta-externalagent', 'bytespider', 'ccbot', 'diffbot',
      // SEO
      'semrushbot', 'ahrefsbot', 'mj12bot', 'dotbot',
      // Otros
      'ia_archiver', 'archive.org_bot'
    ];
    
    const url = new URL(request.url);

    // Purge una pagina especifica
    if (url.pathname === '/__purge') {
      const secret = url.searchParams.get('secret');
      const purgeSecret = await env.PURGE_SECRET.get();
      if (secret !== purgeSecret) {
        return new Response('Unauthorized', { status: 401 });
      }
      const path = url.searchParams.get('path') || '/';
      const cacheKey = `rendered:${path}`;
      await env.CACHE.delete(cacheKey);
      return new Response(`Cache purged for: ${path}`, { status: 200 });
    }

    // Purge todo el cache
    if (url.pathname === '/__webhook') {
      const secret = url.searchParams.get('secret');
      const purgeSecret = await env.PURGE_SECRET.get();
      if (secret !== purgeSecret) {
        return new Response('Unauthorized', { status: 401 });
      }
      const list = await env.CACHE.list();
      for (const key of list.keys) {
        await env.CACHE.delete(key.name);
      }
      return new Response(`Cache cleared: ${list.keys.length} entries`, { status: 200 });
    }

    // Detectar si es bot
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    const isBot = BOT_USER_AGENTS.some(bot => userAgent.includes(bot));

    // Si NO es bot → proxy directo a Pages
    if (!isBot) {
      const originUrl = CONFIG.ORIGIN + url.pathname + url.search;
      return fetch(originUrl, {
        headers: request.headers,
        method: request.method
      });
    }

    // Es bot → verificar cache
    const cacheKey = `rendered:${url.pathname}`;
    const cached = await env.CACHE.get(cacheKey);
    
    if (cached) {
      return new Response(cached, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Prerender': 'hit'
        }
      });
    }

    // No hay cache → renderizar con Browser Rendering API
    try {
      const targetUrl = CONFIG.ORIGIN + url.pathname;
      const accountId = await env.ACCOUNT_ID.get();
      const apiToken = await env.API_TOKEN.get();
      
      if (!accountId || !apiToken) {
        return new Response('Missing credentials', { status: 500 });
      }
      
      const renderResponse = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/content`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: targetUrl,
            rejectResourceTypes: ["image", "font", "media"],
            gotoOptions: {
              waitUntil: "networkidle0",
              timeout: 15000
            }
          })
        }
      );

      if (!renderResponse.ok) {
        const errorText = await renderResponse.text();
        console.error('Render error:', errorText);
        return fetch(CONFIG.ORIGIN + url.pathname);
      }

      const jsonResponse = await renderResponse.json();
      const html = jsonResponse.result;

      if (!html) {
        console.error('No HTML in response');
        return fetch(CONFIG.ORIGIN + url.pathname);
      }

      ctx.waitUntil(
        env.CACHE.put(cacheKey, html, { expirationTtl: CONFIG.CACHE_TTL })
      );

      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Prerender': 'miss'
        }
      });
    } catch (error) {
      console.error('Error:', error);
      return fetch(CONFIG.ORIGIN + url.pathname);
    }
  }
};
```

---

## 5. Browser Rendering API

### Endpoint

```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/browser-rendering/content
```

### Parametros utilizados

```json
{
  "url": "https://vibe-coders-wiki.pages.dev/path",
  "rejectResourceTypes": ["image", "font", "media"],
  "gotoOptions": {
    "waitUntil": "networkidle0",
    "timeout": 15000
  }
}
```

| Parametro | Descripcion |
|-----------|-------------|
| url | URL a renderizar (apunta al preview de Pages, no al dominio publico) |
| rejectResourceTypes | Bloquea imagenes, fonts y media para acelerar rendering |
| gotoOptions.waitUntil | Espera hasta que no haya conexiones de red activas |
| gotoOptions.timeout | Timeout maximo de 15 segundos |

### Respuesta

```json
{
  "success": true,
  "result": "<!DOCTYPE html>...",
  "meta": {
    "status": 200,
    "title": "Titulo de la pagina"
  }
}
```

El HTML renderizado esta en `result`.

---

## 6. Frontend (react-helmet-async)

### Componente SEO

Archivo: `src/components/SEO.tsx`

El componente permite definir meta tags dinamicos por pagina:
- title
- description
- canonical
- Open Graph (og:title, og:description, og:image)
- Twitter Cards

### Integracion con prerendering

1. El Browser Rendering carga la pagina completa
2. React ejecuta y react-helmet-async actualiza los meta tags en el `<head>`
3. `waitUntil: networkidle0` espera a que React termine
4. El HTML capturado incluye los meta tags correctos

### Paginas implementadas

Todas las paginas del sitio tienen el componente SEO implementado:
- Index, CursoLanding, CursoInicial, CursoIntermedio, CursoAvanzado
- TestNivel, Tips, Recursos
- Glosario (que-es-vibe-coding)
- PoliticaPrivacidad, TerminosCondiciones

---

## 7. Configuracion DNS

### Registros requeridos

| Tipo | Nombre | Contenido | Proxy |
|------|--------|-----------|-------|
| CNAME | @ | vibe-coders-wiki.pages.dev | Proxied (naranja) |
| CNAME | www | vibe-coders-wiki.pages.dev | Proxied (naranja) |

**Importante**: Los registros DEBEN estar en modo "Proxied" (nube naranja) para que el Worker pueda interceptar el trafico.

---

## 8. Configuraciones de Seguridad

### Always Use HTTPS

Cloudflare → SSL/TLS → Edge Certificates → Always Use HTTPS: **ON**

### Redireccion www

Si se requiere redireccion de apex (@) a www:

Cloudflare → Rules → Redirect Rules → Create:
- **When**: `(http.host eq "vibe-coders.es")`
- **Then**: Dynamic redirect to `concat("https://www.vibe-coders.es", http.request.uri.path)`
- **Status**: 301 (Permanent)

---

## 9. Endpoints del Worker

### Debug

```
GET https://www.vibe-coders.es/__debug
```

Devuelve informacion sobre el User-Agent y si fue detectado como bot. Util para diagnosticar problemas de deteccion desde LLMs u otras herramientas.

**Respuesta:**
```json
{
  "userAgent": "Mozilla/5.0 ...",
  "isBot": true,
  "env_keys": ["CACHE", "ACCOUNT_ID", ...]
}
```

**Nota de seguridad**: Este endpoint solo expone nombres de variables de entorno, no sus valores. El riesgo es minimo y la utilidad para diagnostico es alta.

### Test Render

```
GET https://www.vibe-coders.es/__test-render
```

Prueba la conexion con el Browser Rendering API renderizando la homepage. Util para diagnosticar problemas de configuracion (API_TOKEN, ACCOUNT_ID, permisos).

**Respuesta:**
```json
{
  "status": 200,
  "hasHtml": true,
  "htmlLength": 45230,
  "error": null
}
```

**Notas:**
- **Tiempo de respuesta**: 1-3 segundos (el render completo es lento)
- **Consumo de cuota**: Cada llamada consume una ejecucion del Browser Rendering API
- **Usar solo para diagnostico**, no para monitoreo continuo

### Purge pagina especifica

```
GET https://www.vibe-coders.es/__purge?secret={PURGE_SECRET}&path=/ruta/a/purgar
```

### Purge todo el cache

```
GET https://www.vibe-coders.es/__webhook?secret={PURGE_SECRET}
```

---

## 10. Estrategia de Cache

### TTL (Time to Live)

El cache tiene un TTL de **7 dias** (604800 segundos). Despues de 7 dias, la entrada expira automaticamente y el proximo bot que visite la pagina disparara un nuevo rendering.

### Cuando se actualiza el cache

| Evento | Cache se actualiza? | Accion requerida |
|--------|---------------------|------------------|
| Bot visita pagina sin cache | Si (automatico) | Ninguna |
| Bot visita pagina con cache valido | No (sirve cache) | Ninguna |
| Cache expira (7 dias) | Si en proxima visita | Ninguna |
| Nuevo deploy en Pages | No automatico | Purgar manualmente |
| Cambio de contenido en pagina | No automatico | Purgar manualmente |

### Invalidacion automatica (no configurada)

Actualmente NO hay invalidacion automatica cuando se hace deploy. Opciones para implementar:

**Opcion A: Webhook de GitHub Actions**
Agregar un step en el workflow que llame al endpoint `/__webhook` despues de cada deploy exitoso.

**Opcion B: Deploy Hook de Cloudflare Pages**
Configurar un deploy hook que dispare la purga del cache.

### Invalidacion manual

**Purgar una pagina especifica:**
```bash
curl "https://www.vibe-coders.es/__purge?secret={SECRET}&path=/glosario/que-es-vibe-coding"
```

**Purgar todo el cache:**
```bash
curl "https://www.vibe-coders.es/__webhook?secret={SECRET}"
```

### Recomendaciones

1. **Despues de cada deploy importante**: Purgar todo el cache
2. **Cambios menores en una pagina**: Purgar solo esa pagina
3. **Nuevo contenido (pagina nueva)**: No requiere purga, el cache se llena automaticamente
4. **Cambios en meta tags SEO**: Purgar las paginas afectadas

---

## 11. Troubleshooting

### Error 1000 (DNS points to prohibited IP)

**Causa**: Lovable hosting usa su propio proxy/CDN. Cloudflare Proxy crea una cadena de proxies que Cloudflare bloquea.

**Solucion**: Migrar hosting a Cloudflare Pages.

### ISPs en Espana bloquean Cloudflare

**Causa**: ISPs espanoles bloquean ciertos rangos de IP de Cloudflare por orden judicial de LaLiga (anti-pirateria).

**Sintoma**: `ERR_CONNECTION_TIMED_OUT` desde Espana, especialmente durante partidos de futbol.

**Solucion**: Usar VPN o esperar (los bloqueos son temporales).

### API REST no soporta waitForSelector

**Causa**: La API REST de Browser Rendering solo soporta `waitUntil`, no `waitForSelector`.

**Solucion**: Usar react-helmet-async para que los meta tags se actualicen antes de que `networkidle0` capture el HTML.

### Puppeteer no funciona desde el Dashboard

**Causa**: No se puede importar `@cloudflare/puppeteer` cuando se edita el Worker desde el dashboard de Cloudflare.

**Solucion**: Usar la API REST de Browser Rendering en lugar de Puppeteer.

### Contenido duplicado (Lovable)

**Problema**: Despues de migrar a Cloudflare Pages, el sitio en Lovable sigue activo:
- `vibe-coders-wiki.lovable.app` ← Contenido duplicado
- `www.vibe-coders.es` ← Sitio principal

Esto afecta negativamente el SEO (Google penaliza contenido duplicado).

**Solucion**: Despublicar el sitio en Lovable:
1. Lovable → Settings → Domain
2. Eliminar o desactivar el dominio publico
3. Mantener solo el preview de desarrollo si es necesario

---

## 12. Testing

### Probar como bot (PowerShell)

```powershell
# Test basico como Googlebot
$r = Invoke-WebRequest -Uri "https://www.vibe-coders.es/glosario/que-es-vibe-coding" -UserAgent "Googlebot" -UseBasicParsing
Write-Host "X-Prerender:" $r.Headers["X-Prerender"]
Write-Host "Content Length:" $r.Content.Length

# Verificar meta tags
$r.Content | Select-String "<title>"
$r.Content | Select-String 'meta name="description"'
```

### Probar multiples bots

```powershell
$bots = @("Googlebot", "ClaudeBot/1.0", "GPTBot/1.1", "PerplexityBot/1.0")
foreach ($bot in $bots) {
  $r = Invoke-WebRequest -Uri "https://www.vibe-coders.es/" -UserAgent $bot -UseBasicParsing
  Write-Host "$bot : X-Prerender=$($r.Headers['X-Prerender'])"
}
```

### Verificar cache en KV

Cloudflare Dashboard → Storage & Databases → KV → (namespace del cache)

Las keys tienen formato: `rendered:/path/to/page`

---

## 13. Mantenimiento

### Agregar nuevas paginas

1. Crear la pagina en React con componente `<SEO>`
2. El Worker prerenderizara automaticamente cuando un bot la visite
3. El cache se llenara automaticamente

### Purgar cache despues de cambios

```bash
# Una pagina especifica
curl "https://www.vibe-coders.es/__purge?secret={SECRET}&path=/glosario/que-es-vibe-coding"

# Todo el cache
curl "https://www.vibe-coders.es/__webhook?secret={SECRET}"
```

### Monitorear errores

Cloudflare Dashboard → Workers & Pages → prerender-vibe-coders → Logs

### Actualizar lista de bots

Revisar periodicamente User-Agents de nuevos bots de IA. Fuentes:
- Documentacion de OpenAI (GPTBot)
- Documentacion de Anthropic (ClaudeBot)
- Documentacion de Perplexity

---

## 14. Metricas de rendimiento

| Tipo de Request | Tiempo | Header X-Prerender |
|-----------------|--------|-------------------|
| Usuario normal | ~90ms | (ninguno) |
| Bot (primera vez) | ~3-5 segundos | miss |
| Bot (cache hit) | ~300-400ms | hit |

---

## Referencias

- PRD relacionado: [07-iniciativas-seo-aeo.md](../product-docs/07-iniciativas-seo-aeo.md)
- Arquitectura general: [00-PRD-vision.md](../product-docs/00-PRD-vision.md)
- Cloudflare Browser Rendering: https://developers.cloudflare.com/browser-rendering/
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- react-helmet-async: https://github.com/staylor/react-helmet-async
- Lovable SEO docs: https://docs.lovable.dev/tips-tricks/seo-geo

