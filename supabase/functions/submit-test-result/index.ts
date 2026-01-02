import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limit: 1 test every 5 minutes per anonymous_id
const RATE_LIMIT_SECONDS = 5 * 60;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { anonymous_id, nivel_resultado, preguntas_respondidas, respuestas_correctas, tiempo_total_segundos, respuestas_detalle } = body;

    // Validate required fields
    if (!anonymous_id || !nivel_resultado || preguntas_respondidas === undefined || respuestas_correctas === undefined || tiempo_total_segundos === undefined || !respuestas_detalle) {
      console.error('Missing required fields:', { anonymous_id, nivel_resultado, preguntas_respondidas, respuestas_correctas, tiempo_total_segundos, respuestas_detalle: !!respuestas_detalle });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit - get last test from this anonymous_id
    const { data: lastTest, error: selectError } = await supabase
      .from('test_results')
      .select('created_at')
      .eq('anonymous_id', anonymous_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is fine
      console.error('Error checking rate limit:', selectError);
    }

    if (lastTest) {
      const lastTestTime = new Date(lastTest.created_at).getTime();
      const now = Date.now();
      const secondsSinceLastTest = (now - lastTestTime) / 1000;

      if (secondsSinceLastTest < RATE_LIMIT_SECONDS) {
        const waitSeconds = Math.ceil(RATE_LIMIT_SECONDS - secondsSinceLastTest);
        console.log(`Rate limit hit for ${anonymous_id}. Last test: ${secondsSinceLastTest}s ago. Must wait ${waitSeconds}s more.`);
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded', 
            message: `Debes esperar ${Math.ceil(waitSeconds / 60)} minutos antes de hacer otro test.`,
            wait_seconds: waitSeconds 
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Insert the test result
    const { data, error: insertError } = await supabase
      .from('test_results')
      .insert({
        anonymous_id,
        nivel_resultado,
        preguntas_respondidas,
        respuestas_correctas,
        tiempo_total_segundos,
        respuestas_detalle
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting test result:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save test result' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Test result saved for ${anonymous_id}: ${nivel_resultado}`);
    
    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in submit-test-result function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
