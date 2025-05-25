import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const Contact = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

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
        toast.success("Your message has been sent successfully.", {
            icon: <CheckCircle className="text-green-500 w-6 h-6 p-2" />,
        });
        form.reset();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops! Something went wrong. Please try again.", {
        icon: <CircleX className="text-red-500 w-6 h-6 p-2" />,
    });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-4 pb-16 relative  bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-100 text-center mb-12">
          Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Your Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      placeholder="John Doe"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
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
                      placeholder="johndoe@example.com"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
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

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full h-12" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Contact;
