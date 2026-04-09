import { Badge, PropertyBadge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteProperty,
  useProperties,
  useUpdateProperty,
} from "@/hooks/use-properties";
import { formatPrice } from "@/lib/format";
import { setPageMeta } from "@/seo";
import type { PropertyType } from "@/types";
import { Link } from "@tanstack/react-router";
import { Eye, Pencil, Plus, Search, Star, StarOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminPropertiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const { data, isLoading } = useProperties({ limit: 100 });
  const deleteProperty = useDeleteProperty();
  const updateProperty = useUpdateProperty();

  useEffect(() => {
    setPageMeta("Properties — Admin", "Manage your real estate listings.");
  }, []);

  const filtered = (data?.properties ?? []).filter((p) => {
    const matchesSearch =
      !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.propertyType === typeFilter;
    return matchesSearch && matchesType;
  });

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProperty.mutateAsync(deleteTarget.id);
      toast.success("Property deleted.");
    } catch {
      toast.error("Failed to delete property.");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function toggleFeatured(id: string, current: boolean) {
    try {
      await updateProperty.mutateAsync({ id, isFeatured: !current });
      toast.success(current ? "Removed from featured." : "Marked as featured.");
    } catch {
      toast.error("Failed to update property.");
    }
  }

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full space-y-4">
            <h3 className="font-semibold text-foreground">Delete Property</h3>
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
                disabled={deleteProperty.isPending}
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
            Properties
          </h1>
          <p className="text-sm text-muted-foreground">
            {data?.total ?? 0} listings total
          </p>
        </div>
        <Link to="/admin/properties/new">
          <Button
            data-ocid="new-property-btn"
            className="bg-accent text-accent-foreground hover:opacity-90 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="property-search"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as PropertyType | "all")}
        >
          <SelectTrigger
            data-ocid="property-type-filter"
            className="w-full sm:w-44"
          >
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rental">Rental</SelectItem>
            <SelectItem value="resale">Resale</SelectItem>
            <SelectItem value="newProject">New Project</SelectItem>
            <SelectItem value="plotLand">Plot / Land</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((k) => (
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
                      Property
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Price
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
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      data-ocid="property-row"
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              p.heroImage || "/assets/images/placeholder.svg"
                            }
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium text-foreground truncate max-w-[200px]">
                                {p.title}
                              </p>
                              {p.isFeatured && (
                                <Star className="w-3 h-3 text-accent fill-accent shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {p.city}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <PropertyBadge type={p.propertyType} />
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {formatPrice(p.price, p.propertyType === "rental")}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            p.status === "active"
                              ? "success"
                              : p.status === "sold"
                                ? "destructive"
                                : "muted"
                          }
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title={
                              p.isFeatured
                                ? "Remove from featured"
                                : "Mark as featured"
                            }
                            className={`w-8 h-8 ${p.isFeatured ? "text-accent" : "text-muted-foreground"}`}
                            onClick={() => toggleFeatured(p.id, p.isFeatured)}
                          >
                            {p.isFeatured ? (
                              <Star className="w-4 h-4 fill-accent" />
                            ) : (
                              <StarOff className="w-4 h-4" />
                            )}
                          </Button>
                          <Link
                            to="/properties/$slug"
                            params={{ slug: p.slug }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View"
                              className="w-8 h-8"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link
                            to="/admin/properties/$id/edit"
                            params={{ id: p.id }}
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
                              setDeleteTarget({ id: p.id, title: p.title })
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

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-border">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  data-ocid="property-row-mobile"
                  className="p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={p.heroImage || "/assets/images/placeholder.svg"}
                      alt={p.title}
                      className="w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="font-medium text-foreground truncate">
                          {p.title}
                        </p>
                        {p.isFeatured && (
                          <Star className="w-3 h-3 text-accent fill-accent shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {p.city}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <PropertyBadge type={p.propertyType} />
                        <Badge
                          variant={
                            p.status === "active"
                              ? "success"
                              : p.status === "sold"
                                ? "destructive"
                                : "muted"
                          }
                        >
                          {p.status}
                        </Badge>
                        <span className="text-xs font-medium text-foreground">
                          {formatPrice(p.price, p.propertyType === "rental")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => toggleFeatured(p.id, p.isFeatured)}
                    >
                      {p.isFeatured ? (
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      ) : (
                        <StarOff className="w-3.5 h-3.5" />
                      )}
                      {p.isFeatured ? "Unfeature" : "Feature"}
                    </Button>
                    <Link to="/admin/properties/$id/edit" params={{ id: p.id }}>
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
                        setDeleteTarget({ id: p.id, title: p.title })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm mb-4">
                  {search || typeFilter !== "all"
                    ? "No properties match your filters."
                    : "No properties yet."}
                </p>
                {!search && typeFilter === "all" && (
                  <Link to="/admin/properties/new">
                    <Button className="bg-accent text-accent-foreground hover:opacity-90 gap-2">
                      <Plus className="w-4 h-4" />
                      Add Your First Property
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
