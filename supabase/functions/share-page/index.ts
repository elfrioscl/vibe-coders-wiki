import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const shareId = url.searchParams.get('id');

    if (!shareId) {
      return new Response('Missing share_id parameter', { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Only fetch public fields
    const { data, error } = await supabase
      .from('test_results')
      .select('nivel_resultado, respuestas_correctas, preguntas_respondidas, tiempo_total_segundos, created_at')
      .eq('share_id', shareId)
      .single();

    if (error || !data) {
      console.error('Error fetching test result:', error);
      return new Response(generate404Page(), { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    const porcentaje = Math.round((data.respuestas_correctas / data.preguntas_respondidas) * 100);
    const nivel = data.nivel_resultado;
    const nivelTitulo = nivelTitulos[nivel] || nivel;
    const emoji = nivelEmojis[nivel] || '🎯';
    const tiempoMinutos = Math.floor(data.tiempo_total_segundos / 60);
    const tiempoSegundos = data.tiempo_total_segundos % 60;
    
    // Generate URLs - use vibe-coders.es domain for canonical/redirect
    const shareImageUrl = `${supabaseUrl}/functions/v1/share-image?id=${shareId}`;
    const sharePageUrl = `https://vibe-coders.es/share/${shareId}`;
    const testUrl = 'https://vibe-coders.es/test-nivel';
    const siteUrl = 'https://vibe-coders.es';

    const ogTitle = `${emoji} Soy nivel ${nivelTitulo} en Vibe Coding!`;
    const ogDescription = `Completé el test con ${porcentaje}% de aciertos en ${tiempoMinutos}:${tiempoSegundos.toString().padStart(2, '0')}. ¿Cuál es tu nivel?`;

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ogTitle}</title>
  
  <!-- Redirect to React app after crawlers read OG tags -->
  <meta http-equiv="refresh" content="0;url=${sharePageUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${sharePageUrl}">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDescription}">
  <meta property="og:image" content="${shareImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Vibe Coders">
  
  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${sharePageUrl}">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:description" content="${ogDescription}">
  <meta name="twitter:image" content="${shareImageUrl}">
  
  <!-- Additional SEO -->
  <meta name="description" content="${ogDescription}">
  <link rel="canonical" href="${sharePageUrl}">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #171717 0%, #1a1a1a 50%, #171717 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      padding: 20px;
    }
    
    .certificate {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(61, 139, 79, 0.3);
      border-radius: 24px;
      padding: 48px;
      max-width: 500px;
      width: 100%;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .certificate::before {
      content: '';
      position: absolute;
      top: -100px;
      left: -100px;
      width: 200px;
      height: 200px;
      background: rgba(61, 139, 79, 0.1);
      border-radius: 50%;
    }
    
    .certificate::after {
      content: '';
      position: absolute;
      bottom: -80px;
      right: -80px;
      width: 180px;
      height: 180px;
      background: rgba(61, 139, 79, 0.08);
      border-radius: 50%;
    }
    
    .header {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    
    .title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 32px;
    }
    
    .emoji {
      font-size: 64px;
      margin-bottom: 16px;
    }
    
    .nivel {
      font-size: 32px;
      font-weight: bold;
      color: #3d8b4f;
      margin-bottom: 24px;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-bottom: 32px;
      position: relative;
      z-index: 1;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-value {
      font-size: 36px;
      font-weight: bold;
    }
    
    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .cta {
      display: inline-block;
      background: #3d8b4f;
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
      z-index: 1;
    }
    
    .cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(61, 139, 79, 0.4);
    }
    
    .footer {
      margin-top: 32px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
    }
    
    .footer a {
      color: #3d8b4f;
      text-decoration: none;
    }
    
    @media (max-width: 480px) {
      .certificate {
        padding: 32px 24px;
      }
      
      .title {
        font-size: 22px;
      }
      
      .stats {
        gap: 24px;
      }
      
      .stat-value {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">Resultado del Test de</div>
    <div class="title">Vibe Coding</div>
    
    <div class="emoji">${emoji}</div>
    <div class="nivel">Nivel ${nivelTitulo}</div>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-value">${porcentaje}%</div>
        <div class="stat-label">aciertos</div>
      </div>
      <div class="stat">
        <div class="stat-value">${tiempoMinutos}:${tiempoSegundos.toString().padStart(2, '0')}</div>
        <div class="stat-label">tiempo</div>
      </div>
    </div>
    
    <a href="${testUrl}" class="cta">🎯 Haz tu propio test</a>
  </div>
  
  <div class="footer">
    <a href="${siteUrl}">vibe-coders.es</a> — Aprende a crear apps con IA
  </div>
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
