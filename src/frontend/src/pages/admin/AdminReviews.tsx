import { Badge } from "@/components/Badge";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperties } from "@/hooks/use-properties";
import {
  useAllReviews,
  useApproveReview,
  useDeleteReview,
} from "@/hooks/use-reviews";
import { formatDate } from "@/lib/format";
import { setPageMeta } from "@/seo";
import { CheckCircle, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "pending" | "approved";

export function AdminReviewsPage() {
  const { data: reviews, isLoading } = useAllReviews();
  const { data: propertiesData } = useProperties({ limit: 100 });
  const approveReview = useApproveReview();
  const deleteReview = useDeleteReview();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    setPageMeta("Reviews — Admin", "Moderate property reviews.");
  }, []);

  const propertyMap = Object.fromEntries(
    (propertiesData?.properties ?? []).map((p) => [p.id, p.title]),
  );

  async function handleApprove(id: string) {
    try {
      await approveReview.mutateAsync(id);
      toast.success("Review approved.");
    } catch {
      toast.error("Failed to approve review.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    try {
      await deleteReview.mutateAsync(id);
      toast.success("Review deleted.");
    } catch {
      toast.error("Failed to delete review.");
    }
  }

  const pending = reviews?.filter((r) => !r.isApproved).length ?? 0;
  const approved = reviews?.filter((r) => r.isApproved).length ?? 0;

  const filtered = (reviews ?? []).filter((r) => {
    if (activeTab === "pending") return !r.isApproved;
    if (activeTab === "approved") return r.isApproved;
    return true;
  });

  const TABS: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: reviews?.length ?? 0 },
    { key: "pending", label: "Pending", count: pending },
    { key: "approved", label: "Approved", count: approved },
  ];

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display font-bold text-2xl text-foreground">
            Reviews
          </h1>
          {pending > 0 && (
            <span className="bg-amber-500/10 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
              {pending} pending
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {reviews?.length ?? 0} total reviews
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            data-ocid={`reviews-tab-${tab.key}`}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-subtle"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                activeTab === tab.key
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Reviewer
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Date
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
                {filtered.map((review) => (
                  <tr
                    key={review.id}
                    data-ocid="review-row"
                    className={`hover:bg-muted/20 transition-colors ${!review.isApproved ? "bg-amber-500/3" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground font-medium truncate max-w-[160px] block">
                        {propertyMap[review.propertyId] ?? review.propertyId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">
                        {review.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StarRating value={review.rating} readOnly size="sm" />
                    </td>
                    <td className="px-4 py-3 max-w-[220px]">
                      <p className="text-sm text-muted-foreground truncate">
                        {review.comment}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {review.isApproved ? (
                        <Badge variant="success">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <XCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {!review.isApproved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs gap-1 h-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                            onClick={() => handleApprove(review.id)}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-7 h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(review.id)}
                          aria-label="Delete review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">
                  {activeTab === "pending"
                    ? "No pending reviews."
                    : activeTab === "approved"
                      ? "No approved reviews yet."
                      : "No reviews yet."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-24 w-full rounded-xl" />
            ))
          : filtered.map((review) => (
              <div
                key={review.id}
                data-ocid="review-item"
                className={`bg-card rounded-xl border p-5 ${!review.isApproved ? "border-amber-500/30" : "border-border"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground">
                        {review.name}
                      </span>
                      <StarRating value={review.rating} readOnly size="sm" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {propertyMap[review.propertyId] ?? review.propertyId}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatDate(review.createdAt)}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {review.comment}
                    </p>
                    {review.isApproved ? (
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="warning">
                        <XCircle className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    {!review.isApproved && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                        onClick={() => handleApprove(review.id)}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground text-sm">
              {activeTab === "pending"
                ? "No pending reviews."
                : "No reviews yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
