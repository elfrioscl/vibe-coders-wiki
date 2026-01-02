import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const nivelTitulos: Record<string, string> = {
  inicial: 'Inicial',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
  expert: 'Expert'
};

const nivelEmojis: Record<string, string> = {
  inicial: '🌱',
  intermedio: '🚀',
  avanzado: '⚡',
  expert: '🏆'
};

const validNiveles = ['inicial', 'intermedio', 'avanzado', 'expert'];

// Bot user agents that need OG tags
const botUserAgents = [
  'linkedinbot',
  'facebookexternalhit',
  'twitterbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'discordbot',
  'googlebot',
  'bingbot',
  'yandexbot',
  'baiduspider',
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return botUserAgents.some(bot => ua.includes(bot));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const nivel = url.searchParams.get('nivel');
    const userAgent = req.headers.get('user-agent') || '';

    // Validate nivel parameter
    if (!nivel || !validNiveles.includes(nivel)) {
      return new Response(generate404Page(), { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    const nivelTitulo = nivelTitulos[nivel];
    const emoji = nivelEmojis[nivel];
    const testUrl = 'https://vibe-coders.es/test-nivel';
    
    // Static image URL - served from public folder
    const shareImageUrl = `https://vibe-coders.es/images/share/nivel-${nivel}.png`;
    
    const ogTitle = `${emoji} Soy nivel ${nivelTitulo} en Vibe Coding!`;
    const ogDescription = `Acabo de completar el test de Vibe Coding. ¿Cuál es tu nivel? Descúbrelo en vibe-coders.es`;

    // If it's a bot, serve the OG tags HTML
    if (isBot(userAgent)) {
      console.log(`Bot detected: ${userAgent}`);
      
      const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ogTitle}</title>
  
  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${testUrl}">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDescription}">
  <meta property="og:image" content="${shareImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="640">
  <meta property="og:site_name" content="Vibe Coders">
  
  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${testUrl}">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:description" content="${ogDescription}">
  <meta name="twitter:image" content="${shareImageUrl}">
  
  <!-- Additional SEO -->
  <meta name="description" content="${ogDescription}">
  <link rel="canonical" href="${testUrl}">
</head>
<body>
  <p>Redirigiendo al test...</p>
</body>
</html>`;

      return new Response(html, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // For humans, redirect directly to the test page
    console.log(`Human detected, redirecting to ${testUrl}`);
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': testUrl,
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in share-page function:', error);
    return new Response(errorMessage, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});

function generate404Page(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resultado no encontrado - Vibe Coders</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #171717;
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
    h1 { font-size: 48px; margin-bottom: 16px; }
    p { color: rgba(255,255,255,0.6); margin-bottom: 32px; }
    a {
      background: #3d8b4f;
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h1>404</h1>
  <p>Este resultado no existe o ha expirado.</p>
  <a href="https://vibe-coders.es/test-nivel">Hacer el test</a>
</body>
</html>`;
}
