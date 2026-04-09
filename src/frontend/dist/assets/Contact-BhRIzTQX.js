import { r as reactExports, j as jsxRuntimeExports, P as Phone, t as Mail, M as MapPin, B as Button } from "./index-BANSdmlz.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CVN5wbw-.js";
import { I as Input } from "./index-HwEbhaYB.js";
import { L as Label } from "./label-BfJvJEcg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LDE1YHN9.js";
import { u as useForm, T as Textarea } from "./index.esm-wPuANXr6.js";
import { u as useSubmitLead } from "./use-leads-Cuyfap6z.js";
import { s as setPageMeta, g as generateBreadcrumbJsonLD } from "./seo-CK-m768L.js";
import { m as motion } from "./proxy-Clkm2goj.js";
import { C as CircleCheckBig } from "./circle-check-big-ClO8OrA9.js";
import { L as LoaderCircle } from "./loader-circle-DmH7jCmO.js";
import "./chevron-up-Dey2yvMM.js";
import "./useMutation-B9otopnZ.js";
const SUBJECT_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "viewingRequest", label: "Property Viewing" },
  { value: "offer", label: "Partnership" },
  { value: "information", label: "Other" }
];
const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (800) 555-7890",
    sub: "Mon–Sat, 9 AM – 7 PM",
    href: "tel:+18005557890",
    ocid: "contact-phone"
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@proplistify.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@proplistify.com",
    ocid: "contact-email"
  },
  {
    icon: MapPin,
    title: "Our Office",
    detail: "350 Fifth Avenue, Suite 4200",
    sub: "New York, NY 10118",
    href: void 0,
    ocid: "contact-address"
  }
];
function ContactPage() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const submitLead = useSubmitLead();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: { subject: "general" },
    mode: "onBlur"
  });
  const subject = watch("subject");
  reactExports.useEffect(() => {
    setPageMeta(
      "Contact Us | PropListify Real Estate",
      "Get in touch with PropListify for property inquiries, viewings, and information",
      void 0,
      window.location.href
    );
    generateBreadcrumbJsonLD([
      { label: "Home", href: "/" },
      { label: "Contact" }
    ]);
  }, []);
  async function onSubmit(data) {
    const input = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      inquiryType: data.subject,
      ...data.propertyTitle ? { propertyTitle: data.propertyTitle } : {}
    };
    try {
      await submitLead.mutateAsync(input);
      setSubmitted(true);
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{ label: "Contact" }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mt-6 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight", children: "Get In Touch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto", children: "We are here to help you find your perfect property. Our expert team responds within 24 hours." })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: CONTACT_INFO.map(
      ({ icon: Icon, title, detail, sub, href, ocid }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": ocid,
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "flex flex-col items-center text-center gap-3 bg-card rounded-xl p-6 shadow-card border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: title }),
              href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href,
                  className: "text-foreground text-sm font-medium mt-0.5 hover:text-accent transition-colors block",
                  children: detail
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-medium mt-0.5", children: detail }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
            ] })
          ]
        },
        ocid
      )
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "contact-success",
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Message Sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Thank you! We will be in touch shortly. Our team typically responds within one business day." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "mt-2",
              onClick: () => setSubmitted(false),
              children: "Send Another Message"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Send Us a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Fill in the form below and we'll get back to you as soon as possible." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              "data-ocid": "contact-form",
              onSubmit: handleSubmit(onSubmit),
              noValidate: true,
              className: "space-y-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-name", children: [
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-name",
                        "data-ocid": "contact-name-input",
                        autoComplete: "name",
                        inputMode: "text",
                        placeholder: "Jane Smith",
                        "aria-invalid": !!errors.name,
                        className: errors.name ? "border-destructive" : "",
                        ...register("name", {
                          required: "Full name is required",
                          onBlur: () => trigger("name")
                        })
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        role: "alert",
                        "aria-live": "polite",
                        children: errors.name.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-email", children: [
                      "Email Address ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-email",
                        type: "email",
                        "data-ocid": "contact-email-input",
                        autoComplete: "email",
                        inputMode: "email",
                        placeholder: "jane@example.com",
                        "aria-invalid": !!errors.email,
                        className: errors.email ? "border-destructive" : "",
                        ...register("email", {
                          required: "Email address is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                          },
                          onBlur: () => trigger("email")
                        })
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        role: "alert",
                        "aria-live": "polite",
                        children: errors.email.message
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-phone", children: "Phone Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-phone",
                        type: "tel",
                        "data-ocid": "contact-phone-input",
                        autoComplete: "tel",
                        inputMode: "tel",
                        placeholder: "+1 (555) 000-0000",
                        ...register("phone")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-subject", children: [
                      "Subject ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: subject,
                        onValueChange: (v) => setValue("subject", v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              id: "contact-subject",
                              "data-ocid": "contact-subject-select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a subject" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-property", children: [
                    "Property Name",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "contact-property",
                      "data-ocid": "contact-property-input",
                      inputMode: "text",
                      placeholder: "e.g. Luxury Penthouse with Downtown Views",
                      ...register("propertyTitle")
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-message", children: [
                    "Message ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "contact-message",
                      "data-ocid": "contact-message-input",
                      rows: 5,
                      placeholder: "Tell us how we can help you...",
                      "aria-invalid": !!errors.message,
                      className: errors.message ? "border-destructive" : "",
                      ...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters"
                        },
                        onBlur: () => trigger("message")
                      })
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      role: "alert",
                      "aria-live": "polite",
                      children: errors.message.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    "data-ocid": "contact-submit-btn",
                    disabled: submitLead.isPending,
                    className: "w-full h-12 bg-accent text-accent-foreground hover:opacity-90 font-semibold text-base transition-smooth",
                    children: submitLead.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                      "Sending Message…"
                    ] }) : "Send Message"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "By submitting this form, you agree to be contacted by our team regarding your inquiry. We respect your privacy." })
              ]
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  ContactPage
};
