import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactPayload {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { nombre, email, telefono, mensaje }: ContactPayload = await req.json();

    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1a2332; padding: 24px; border-radius: 12px;">
          <h1 style="color: #4ade80; font-size: 20px; margin: 0 0 20px 0;">
            Nuevo mensaje de contacto
          </h1>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #9ca3af; font-size: 14px; width: 120px;">Nombre</td>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #ffffff; font-size: 14px;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #9ca3af; font-size: 14px;">Email</td>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #ffffff; font-size: 14px;">
                <a href="mailto:${email}" style="color: #4ade80; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #9ca3af; font-size: 14px;">Telefono</td>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #ffffff; font-size: 14px;">${telefono || "No proporcionado"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #9ca3af; font-size: 14px;">Fecha</td>
              <td style="padding: 12px; border-bottom: 1px solid #2d3748; color: #ffffff; font-size: 14px;">${now}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background-color: #0f1720; border-radius: 8px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Mensaje</p>
            <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${mensaje}</p>
          </div>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CONSTRUFAST Web <noreply@construfast.com.mx>",
        to: ["contacto@construfast.com.mx"],
        subject: `Nuevo mensaje de contacto - ${nombre}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errorData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
