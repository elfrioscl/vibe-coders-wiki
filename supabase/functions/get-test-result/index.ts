import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const { result_id, anonymous_id } = body;

    // Validate required fields
    if (!result_id || !anonymous_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: result_id and anonymous_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the test result by ID
    const { data, error } = await supabase
      .from('test_results')
      .select('id, anonymous_id, nivel_resultado, preguntas_respondidas, respuestas_correctas, tiempo_total_segundos, respuestas_detalle, share_id')
      .eq('id', result_id)
      .single();

    if (error || !data) {
      console.error('Error fetching test result:', error);
      return new Response(
        JSON.stringify({ error: 'Test result not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate that the anonymous_id matches
    if (data.anonymous_id !== anonymous_id) {
      console.warn(`Unauthorized access attempt: provided ${anonymous_id}, expected ${data.anonymous_id}`);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return the result without the anonymous_id
    const { anonymous_id: _, ...safeData } = data;
    
    return new Response(
      JSON.stringify({ success: true, data: safeData }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in get-test-result function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

