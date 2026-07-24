import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Public Turnstile sitekey — safe to ship in the client. The secret lives
// only in the Worker (TURNSTILE_SECRET) and is used for server-side verify.
const TURNSTILE_SITEKEY = "0x4AAAAAAD8ttvZFTMonWRDg";

const Contact = ({ open = false, onClose = () => {} }) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      // Honeypot: hidden from real users; bots that fill it get dropped.
      company: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Load the Turnstile script once (explicit mode — we render it ourselves).
  useEffect(() => {
    if (document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  // Render the widget when the modal opens; remove it when it closes.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const render = () => {
      if (cancelled) return;
      if (window.turnstile && widgetRef.current && widgetIdRef.current == null) {
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          action: "turnstile-spin-v2",
          callback: (t) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      } else if (!window.turnstile) {
        setTimeout(render, 200);
      }
    };
    render();
    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      setToken("");
    };
  }, [open]);

  const handleSubmit = async (data) => {
    if (!token) {
      toast.error("Please complete the verification challenge.");
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully.");
        form.reset();
        // close modal after success (widget is removed by the cleanup effect)
        onClose();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
      // Reset the widget so the user can retry with a fresh token.
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setToken("");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get in touch"
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 max-w-2xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-brand-surface sm:rounded-lg border border-brand-border">
        <div className="flex items-center justify-between p-4 border-b border-brand-border">
          <h3 className="text-lg font-semibold text-brand-text">Get in touch</h3>
          <button
            type="button"
            aria-label="Close contact form"
            onClick={onClose}
            className="flex items-center justify-center w-11 h-11 -mr-2 rounded-md bg-transparent text-brand-muted hover:bg-brand-border/50 hover:text-brand-text"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-brand-muted mb-4">
            Have a question or want to work together? Send me a message and I'll get back to you.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Your Name</Label>
                    <FormControl>
                      <Input {...field} id="name" className="h-12" placeholder="e.g. Maria Santos" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Your Email</Label>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        className="h-12"
                        placeholder="you@example.com"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="message">Your Message</Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="message"
                        placeholder="How can I help you?"
                        rows="5"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Honeypot — off-screen; real users never fill it, bots do */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                {...form.register("company")}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                }}
              />

              {/* Cloudflare Turnstile — bot verification */}
              <div
                ref={widgetRef}
                className="cf-turnstile"
                data-action="turnstile-spin-v2"
              />

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  className="h-12 px-6 w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send message"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-12 px-6 w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;