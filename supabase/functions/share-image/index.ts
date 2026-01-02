import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Design System colors
const dsColors = {
  bg: '#171717',
  accent: '#3d8b4f'
};

const nivelTitulos: Record<string, string> = {
  inicial: 'INICIAL',
  intermedio: 'INTERMEDIO',
  avanzado: 'AVANZADO',
  expert: 'EXPERT'
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
        headers: corsHeaders 
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Only fetch public fields
    const { data, error } = await supabase
      .from('test_results')
      .select('nivel_resultado, respuestas_correctas, preguntas_respondidas, tiempo_total_segundos')
      .eq('share_id', shareId)
      .single();

    if (error || !data) {
      console.error('Error fetching test result:', error);
      return new Response('Result not found', { 
        status: 404, 
        headers: corsHeaders 
      });
    }

    const porcentaje = Math.round((data.respuestas_correctas / data.preguntas_respondidas) * 100);
    const nivel = data.nivel_resultado;
    const nivelTitulo = nivelTitulos[nivel] || nivel.toUpperCase();

    // Generate SVG image (simpler and more reliable than Canvas in Deno)
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${dsColors.bg}"/>
            <stop offset="50%" style="stop-color:#1a1a1a"/>
            <stop offset="100%" style="stop-color:${dsColors.bg}"/>
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bgGradient)"/>
        
        <!-- Decorative circles -->
        <circle cx="100" cy="100" r="200" fill="${dsColors.accent}" fill-opacity="0.08"/>
        <circle cx="1100" cy="530" r="250" fill="${dsColors.accent}" fill-opacity="0.06"/>
        
        <!-- Header text -->
        <text x="600" y="120" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#ffffff" fill-opacity="0.5">
          MI RESULTADO EN EL TEST DE
        </text>
        
        <!-- Title -->
        <text x="600" y="180" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" fill="#ffffff">
          VIBE CODING
        </text>
        
        <!-- Trophy emoji -->
        <text x="600" y="290" text-anchor="middle" font-size="80">🏆</text>
        
        <!-- Level badge -->
        <text x="600" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="64" font-weight="bold" fill="${dsColors.accent}">
          NIVEL ${nivelTitulo}
        </text>
        
        <!-- Percentage -->
        <text x="600" y="470" text-anchor="middle" font-family="system-ui, sans-serif" font-size="72" font-weight="bold" fill="#ffffff">
          ${porcentaje}%
        </text>
        <text x="600" y="510" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" fill="#ffffff" fill-opacity="0.6">
          de aciertos
        </text>
        
        <!-- Footer URL -->
        <text x="600" y="590" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" fill="#ffffff" fill-opacity="0.4">
          Descubre tu nivel → vibe-coders.es/test-nivel
        </text>
      </svg>
    `;

    // Return SVG as PNG would require additional libraries
    // For LinkedIn, SVG works but PNG is more compatible
    // Using resvg-js for server-side SVG to PNG conversion
    
    return new Response(svg, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in share-image function:', error);
    return new Response(errorMessage, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
