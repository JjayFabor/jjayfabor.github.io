// Cloudflare Worker: handles POST /api/contact and sends the submission via
// the Email Routing `send_email` binding (env.EMAIL). Every non-/api path is
// served straight from the static build — see run_worker_first in
// wrangler.jsonc — so this script only ever runs for /api/* requests.
//
// Config:
//   env.EMAIL      send_email binding (wrangler.jsonc)
//   env.CONTACT_TO recipient, a verified Email Routing destination address
//                  (set as a secret: `npx wrangler secret put CONTACT_TO`).
//                  MUST be a valid email — the send rejects anything else.

const FROM = { email: "contact@jjayfabor.com", name: "jjayfabor.com" };

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const clean = (value, max) => String(value ?? "").trim().slice(0, max);
const isEmail = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname !== "/api/contact") return json({ error: "Not found" }, 404);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    // Misconfiguration guard: CONTACT_TO must be a valid destination email.
    // (Without this, a bad secret surfaces only as a cryptic send failure.)
    const to = clean(env.CONTACT_TO, 200);
    if (!isEmail(to)) {
      console.error(
        `CONTACT_TO is not a valid email (length ${to.length}). ` +
          `Fix it with: npx wrangler secret put CONTACT_TO`,
      );
      return json({ error: "The contact form is temporarily unavailable." }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 200);
    const message = clean(body.message, 5000);

    if (!name || !message || !isEmail(email)) {
      return json(
        { error: "Please provide your name, a valid email, and a message." },
        400,
      );
    }

    try {
      await env.EMAIL.send({
        to,
        from: FROM,
        // Bare string so a reply from your inbox goes straight to the visitor.
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
      });
    } catch (err) {
      console.error("send_email failed:", err?.code ?? "", err?.message ?? err);
      return json(
        { error: "Could not send your message. Please try again later." },
        502,
      );
    }

    return json({ ok: true });
  },
};
