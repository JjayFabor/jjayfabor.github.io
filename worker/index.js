// Cloudflare Worker for the contact form.
//
//   fetch()  — POST /api/contact: validate input and ENQUEUE it, then return
//              immediately so the UI feels instant. Non-/api paths are served
//              from the static build (see run_worker_first in wrangler.jsonc).
//   queue()  — consumes the queue and actually sends the email via the
//              send_email binding. Failures retry automatically (max_retries),
//              then land in the dead-letter queue.
//
// Config:
//   env.EMAIL         send_email binding
//   env.CONTACT_QUEUE producer binding for the "contact-emails" queue
//   env.CONTACT_TO    recipient — a verified Email Routing destination address
//                     (secret: `npx wrangler secret put CONTACT_TO`)

const FROM = { email: "contact@jjayfabor.com", name: "jjayfabor.com" };

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const clean = (value, max) => String(value ?? "").trim().slice(0, max);
const isEmail = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

// Actually send one contact message. Throws on failure so the queue retries.
async function sendContactEmail(env, { name, email, message }) {
  const to = clean(env.CONTACT_TO, 200);
  if (!isEmail(to)) {
    throw new Error(`CONTACT_TO is not a valid email (length ${to.length})`);
  }
  await env.EMAIL.send({
    to,
    from: FROM,
    // Bare string so a reply from your inbox goes straight to the visitor.
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
  });
}

export default {
  // Producer: validate and enqueue, then respond instantly.
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname !== "/api/contact") return json({ error: "Not found" }, 404);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    // Fail fast if the recipient secret is misconfigured, so the user isn't
    // told "sent" for a message that could never be delivered.
    if (!isEmail(clean(env.CONTACT_TO, 200))) {
      console.error(
        "CONTACT_TO is not a valid email. Fix it with: npx wrangler secret put CONTACT_TO",
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
      await env.CONTACT_QUEUE.send({ name, email, message });
    } catch (err) {
      console.error("queue send failed:", err?.message ?? err);
      return json({ error: "Could not send your message. Please try again later." }, 502);
    }

    return json({ ok: true });
  },

  // Consumer: send each queued message; ack on success, retry on failure.
  async queue(batch, env) {
    for (const msg of batch.messages) {
      try {
        await sendContactEmail(env, msg.body);
        msg.ack();
      } catch (err) {
        console.error(
          "send_email failed (will retry):",
          err?.code ?? "",
          err?.message ?? err,
        );
        msg.retry();
      }
    }
  },
};
