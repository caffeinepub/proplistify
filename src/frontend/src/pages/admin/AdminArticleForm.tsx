import { ImageUploadField } from "@/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useArticle,
  useCreateArticle,
  useUpdateArticle,
} from "@/hooks/use-articles";
import { slugify } from "@/lib/format";
import { setPageMeta } from "@/seo";
import type { CreateArticleInput } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const META_DESC_MAX = 160;

export function AdminArticleFormPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false }) as { id?: string };
  const isEditing = !!id;
  const [slugEdited, setSlugEdited] = useState(false);

  const { data: existingArticle } = useArticle(id ?? "");
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateArticleInput & { slug?: string }>({
    defaultValues: { isPublished: true, author: "", featuredImage: "" },
  });

  const titleValue = watch("title");
  const metaDescValue = watch("metaDescription") ?? "";

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && titleValue) {
      setValue("slug", slugify(titleValue));
    }
  }, [titleValue, slugEdited, setValue]);

  useEffect(() => {
    setPageMeta(isEditing ? "Edit Article — Admin" : "New Article — Admin", "");
  }, [isEditing]);

  useEffect(() => {
    if (existingArticle && isEditing) {
      for (const [key, value] of Object.entries(existingArticle)) {
        if (key !== "id" && key !== "publishedAt" && key !== "updatedAt") {
          setValue(key as keyof CreateArticleInput, value as never);
        }
      }
      setSlugEdited(true);
    }
  }, [existingArticle, isEditing, setValue]);

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

  async function onSubmit(data: CreateArticleInput & { slug?: string }) {
    const { slug: _slug, ...rest } = data;
    try {
      if (isEditing && id) {
        await updateArticle.mutateAsync({ id, ...rest });
        toast.success("Article updated.");
      } else {
        await createArticle.mutateAsync(rest);
        toast.success("Article published.");
      }
      await navigate({ to: "/admin/articles" });
    } catch {
      toast.error("Failed to save article.");
    }
  }

  const metaOverLimit = metaDescValue.length > META_DESC_MAX;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/articles">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {isEditing ? "Edit Article" : "New Article"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Write and publish market insights.
          </p>
        </div>
      </div>

      <form
        data-ocid="article-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Article Details</h2>

          <div className="space-y-1.5">
            <Label htmlFor="a-title">Title *</Label>
            <Input
              id="a-title"
              data-ocid="article-title"
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Top 10 Investment Neighborhoods in 2025"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="a-slug">
              URL Slug
              <span className="text-muted-foreground font-normal ml-1.5 text-xs">
                (auto-generated, editable)
              </span>
            </Label>
            <Input
              id="a-slug"
              {...register("slug")}
              placeholder="my-article-slug"
              onChange={(e) => {
                setSlugEdited(true);
                setValue("slug", e.target.value);
              }}
            />
            <p className="text-xs text-muted-foreground">
              /blog/{watch("slug") || "your-slug"}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="a-meta">Meta Description *</Label>
              <span
                className={`text-xs font-mono ${metaOverLimit ? "text-destructive" : "text-muted-foreground"}`}
              >
                {metaDescValue.length}/{META_DESC_MAX}
              </span>
            </div>
            <Textarea
              id="a-meta"
              rows={2}
              {...register("metaDescription", {
                required: "Meta description is required",
                maxLength: {
                  value: META_DESC_MAX,
                  message: `Keep it under ${META_DESC_MAX} characters`,
                },
              })}
              placeholder="A concise description for search engines (150-160 chars)..."
              className={
                errors.metaDescription || metaOverLimit
                  ? "border-destructive"
                  : ""
              }
            />
            {errors.metaDescription && (
              <p className="text-xs text-destructive">
                {errors.metaDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="a-author">Author *</Label>
            <Input
              id="a-author"
              {...register("author", { required: "Author is required" })}
              placeholder="e.g. Sarah Mitchell"
              className={errors.author ? "border-destructive" : ""}
            />
            {errors.author && (
              <p className="text-xs text-destructive">
                {errors.author.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Content</h2>
          <div className="space-y-1.5">
            <Label htmlFor="a-content">Article Content *</Label>
            <p className="text-xs text-muted-foreground">
              Supports Markdown: # H1, ## H2, **bold**, *italic*, - list items
            </p>
            <Textarea
              id="a-content"
              data-ocid="article-content"
              rows={18}
              {...register("content", { required: "Content is required" })}
              placeholder={
                "# Article Heading\n## Section Heading\nYour content here..."
              }
              className={`font-mono text-sm resize-y ${errors.content ? "border-destructive" : ""}`}
            />
            {errors.content && (
              <p className="text-xs text-destructive">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">
            Featured Image & Publishing
          </h2>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field }) => (
              <ImageUploadField
                label="Featured Image"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className="flex items-center gap-3">
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <Switch
                  id="a-publish"
                  data-ocid="article-publish-toggle"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="a-publish" className="cursor-pointer">
              Publish immediately
            </Label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pb-4">
          <Link to="/admin/articles">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            data-ocid="article-submit-btn"
            disabled={isSubmitting}
            className="bg-accent text-accent-foreground hover:opacity-90 gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEditing ? "Update Article" : "Publish Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}
