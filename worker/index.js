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
//   env.RATE_LIMITER  Durable Object binding for strongly-consistent per-IP
//                     rate limiting (one DO instance per IP).

import { DurableObject } from "cloudflare:workers";

const FROM = { email: "contact@jjayfabor.com", name: "jjayfabor.com" };

// Per-IP rate limit: at most RATE_LIMIT submissions per RATE_PERIOD_MS.
const RATE_LIMIT = 5;
const RATE_PERIOD_MS = 60_000;

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

// Verify a Turnstile token server-side (browser -> Worker -> siteverify).
// Never call siteverify from the browser. Returns true only on success.
async function verifyTurnstile(secret, token, ip) {
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.set("remoteip", ip); // optional; omit when unknown
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );
  const data = await res.json();
  if (!data.success) {
    console.error("turnstile verify failed:", (data["error-codes"] || []).join(","));
  }
  return data.success === true;
}

// Strongly-consistent per-IP fixed-window rate limiter. One DO instance per
// key holds the count; check() returns true while under the limit.
export class RateLimiter extends DurableObject {
  async check(limit, periodMs) {
    const now = Date.now();
    let windowStart = (await this.ctx.storage.get("windowStart")) ?? 0;
    let count = (await this.ctx.storage.get("count")) ?? 0;
    if (now - windowStart >= periodMs) {
      windowStart = now;
      count = 0;
    }
    count += 1;
    await this.ctx.storage.put({ windowStart, count });
    return count <= limit;
  }
}

export default {
  // Producer: validate and enqueue, then respond instantly.
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname !== "/api/contact") return json({ error: "Not found" }, 404);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    // Per-IP rate limit — runs before any work (incl. siteverify) so a flood
    // from one IP is shed cheaply. Backed by a strongly-consistent DO.
    const clientIp = request.headers.get("CF-Connecting-IP") || "";
    const rlId = env.RATE_LIMITER.idFromName(`contact:${clientIp || "unknown"}`);
    const withinLimit = await env.RATE_LIMITER.get(rlId).check(
      RATE_LIMIT,
      RATE_PERIOD_MS,
    );
    if (!withinLimit) {
      return json(
        { error: "Too many messages. Please wait a minute and try again." },
        429,
      );
    }

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

    // Honeypot: real users never fill this. If it's set, accept-and-drop —
    // the bot sees success and moves on, but nothing is enqueued or sent.
    if (clean(body.company, 100)) {
      return json({ ok: true });
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

    // Bot check: verify the Turnstile token before doing any work.
    const token = clean(body.turnstileToken, 4096);
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET, token, clientIp))) {
      return json(
        { error: "Verification failed. Please refresh and try again." },
        403,
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
