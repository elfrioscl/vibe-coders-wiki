import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== "POST") {
      console.log("[mark-shared] Method not allowed:", req.method);
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { share_id } = await req.json();

    if (!share_id) {
      console.log("[mark-shared] Missing share_id");
      return new Response(
        JSON.stringify({ error: "share_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[mark-shared] Marking as shared:", share_id);

    // Use service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Update shared_at only if it's null (idempotent - only tracks first share)
    const { error } = await supabase
      .from("test_results")
      .update({ shared_at: new Date().toISOString() })
      .eq("share_id", share_id)
      .is("shared_at", null);

    if (error) {
      console.error("[mark-shared] Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[mark-shared] Successfully marked as shared:", share_id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[mark-shared] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
