import { u as useNavigate, q as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button } from "./index-BANSdmlz.js";
import { I as ImageUploadField, S as Switch } from "./switch-Dk12kx_A.js";
import { I as Input } from "./index-HwEbhaYB.js";
import { L as Label } from "./label-BfJvJEcg.js";
import { u as useForm, T as Textarea, C as Controller } from "./index.esm-wPuANXr6.js";
import { f as useArticle, g as useCreateArticle, e as useUpdateArticle } from "./use-articles-ATTiTLYq.js";
import { s as slugify } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { A as ArrowLeft } from "./arrow-left-DJWRKDae.js";
import { L as LoaderCircle } from "./loader-circle-DmH7jCmO.js";
import "./useMutation-B9otopnZ.js";
const META_DESC_MAX = 160;
function AdminArticleFormPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const isEditing = !!id;
  const [slugEdited, setSlugEdited] = reactExports.useState(false);
  const { data: existingArticle } = useArticle(id ?? "");
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    defaultValues: { isPublished: true, author: "", featuredImage: "" }
  });
  const titleValue = watch("title");
  const metaDescValue = watch("metaDescription") ?? "";
  reactExports.useEffect(() => {
    if (!slugEdited && titleValue) {
      setValue("slug", slugify(titleValue));
    }
  }, [titleValue, slugEdited, setValue]);
  reactExports.useEffect(() => {
    setPageMeta(isEditing ? "Edit Article — Admin" : "New Article — Admin", "");
  }, [isEditing]);
  reactExports.useEffect(() => {
    if (existingArticle && isEditing) {
      for (const [key, value] of Object.entries(existingArticle)) {
        if (key !== "id" && key !== "publishedAt" && key !== "updatedAt") {
          setValue(key, value);
        }
      }
      setSlugEdited(true);
    }
  }, [existingArticle, isEditing, setValue]);
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
        await updateArticle.mutateAsync({ id, ...rest });
        ue.success("Article updated.");
      } else {
        await createArticle.mutateAsync(rest);
        ue.success("Article published.");
      }
      await navigate({ to: "/admin/articles" });
    } catch {
      ue.error("Failed to save article.");
    }
  }
  const metaOverLimit = metaDescValue.length > META_DESC_MAX;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: isEditing ? "Edit Article" : "New Article" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Write and publish market insights." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        "data-ocid": "article-form",
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Article Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "a-title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "a-title",
                  "data-ocid": "article-title",
                  ...register("title", { required: "Title is required" }),
                  placeholder: "e.g. Top 10 Investment Neighborhoods in 2025",
                  className: errors.title ? "border-destructive" : ""
                }
              ),
              errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.title.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "a-slug", children: [
                "URL Slug",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1.5 text-xs", children: "(auto-generated, editable)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "a-slug",
                  ...register("slug"),
                  placeholder: "my-article-slug",
                  onChange: (e) => {
                    setSlugEdited(true);
                    setValue("slug", e.target.value);
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "/blog/",
                watch("slug") || "your-slug"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "a-meta", children: "Meta Description *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-xs font-mono ${metaOverLimit ? "text-destructive" : "text-muted-foreground"}`,
                    children: [
                      metaDescValue.length,
                      "/",
                      META_DESC_MAX
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "a-meta",
                  rows: 2,
                  ...register("metaDescription", {
                    required: "Meta description is required",
                    maxLength: {
                      value: META_DESC_MAX,
                      message: `Keep it under ${META_DESC_MAX} characters`
                    }
                  }),
                  placeholder: "A concise description for search engines (150-160 chars)...",
                  className: errors.metaDescription || metaOverLimit ? "border-destructive" : ""
                }
              ),
              errors.metaDescription && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.metaDescription.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "a-author", children: "Author *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "a-author",
                  ...register("author", { required: "Author is required" }),
                  placeholder: "e.g. Sarah Mitchell",
                  className: errors.author ? "border-destructive" : ""
                }
              ),
              errors.author && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.author.message })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "a-content", children: "Article Content *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Supports Markdown: # H1, ## H2, **bold**, *italic*, - list items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "a-content",
                  "data-ocid": "article-content",
                  rows: 18,
                  ...register("content", { required: "Content is required" }),
                  placeholder: "# Article Heading\n## Section Heading\nYour content here...",
                  className: `font-mono text-sm resize-y ${errors.content ? "border-destructive" : ""}`
                }
              ),
              errors.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.content.message })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Featured Image & Publishing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Controller,
              {
                name: "featuredImage",
                control,
                render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ImageUploadField,
                  {
                    label: "Featured Image",
                    value: field.value,
                    onChange: field.onChange
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Controller,
                {
                  name: "isPublished",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: "a-publish",
                      "data-ocid": "article-publish-toggle",
                      checked: field.value,
                      onCheckedChange: field.onChange
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "a-publish", className: "cursor-pointer", children: "Publish immediately" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", children: "Cancel" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                "data-ocid": "article-submit-btn",
                disabled: isSubmitting,
                className: "bg-accent text-accent-foreground hover:opacity-90 gap-2",
                children: [
                  isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  isEditing ? "Update Article" : "Publish Article"
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
  AdminArticleFormPage
};
