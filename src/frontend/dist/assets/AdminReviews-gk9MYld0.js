import { r as reactExports, j as jsxRuntimeExports, b as Skeleton, B as Button } from "./index-BANSdmlz.js";
import { B as Badge } from "./Badge-DH0HCHWw.js";
import { S as StarRating } from "./StarRating-CMw6498-.js";
import { a as useProperties } from "./use-properties-BY35R6ki.js";
import { c as useAllReviews, d as useApproveReview, e as useDeleteReview } from "./use-reviews-D4j1gY-c.js";
import { a as formatDate } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { C as CircleCheckBig } from "./circle-check-big-ClO8OrA9.js";
import { C as CircleX } from "./circle-x-CzDtyQ_j.js";
import { T as Trash2 } from "./trash-2-Cm7CSzKm.js";
import "./useMutation-B9otopnZ.js";
function AdminReviewsPage() {
  const { data: reviews, isLoading } = useAllReviews();
  const { data: propertiesData } = useProperties({ limit: 100 });
  const approveReview = useApproveReview();
  const deleteReview = useDeleteReview();
  const [activeTab, setActiveTab] = reactExports.useState("all");
  reactExports.useEffect(() => {
    setPageMeta("Reviews — Admin", "Moderate property reviews.");
  }, []);
  const propertyMap = Object.fromEntries(
    ((propertiesData == null ? void 0 : propertiesData.properties) ?? []).map((p) => [p.id, p.title])
  );
  async function handleApprove(id) {
    try {
      await approveReview.mutateAsync(id);
      ue.success("Review approved.");
    } catch {
      ue.error("Failed to approve review.");
    }
  }
  async function handleDelete(id) {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    try {
      await deleteReview.mutateAsync(id);
      ue.success("Review deleted.");
    } catch {
      ue.error("Failed to delete review.");
    }
  }
  const pending = (reviews == null ? void 0 : reviews.filter((r) => !r.isApproved).length) ?? 0;
  const approved = (reviews == null ? void 0 : reviews.filter((r) => r.isApproved).length) ?? 0;
  const filtered = (reviews ?? []).filter((r) => {
    if (activeTab === "pending") return !r.isApproved;
    if (activeTab === "approved") return r.isApproved;
    return true;
  });
  const TABS = [
    { key: "all", label: "All", count: (reviews == null ? void 0 : reviews.length) ?? 0 },
    { key: "pending", label: "Pending", count: pending },
    { key: "approved", label: "Approved", count: approved }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Reviews" }),
        pending > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-500/10 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/20", children: [
          pending,
          " pending"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (reviews == null ? void 0 : reviews.length) ?? 0,
        " total reviews"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-muted/40 rounded-lg p-1 w-fit", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `reviews-tab-${tab.key}`,
        onClick: () => setActiveTab(tab.key),
        className: `px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${activeTab === tab.key ? "bg-card text-foreground shadow-subtle" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          tab.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.key ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`,
              children: tab.count
            }
          )
        ]
      },
      tab.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block bg-card rounded-xl border border-border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Reviewer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Comment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": "review-row",
            className: `hover:bg-muted/20 transition-colors ${!review.isApproved ? "bg-amber-500/3" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium truncate max-w-[160px] block", children: propertyMap[review.propertyId] ?? review.propertyId }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: review.name }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: review.rating, readOnly: true, size: "sm" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: review.comment }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: formatDate(review.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: review.isApproved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                "Approved"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "warning", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                "Pending"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                !review.isApproved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-xs gap-1 h-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10",
                    onClick: () => handleApprove(review.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                      "Approve"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "w-7 h-7 text-destructive hover:text-destructive hover:bg-destructive/10",
                    onClick: () => handleDelete(review.id),
                    "aria-label": "Delete review",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          review.id
        )) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: activeTab === "pending" ? "No pending reviews." : activeTab === "approved" ? "No approved reviews yet." : "No reviews yet." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden space-y-3", children: [
      isLoading ? Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, k)) : filtered.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "review-item",
          className: `bg-card rounded-xl border p-5 ${!review.isApproved ? "border-amber-500/30" : "border-border"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: review.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: review.rating, readOnly: true, size: "sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: propertyMap[review.propertyId] ?? review.propertyId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: formatDate(review.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-2", children: review.comment }),
              review.isApproved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                "Approved"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "warning", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                "Pending"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 shrink-0", children: [
              !review.isApproved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10",
                  onClick: () => handleApprove(review.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                    "Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10",
                  onClick: () => handleDelete(review.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    "Delete"
                  ]
                }
              )
            ] })
          ] })
        },
        review.id
      )),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 bg-card rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: activeTab === "pending" ? "No pending reviews." : "No reviews yet." }) })
    ] })
  ] });
}
export {
  AdminReviewsPage
};
