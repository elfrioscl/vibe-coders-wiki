import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createCanvas } from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Design System colors
const dsColors = {
  bg: '#171717',
  bgLight: '#1a1a1a',
  accent: '#3d8b4f',
  white: '#ffffff'
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

    // Create canvas 1200x630 (LinkedIn recommended size)
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGradient.addColorStop(0, dsColors.bg);
    bgGradient.addColorStop(0.5, dsColors.bgLight);
    bgGradient.addColorStop(1, dsColors.bg);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative circles
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(61, 139, 79, 0.08)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1100, 530, 250, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(61, 139, 79, 0.06)';
    ctx.fill();

    // Header text
    ctx.font = '600 24px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'center';
    ctx.fillText('MI RESULTADO EN EL TEST DE', 600, 120);

    // Title
    ctx.font = 'bold 48px system-ui, sans-serif';
    ctx.fillStyle = dsColors.white;
    ctx.fillText('VIBE CODING', 600, 180);

    // Trophy icon (using star symbol as fallback since emoji may not render)
    ctx.font = 'bold 72px system-ui, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('★', 600, 290);

    // Level badge
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.fillStyle = dsColors.accent;
    ctx.fillText(`NIVEL ${nivelTitulo}`, 600, 380);

    // Percentage
    ctx.font = 'bold 72px system-ui, sans-serif';
    ctx.fillStyle = dsColors.white;
    ctx.fillText(`${porcentaje}%`, 600, 470);

    // "de aciertos" subtitle
    ctx.font = '28px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('de aciertos', 600, 510);

    // Footer URL
    ctx.font = '22px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('Descubre tu nivel → vibe-coders.es/test-nivel', 600, 590);

    // Convert to PNG
    const pngData = canvas.toBuffer("image/png");

    console.log(`Generated PNG image for share_id: ${shareId}, nivel: ${nivel}, porcentaje: ${porcentaje}%`);

    return new Response(new Uint8Array(pngData), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
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
