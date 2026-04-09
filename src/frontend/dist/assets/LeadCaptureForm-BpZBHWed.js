import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-BANSdmlz.js";
import { I as Input } from "./index-HwEbhaYB.js";
import { L as Label } from "./label-BfJvJEcg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LDE1YHN9.js";
import { u as useForm, T as Textarea } from "./index.esm-wPuANXr6.js";
import { u as useSubmitLead } from "./use-leads-Cuyfap6z.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { C as CircleCheckBig } from "./circle-check-big-ClO8OrA9.js";
import { L as LoaderCircle } from "./loader-circle-DmH7jCmO.js";
function LeadCaptureForm({
  propertyId,
  propertyTitle,
  className,
  onSuccess
}) {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const submitLead = useSubmitLead();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { inquiryType: "information" }
  });
  const inquiryType = watch("inquiryType");
  async function onSubmit(data) {
    const input = {
      ...data,
      ...propertyId ? { propertyId } : {},
      ...propertyTitle ? { propertyTitle } : {}
    };
    try {
      await submitLead.mutateAsync(input);
      setSubmitted(true);
      onSuccess == null ? void 0 : onSuccess();
      ue.success("Thank you! We'll be in touch shortly.");
    } catch {
      ue.error("Failed to send inquiry. Please try again.");
    }
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Inquiry Sent!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Our team will review your inquiry and get back to you within 24 hours." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "form",
    {
      "data-ocid": "lead-capture-form",
      onSubmit: handleSubmit(onSubmit),
      className,
      noValidate: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-name", children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lead-name",
                "data-ocid": "lead-name-input",
                placeholder: "Jane Smith",
                ...register("name", { required: "Name is required" }),
                "aria-invalid": !!errors.name,
                className: errors.name ? "border-destructive" : ""
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-email", children: "Email Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lead-email",
                type: "email",
                "data-ocid": "lead-email-input",
                placeholder: "jane@example.com",
                ...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email"
                  }
                }),
                "aria-invalid": !!errors.email,
                className: errors.email ? "border-destructive" : ""
              }
            ),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email.message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-phone", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lead-phone",
                type: "tel",
                "data-ocid": "lead-phone-input",
                placeholder: "+1 (555) 000-0000",
                ...register("phone")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-inquiry-type", children: "Inquiry Type *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: inquiryType,
                onValueChange: (v) => setValue("inquiryType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "lead-inquiry-type",
                      "data-ocid": "lead-inquiry-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "information", children: "Request Information" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewingRequest", children: "Schedule Viewing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "offer", children: "Make an Offer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: "General Inquiry" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-message", children: "Message *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "lead-message",
              "data-ocid": "lead-message-input",
              placeholder: "Tell us what you're looking for...",
              rows: 4,
              ...register("message", { required: "Message is required" }),
              "aria-invalid": !!errors.message,
              className: errors.message ? "border-destructive" : ""
            }
          ),
          errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.message.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "lead-submit-btn",
            disabled: submitLead.isPending,
            className: "w-full bg-accent text-accent-foreground hover:opacity-90 font-semibold h-11",
            children: submitLead.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Sending..."
            ] }) : "Send Inquiry"
          }
        )
      ] })
    }
  );
}
export {
  LeadCaptureForm as L
};
