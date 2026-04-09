import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllArticles } from "@/hooks/use-articles";
import { useLeads } from "@/hooks/use-leads";
import { useProperties } from "@/hooks/use-properties";
import { useAllReviews } from "@/hooks/use-reviews";
import { formatDate } from "@/lib/format";
import { setPageMeta } from "@/seo";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  Home,
  Plus,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const STAT_CONFIGS = [
  {
    icon: Home,
    label: "Total Properties",
    color: "bg-blue-500/10 text-blue-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    href: "/admin/properties",
  },
  {
    icon: FileText,
    label: "Published Articles",
    color: "bg-purple-500/10 text-purple-600",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    href: "/admin/articles",
  },
  {
    icon: Users,
    label: "Total Leads",
    color: "bg-amber-500/10 text-amber-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    href: "/admin/leads",
  },
  {
    icon: Star,
    label: "Pending Reviews",
    color: "bg-emerald-500/10 text-emerald-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    href: "/admin/reviews",
  },
];

export function AdminDashboardPage() {
  const { data: props } = useProperties({ limit: 100 });
  const { data: articles } = useAllArticles();
  const { data: leads } = useLeads();
  const { data: reviews } = useAllReviews();

  useEffect(() => {
    setPageMeta("Dashboard — Admin", "Skyline Properties admin dashboard.");
  }, []);

  const publishedArticles = articles?.filter((a) => a.isPublished).length ?? 0;
  const pendingReviews = reviews?.filter((r) => !r.isApproved).length ?? 0;

  const stats = [
    props?.total ?? 0,
    publishedArticles,
    leads?.length ?? 0,
    pendingReviews,
  ];

  const unreadLeads = leads?.filter((l) => !l.isRead).length ?? 0;
  const recentLeads = leads?.slice(0, 5) ?? [];
  const recentPendingReviews =
    reviews?.filter((r) => !r.isApproved).slice(0, 5) ?? [];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-1">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Overview of your real estate platform.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/admin/properties/new">
            <Button
              data-ocid="quick-add-property"
              size="sm"
              className="bg-accent text-accent-foreground hover:opacity-90 gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Property
            </Button>
          </Link>
          <Link to="/admin/articles/new">
            <Button
              data-ocid="quick-add-article"
              size="sm"
              variant="outline"
              className="gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CONFIGS.map((cfg, i) => (
          <Link key={cfg.label} to={cfg.href}>
            <div
              data-ocid="stat-card"
              className="bg-card rounded-xl border border-border p-4 hover:shadow-card transition-shadow cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center mb-3`}
              >
                <cfg.icon className={`w-5 h-5 ${cfg.iconColor}`} />
              </div>
              <div className="font-display font-bold text-2xl text-foreground">
                {stats[i] !== undefined ? (
                  stats[i]
                ) : (
                  <Skeleton className="h-7 w-10 inline-block" />
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                {cfg.label}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alerts */}
      {(unreadLeads > 0 || pendingReviews > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unreadLeads > 0 && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {unreadLeads} unread lead{unreadLeads !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Respond promptly to increase conversions
                  </p>
                </div>
              </div>
              <Link to="/admin/leads">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs gap-1 shrink-0"
                >
                  View <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          )}
          {pendingReviews > 0 && (
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {pendingReviews} review{pendingReviews !== 1 ? "s" : ""}{" "}
                    pending
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Approve or reject pending reviews
                  </p>
                </div>
              </div>
              <Link to="/admin/reviews">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs gap-1 shrink-0"
                >
                  View <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Two column activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Leads */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Leads</h2>
            <Link to="/admin/leads">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentLeads.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                No leads yet.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {lead.name}
                      </span>
                      {!lead.isRead && (
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.propertyTitle ?? "General inquiry"}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-3">
                    {formatDate(lead.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Pending Reviews</h2>
            <Link to="/admin/reviews">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentPendingReviews.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                No pending reviews.
              </div>
            ) : (
              recentPendingReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-medium text-foreground">
                      {rev.name}
                    </span>
                    <p className="text-xs text-muted-foreground truncate">
                      {rev.comment}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-3">
                    {Array.from({ length: rev.rating }, (_, i) => `s-${i}`).map(
                      (k) => (
                        <span key={k} className="text-accent text-xs">
                          ★
                        </span>
                      ),
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
