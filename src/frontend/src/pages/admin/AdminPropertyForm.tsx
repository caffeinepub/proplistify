import {
  ImageUploadField,
  MultiImageUpload,
} from "@/components/ImageUploadField";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProperty,
  useProperty,
  useUpdateProperty,
} from "@/hooks/use-properties";
import { slugify } from "@/lib/format";
import { setPageMeta } from "@/seo";
import type {
  CreatePropertyInput,
  PropertyStatus,
  PropertyType,
} from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

function AmenitiesTagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addTag() {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  }

  function removeTag(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <fieldset
      className="min-h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex flex-wrap gap-1.5 cursor-text focus-within:ring-2 focus-within:ring-ring"
      onClick={() => inputRef.current?.focus()}
      onKeyDown={() => inputRef.current?.focus()}
      aria-label="Amenities tags"
    >
      {value.map((tag, idx) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-accent/10 text-accent border border-accent/20 text-xs font-medium px-2 py-0.5 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(idx)}
            aria-label={`Remove ${tag}`}
            className="hover:text-destructive transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
          if (e.key === "Backspace" && !input && value.length > 0) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={addTag}
        placeholder={
          value.length === 0 ? "Type and press Enter to add amenity..." : ""
        }
        className="flex-1 min-w-[160px] bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        aria-label="Add amenity"
      />
    </fieldset>
  );
}

export function AdminPropertyFormPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false }) as { id?: string };
  const isEditing = !!id;
  const [slugEdited, setSlugEdited] = useState(false);

  const { data: existingProperty } = useProperty(id ?? "");
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreatePropertyInput & { slug?: string }>({
    defaultValues: {
      propertyType: "sale",
      status: "active",
      isFeatured: false,
      bedrooms: 2,
      bathrooms: 2,
      areaSqft: 1000,
      price: 500000,
      heroImage: "",
      galleryImages: [],
      amenities: [],
      floorplans: [],
    },
  });

  const titleValue = watch("title");

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && titleValue) {
      setValue("slug", slugify(titleValue));
    }
  }, [titleValue, slugEdited, setValue]);

  useEffect(() => {
    setPageMeta(
      isEditing ? "Edit Property — Admin" : "New Property — Admin",
      "",
    );
  }, [isEditing]);

  useEffect(() => {
    if (existingProperty && isEditing) {
      for (const [key, value] of Object.entries(existingProperty)) {
        if (key !== "id" && key !== "createdAt" && key !== "updatedAt") {
          setValue(key as keyof CreatePropertyInput, value as never);
        }
      }
      setSlugEdited(true);
    }
  }, [existingProperty, isEditing, setValue]);

  // Warn on unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  async function onSubmit(data: CreatePropertyInput & { slug?: string }) {
    const { slug: _slug, ...rest } = data;
    try {
      if (isEditing && id) {
        await updateProperty.mutateAsync({ id, ...rest });
        toast.success("Property updated successfully.");
      } else {
        await createProperty.mutateAsync(rest);
        toast.success("Property created successfully.");
      }
      await navigate({ to: "/admin/properties" });
    } catch {
      toast.error("Failed to save property. Please try again.");
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/properties">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {isEditing ? "Edit Property" : "New Property"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details to {isEditing ? "update" : "list"} the property.
          </p>
        </div>
      </div>

      <form
        data-ocid="property-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Basic info */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Basic Information</h2>

          <div className="space-y-1.5">
            <Label htmlFor="p-title">Title *</Label>
            <Input
              id="p-title"
              data-ocid="property-title"
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Luxury Penthouse Downtown"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-slug">
              URL Slug
              <span className="text-muted-foreground font-normal ml-1.5 text-xs">
                (auto-generated from title, editable)
              </span>
            </Label>
            <Input
              id="p-slug"
              {...register("slug")}
              placeholder="my-property-slug"
              onChange={(e) => {
                setSlugEdited(true);
                setValue("slug", e.target.value);
              }}
            />
            <p className="text-xs text-muted-foreground">
              /properties/{watch("slug") || "your-slug"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-type">Property Type *</Label>
              <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v as PropertyType)}
                  >
                    <SelectTrigger id="p-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rental">Rental</SelectItem>
                      <SelectItem value="resale">Resale</SelectItem>
                      <SelectItem value="newProject">New Project</SelectItem>
                      <SelectItem value="plotLand">Plot / Land</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-status">Status *</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v as PropertyStatus)}
                  >
                    <SelectTrigger id="p-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-desc">Description *</Label>
            <Textarea
              id="p-desc"
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="A brief description of the property..."
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="p-overview">Overview</Label>
            <Textarea
              id="p-overview"
              rows={4}
              {...register("overview")}
              placeholder="Detailed overview of the property, neighborhood, and unique features..."
            />
          </div>
        </div>

        {/* Location & price */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Location & Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-addr">Address *</Label>
              <Input
                id="p-addr"
                data-ocid="property-address"
                {...register("address", { required: true })}
                placeholder="Street address"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-city">City *</Label>
              <Input
                id="p-city"
                {...register("city", { required: true })}
                placeholder="e.g. New York"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-price">Price (USD) *</Label>
            <Input
              id="p-price"
              data-ocid="property-price"
              type="number"
              {...register("price", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
              placeholder="500000"
            />
          </div>
        </div>

        {/* Property details */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Property Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-beds">Bedrooms</Label>
              <Input
                id="p-beds"
                type="number"
                min={0}
                {...register("bedrooms", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-baths">Bathrooms</Label>
              <Input
                id="p-baths"
                type="number"
                min={0}
                {...register("bathrooms", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-area">Area (sqft)</Label>
              <Input
                id="p-area"
                type="number"
                min={0}
                {...register("areaSqft", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Amenities</Label>
            <p className="text-xs text-muted-foreground">
              Type an amenity and press Enter or comma to add it.
            </p>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <AmenitiesTagInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex items-center gap-3">
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <Switch
                  id="p-featured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="p-featured" className="cursor-pointer">
              Feature this property on the homepage
            </Label>
          </div>
        </div>

        {/* Images */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Images</h2>
          <Controller
            name="heroImage"
            control={control}
            render={({ field }) => (
              <ImageUploadField
                label="Hero Image *"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Separator />
          <Controller
            name="galleryImages"
            control={control}
            render={({ field }) => (
              <MultiImageUpload
                label="Gallery Images"
                values={field.value}
                onChange={field.onChange}
                maxImages={10}
              />
            )}
          />
          <Separator />
          <Controller
            name="floorplans"
            control={control}
            render={({ field }) => (
              <MultiImageUpload
                label="Floor Plans"
                values={field.value}
                onChange={field.onChange}
                maxImages={5}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pb-4">
          <Link to="/admin/properties">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            data-ocid="property-submit-btn"
            disabled={isSubmitting}
            className="bg-accent text-accent-foreground hover:opacity-90 gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEditing ? "Update Property" : "Publish Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
