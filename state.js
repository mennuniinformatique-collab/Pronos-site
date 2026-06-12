// Cloudflare Pages Function — /api/state
// GET  -> renvoie l'état partagé (JSON)
// POST -> enregistre l'état partagé (JSON)

const KEY = "wc2026_shared_state";

export async function onRequestGet(context) {
  const value = await context.env.WC_PRONOS.get(KEY);
  return new Response(value || "null", {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    // validation basique : doit être un JSON valide
    JSON.parse(body);
    await context.env.WC_PRONOS.put(KEY, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
