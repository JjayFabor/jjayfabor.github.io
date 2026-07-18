import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const Contact = ({ open = false, onClose = () => {} }) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xeojqone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully.");
        form.reset();
        // close modal after success
        onClose();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
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