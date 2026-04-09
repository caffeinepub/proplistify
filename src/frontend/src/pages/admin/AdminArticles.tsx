import { Badge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllArticles,
  useDeleteArticle,
  useUpdateArticle,
} from "@/hooks/use-articles";
import { formatDate } from "@/lib/format";
import { setPageMeta } from "@/seo";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminArticlesPage() {
  const { data: articles, isLoading } = useAllArticles();
  const deleteArticle = useDeleteArticle();
  const updateArticle = useUpdateArticle();
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    setPageMeta("Articles — Admin", "Manage your blog articles.");
  }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteArticle.mutateAsync(deleteTarget.id);
      toast.success("Article deleted.");
    } catch {
      toast.error("Failed to delete article.");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function togglePublished(id: string, current: boolean) {
    try {
      await updateArticle.mutateAsync({ id, isPublished: !current });
      toast.success(current ? "Article unpublished." : "Article published.");
    } catch {
      toast.error("Failed to update article.");
    }
  }

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full space-y-4">
            <h3 className="font-semibold text-foreground">Delete Article</h3>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{deleteTarget.title}"
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteArticle.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-0.5">
            Articles
          </h1>
          <p className="text-sm text-muted-foreground">
            {articles?.length ?? 0} articles total
          </p>
        </div>
        <Link to="/admin/articles/new">
          <Button
            data-ocid="new-article-btn"
            className="bg-accent text-accent-foreground hover:opacity-90 gap-2"
          >
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-14 w-full" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {articles?.map((a) => (
                    <tr
                      key={a.id}
                      data-ocid="article-row"
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              a.featuredImage ||
                              "/assets/images/placeholder.svg"
                            }
                            alt={a.title}
                            className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                          />
                          <p className="font-medium text-foreground truncate max-w-[220px]">
                            {a.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {a.author}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {formatDate(a.publishedAt)}
                      </td>
                      <td className="px-4 py-3">
                        {a.isPublished ? (
                          <Badge variant="success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="muted">
                            <XCircle className="w-3 h-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title={a.isPublished ? "Unpublish" : "Publish"}
                            className={`w-8 h-8 ${a.isPublished ? "text-emerald-600" : "text-muted-foreground"}`}
                            onClick={() => togglePublished(a.id, a.isPublished)}
                          >
                            {a.isPublished ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </Button>
                          <Link to="/blog/$slug" params={{ slug: a.slug }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View on site"
                              className="w-8 h-8"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link
                            to="/admin/articles/$id/edit"
                            params={{ id: a.id }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit"
                              className="w-8 h-8"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setDeleteTarget({ id: a.id, title: a.title })
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {articles?.map((a) => (
                <div
                  key={a.id}
                  data-ocid="article-row-mobile"
                  className="p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={a.featuredImage || "/assets/images/placeholder.svg"}
                      alt={a.title}
                      className="w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate mb-0.5">
                        {a.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {a.author} · {formatDate(a.publishedAt)}
                      </p>
                      {a.isPublished ? (
                        <Badge variant="success">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="muted">
                          <XCircle className="w-3 h-3 mr-1" />
                          Draft
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => togglePublished(a.id, a.isPublished)}
                    >
                      {a.isPublished ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                      {a.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Link to="/admin/articles/$id/edit" params={{ id: a.id }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1 text-destructive hover:bg-destructive/10"
                      onClick={() =>
                        setDeleteTarget({ id: a.id, title: a.title })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {articles?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm mb-4">
                  No articles yet.
                </p>
                <Link to="/admin/articles/new">
                  <Button className="bg-accent text-accent-foreground hover:opacity-90 gap-2">
                    <Plus className="w-4 h-4" />
                    Write Your First Article
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
