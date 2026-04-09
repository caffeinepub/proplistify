import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitLead } from "@/hooks/use-leads";
import { generateBreadcrumbJsonLD, setPageMeta } from "@/seo";
import type { InquiryType, SubmitLeadInput } from "@/types";
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: InquiryType;
  propertyTitle: string;
  message: string;
}

type SubjectOption = { value: InquiryType; label: string };

const SUBJECT_OPTIONS: SubjectOption[] = [
  { value: "general", label: "General Inquiry" },
  { value: "viewingRequest", label: "Property Viewing" },
  { value: "offer", label: "Partnership" },
  { value: "information", label: "Other" },
];

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (800) 555-7890",
    sub: "Mon–Sat, 9 AM – 7 PM",
    href: "tel:+18005557890",
    ocid: "contact-phone",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@proplistify.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@proplistify.com",
    ocid: "contact-email",
  },
  {
    icon: MapPin,
    title: "Our Office",
    detail: "350 Fifth Avenue, Suite 4200",
    sub: "New York, NY 10118",
    href: undefined,
    ocid: "contact-address",
  },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submitLead = useSubmitLead();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: { subject: "general" },
    mode: "onBlur",
  });

  const subject = watch("subject");

  useEffect(() => {
    setPageMeta(
      "Contact Us | PropListify Real Estate",
      "Get in touch with PropListify for property inquiries, viewings, and information",
      undefined,
      window.location.href,
    );
    generateBreadcrumbJsonLD([
      { label: "Home", href: "/" },
      { label: "Contact" },
    ]);
  }, []);

  async function onSubmit(data: ContactFormValues) {
    const input: SubmitLeadInput = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      inquiryType: data.subject,
      ...(data.propertyTitle ? { propertyTitle: data.propertyTitle } : {}),
    };
    try {
      await submitLead.mutateAsync(input);
      setSubmitted(true);
    } catch {
      // error surfaced via toast in mutation hook
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-card border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-center"
          >
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              Get In Touch
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              We are here to help you find your perfect property. Our expert
              team responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="bg-muted/40 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CONTACT_INFO.map(
              ({ icon: Icon, title, detail, sub, href, ocid }, i) => (
                <motion.div
                  key={ocid}
                  data-ocid={ocid}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 bg-card rounded-xl p-6 shadow-card border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {title}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-foreground text-sm font-medium mt-0.5 hover:text-accent transition-colors block"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p className="text-foreground text-sm font-medium mt-0.5">
                        {detail}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {sub}
                    </p>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {submitted ? (
            <motion.div
              data-ocid="contact-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Message Sent!
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Thank you! We will be in touch shortly. Our team typically
                responds within one business day.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Fill in the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form
                data-ocid="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      data-ocid="contact-name-input"
                      autoComplete="name"
                      inputMode="text"
                      placeholder="Jane Smith"
                      aria-invalid={!!errors.name}
                      className={errors.name ? "border-destructive" : ""}
                      {...register("name", {
                        required: "Full name is required",
                        onBlur: () => trigger("name"),
                      })}
                    />
                    {errors.name && (
                      <p
                        className="text-xs text-destructive"
                        role="alert"
                        aria-live="polite"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      data-ocid="contact-email-input"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="jane@example.com"
                      aria-invalid={!!errors.email}
                      className={errors.email ? "border-destructive" : ""}
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                        onBlur: () => trigger("email"),
                      })}
                    />
                    {errors.email && (
                      <p
                        className="text-xs text-destructive"
                        role="alert"
                        aria-live="polite"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      data-ocid="contact-phone-input"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+1 (555) 000-0000"
                      {...register("phone")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={subject}
                      onValueChange={(v) =>
                        setValue("subject", v as InquiryType)
                      }
                    >
                      <SelectTrigger
                        id="contact-subject"
                        data-ocid="contact-subject-select"
                      >
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Property Name (optional) */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-property">
                    Property Name{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="contact-property"
                    data-ocid="contact-property-input"
                    inputMode="text"
                    placeholder="e.g. Luxury Penthouse with Downtown Views"
                    {...register("propertyTitle")}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact-message-input"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    aria-invalid={!!errors.message}
                    className={errors.message ? "border-destructive" : ""}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      onBlur: () => trigger("message"),
                    })}
                  />
                  {errors.message && (
                    <p
                      className="text-xs text-destructive"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  data-ocid="contact-submit-btn"
                  disabled={submitLead.isPending}
                  className="w-full h-12 bg-accent text-accent-foreground hover:opacity-90 font-semibold text-base transition-smooth"
                >
                  {submitLead.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Message…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to be contacted by our team
                  regarding your inquiry. We respect your privacy.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
