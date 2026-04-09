import { u as useNavigate, q as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, p as Separator, X } from "./index-BANSdmlz.js";
import { S as Switch, I as ImageUploadField, M as MultiImageUpload } from "./switch-Dk12kx_A.js";
import { I as Input } from "./index-HwEbhaYB.js";
import { L as Label } from "./label-BfJvJEcg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LDE1YHN9.js";
import { u as useForm, C as Controller, T as Textarea } from "./index.esm-wPuANXr6.js";
import { e as useProperty, f as useCreateProperty, d as useUpdateProperty } from "./use-properties-BY35R6ki.js";
import { s as slugify } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { A as ArrowLeft } from "./arrow-left-DJWRKDae.js";
import { L as LoaderCircle } from "./loader-circle-DmH7jCmO.js";
import "./chevron-up-Dey2yvMM.js";
import "./useMutation-B9otopnZ.js";
function AmenitiesTagInput({
  value,
  onChange
}) {
  const [input, setInput] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  function addTag() {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  }
  function removeTag(idx) {
    onChange(value.filter((_, i) => i !== idx));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "fieldset",
    {
      className: "min-h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex flex-wrap gap-1.5 cursor-text focus-within:ring-2 focus-within:ring-ring",
      onClick: () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      onKeyDown: () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      "aria-label": "Amenities tags",
      children: [
        value.map((tag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1 bg-accent/10 text-accent border border-accent/20 text-xs font-medium px-2 py-0.5 rounded-full",
            children: [
              tag,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeTag(idx),
                  "aria-label": `Remove ${tag}`,
                  className: "hover:text-destructive transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ]
          },
          tag
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addTag();
              }
              if (e.key === "Backspace" && !input && value.length > 0) {
                onChange(value.slice(0, -1));
              }
            },
            onBlur: addTag,
            placeholder: value.length === 0 ? "Type and press Enter to add amenity..." : "",
            className: "flex-1 min-w-[160px] bg-transparent outline-none text-sm placeholder:text-muted-foreground",
            "aria-label": "Add amenity"
          }
        )
      ]
    }
  );
}
function AdminPropertyFormPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const isEditing = !!id;
  const [slugEdited, setSlugEdited] = reactExports.useState(false);
  const { data: existingProperty } = useProperty(id ?? "");
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    defaultValues: {
      propertyType: "sale",
      status: "active",
      isFeatured: false,
      bedrooms: 2,
      bathrooms: 2,
      areaSqft: 1e3,
      price: 5e5,
      heroImage: "",
      galleryImages: [],
      amenities: [],
      floorplans: []
    }
  });
  const titleValue = watch("title");
  reactExports.useEffect(() => {
    if (!slugEdited && titleValue) {
      setValue("slug", slugify(titleValue));
    }
  }, [titleValue, slugEdited, setValue]);
  reactExports.useEffect(() => {
    setPageMeta(
      isEditing ? "Edit Property — Admin" : "New Property — Admin",
      ""
    );
  }, [isEditing]);
  reactExports.useEffect(() => {
    if (existingProperty && isEditing) {
      for (const [key, value] of Object.entries(existingProperty)) {
        if (key !== "id" && key !== "createdAt" && key !== "updatedAt") {
          setValue(key, value);
        }
      }
      setSlugEdited(true);
    }
  }, [existingProperty, isEditing, setValue]);
  reactExports.useEffect(() => {
    function handleBeforeUnload(e) {
      if (isDirty) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);
  async function onSubmit(data) {
    const { slug: _slug, ...rest } = data;
    try {
      if (isEditing && id) {
        await updateProperty.mutateAsync({ id, ...rest });
        ue.success("Property updated successfully.");
      } else {
        await createProperty.mutateAsync(rest);
        ue.success("Property created successfully.");
      }
      await navigate({ to: "/admin/properties" });
    } catch {
      ue.error("Failed to save property. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: isEditing ? "Edit Property" : "New Property" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Fill in the details to ",
          isEditing ? "update" : "list",
          " the property."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        "data-ocid": "property-form",
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Basic Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "p-title",
                  "data-ocid": "property-title",
                  ...register("title", { required: "Title is required" }),
                  placeholder: "e.g. Luxury Penthouse Downtown",
                  className: errors.title ? "border-destructive" : ""
                }
              ),
              errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.title.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "p-slug", children: [
                "URL Slug",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1.5 text-xs", children: "(auto-generated from title, editable)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "p-slug",
                  ...register("slug"),
                  placeholder: "my-property-slug",
                  onChange: (e) => {
                    setSlugEdited(true);
                    setValue("slug", e.target.value);
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "/properties/",
                watch("slug") || "your-slug"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-type", children: "Property Type *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "propertyType",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: field.value,
                        onValueChange: (v) => field.onChange(v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "p-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sale", children: "For Sale" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rental", children: "Rental" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "resale", children: "Resale" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newProject", children: "New Project" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "plotLand", children: "Plot / Land" })
                          ] })
                        ]
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-status", children: "Status *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Controller,
                  {
                    name: "status",
                    control,
                    render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: field.value,
                        onValueChange: (v) => field.onChange(v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "p-status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sold", children: "Sold" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" })
                          ] })
                        ]
                      }
                    )
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-desc", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "p-desc",
                  rows: 3,
                  ...register("description", {
                    required: "Description is required"
                  }),
                  placeholder: "A brief description of the property...",
                  className: errors.description ? "border-destructive" : ""
                }
              ),
              errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.description.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-overview", children: "Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "p-overview",
                  rows: 4,
                  ...register("overview"),
                  placeholder: "Detailed overview of the property, neighborhood, and unique features..."
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Location & Pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-addr", children: "Address *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "p-addr",
                    "data-ocid": "property-address",
                    ...register("address", { required: true }),
                    placeholder: "Street address"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-city", children: "City *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "p-city",
                    ...register("city", { required: true }),
                    placeholder: "e.g. New York"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-price", children: "Price (USD) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "p-price",
                  "data-ocid": "property-price",
                  type: "number",
                  ...register("price", {
                    required: true,
                    min: 0,
                    valueAsNumber: true
                  }),
                  placeholder: "500000"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Property Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-beds", children: "Bedrooms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "p-beds",
                    type: "number",
                    min: 0,
                    ...register("bedrooms", { valueAsNumber: true })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-baths", children: "Bathrooms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "p-baths",
                    type: "number",
                    min: 0,
                    ...register("bathrooms", { valueAsNumber: true })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-area", children: "Area (sqft)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "p-area",
                    type: "number",
                    min: 0,
                    ...register("areaSqft", { valueAsNumber: true })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amenities" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Type an amenity and press Enter or comma to add it." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Controller,
                {
                  name: "amenities",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AmenitiesTagInput,
                    {
                      value: field.value,
                      onChange: field.onChange
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Controller,
                {
                  name: "isFeatured",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: "p-featured",
                      checked: field.value,
                      onCheckedChange: field.onChange
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-featured", className: "cursor-pointer", children: "Feature this property on the homepage" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Controller,
              {
                name: "heroImage",
                control,
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ImageUploadField,
                  {
                    label: "Hero Image *",
                    value: field.value,
                    onChange: field.onChange
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Controller,
              {
                name: "galleryImages",
                control,
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MultiImageUpload,
                  {
                    label: "Gallery Images",
                    values: field.value,
                    onChange: field.onChange,
                    maxImages: 10
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Controller,
              {
                name: "floorplans",
                control,
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MultiImageUpload,
                  {
                    label: "Floor Plans",
                    values: field.value,
                    onChange: field.onChange,
                    maxImages: 5
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", children: "Cancel" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                "data-ocid": "property-submit-btn",
                disabled: isSubmitting,
                className: "bg-accent text-accent-foreground hover:opacity-90 gap-2",
                children: [
                  isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  isEditing ? "Update Property" : "Publish Property"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminPropertyFormPage
};
