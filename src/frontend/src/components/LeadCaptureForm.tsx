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
import type { InquiryType, SubmitLeadInput } from "@/types";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LeadCaptureFormProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: InquiryType;
}

export function LeadCaptureForm({
  propertyId,
  propertyTitle,
  className,
  onSuccess,
}: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const submitLead = useSubmitLead();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { inquiryType: "information" },
  });

  const inquiryType = watch("inquiryType");

  async function onSubmit(data: FormValues) {
    const input: SubmitLeadInput = {
      ...data,
      ...(propertyId ? { propertyId } : {}),
      ...(propertyTitle ? { propertyTitle } : {}),
    };
    try {
      await submitLead.mutateAsync(input);
      setSubmitted(true);
      onSuccess?.();
      toast.success("Thank you! We'll be in touch shortly.");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CheckCircle className="w-12 h-12 text-accent" />
        <h3 className="font-display font-semibold text-foreground text-lg">
          Inquiry Sent!
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Our team will review your inquiry and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      data-ocid="lead-capture-form"
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      noValidate
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="lead-name">Full Name *</Label>
            <Input
              id="lead-name"
              data-ocid="lead-name-input"
              placeholder="Jane Smith"
              {...register("name", { required: "Name is required" })}
              aria-invalid={!!errors.name}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lead-email">Email Address *</Label>
            <Input
              id="lead-email"
              type="email"
              data-ocid="lead-email-input"
              placeholder="jane@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              aria-invalid={!!errors.email}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="lead-phone">Phone Number</Label>
            <Input
              id="lead-phone"
              type="tel"
              data-ocid="lead-phone-input"
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lead-inquiry-type">Inquiry Type *</Label>
            <Select
              value={inquiryType}
              onValueChange={(v) => setValue("inquiryType", v as InquiryType)}
            >
              <SelectTrigger
                id="lead-inquiry-type"
                data-ocid="lead-inquiry-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="information">Request Information</SelectItem>
                <SelectItem value="viewingRequest">Schedule Viewing</SelectItem>
                <SelectItem value="offer">Make an Offer</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="lead-message">Message *</Label>
          <Textarea
            id="lead-message"
            data-ocid="lead-message-input"
            placeholder="Tell us what you're looking for..."
            rows={4}
            {...register("message", { required: "Message is required" })}
            aria-invalid={!!errors.message}
            className={errors.message ? "border-destructive" : ""}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          data-ocid="lead-submit-btn"
          disabled={submitLead.isPending}
          className="w-full bg-accent text-accent-foreground hover:opacity-90 font-semibold h-11"
        >
          {submitLead.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
