import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, H as House, F as FileText, U as Users, S as Star, b as Skeleton } from "./index-BANSdmlz.js";
import { c as useAllArticles } from "./use-articles-ATTiTLYq.js";
import { a as useLeads } from "./use-leads-Cuyfap6z.js";
import { a as useProperties } from "./use-properties-BY35R6ki.js";
import { c as useAllReviews } from "./use-reviews-D4j1gY-c.js";
import { a as formatDate } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { P as Plus } from "./plus-BHZeveKv.js";
import { A as ArrowRight } from "./arrow-right-edaG8tiI.js";
import "./useMutation-B9otopnZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const STAT_CONFIGS = [
  {
    icon: House,
    label: "Total Properties",
    color: "bg-blue-500/10 text-blue-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    href: "/admin/properties"
  },
  {
    icon: FileText,
    label: "Published Articles",
    color: "bg-purple-500/10 text-purple-600",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    href: "/admin/articles"
  },
  {
    icon: Users,
    label: "Total Leads",
    color: "bg-amber-500/10 text-amber-600",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    href: "/admin/leads"
  },
  {
    icon: Star,
    label: "Pending Reviews",
    color: "bg-emerald-500/10 text-emerald-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    href: "/admin/reviews"
  }
];
function AdminDashboardPage() {
  const { data: props } = useProperties({ limit: 100 });
  const { data: articles } = useAllArticles();
  const { data: leads } = useLeads();
  const { data: reviews } = useAllReviews();
  reactExports.useEffect(() => {
    setPageMeta("Dashboard — Admin", "Skyline Properties admin dashboard.");
  }, []);
  const publishedArticles = (articles == null ? void 0 : articles.filter((a) => a.isPublished).length) ?? 0;
  const pendingReviews = (reviews == null ? void 0 : reviews.filter((r) => !r.isApproved).length) ?? 0;
  const stats = [
    (props == null ? void 0 : props.total) ?? 0,
    publishedArticles,
    (leads == null ? void 0 : leads.length) ?? 0,
    pendingReviews
  ];
  const unreadLeads = (leads == null ? void 0 : leads.filter((l) => !l.isRead).length) ?? 0;
  const recentLeads = (leads == null ? void 0 : leads.slice(0, 5)) ?? [];
  const recentPendingReviews = (reviews == null ? void 0 : reviews.filter((r) => !r.isApproved).slice(0, 5)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Overview of your real estate platform." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/properties/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "quick-add-property",
            size: "sm",
            className: "bg-accent text-accent-foreground hover:opacity-90 gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Property"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "quick-add-article",
            size: "sm",
            variant: "outline",
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Article"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: STAT_CONFIGS.map((cfg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: cfg.href, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "stat-card",
        className: "bg-card rounded-xl border border-border p-4 hover:shadow-card transition-shadow cursor-pointer group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center mb-3`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.icon, { className: `w-5 h-5 ${cfg.iconColor}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-2xl text-foreground", children: stats[i] !== void 0 ? stats[i] : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 inline-block" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
            cfg.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" })
          ] })
        ]
      }
    ) }, cfg.label)) }),
    (unreadLeads > 0 || pendingReviews > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      unreadLeads > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-amber-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              unreadLeads,
              " unread lead",
              unreadLeads !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Respond promptly to increase conversions" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/leads", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "text-xs gap-1 shrink-0",
            children: [
              "View ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] }),
      pendingReviews > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-purple-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              pendingReviews,
              " review",
              pendingReviews !== 1 ? "s" : "",
              " ",
              "pending"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approve or reject pending reviews" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "text-xs gap-1 shrink-0",
            children: [
              "View ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recent Leads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/leads", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs gap-1", children: [
            "View All ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentLeads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-muted-foreground", children: "No leads yet." }) : recentLeads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: lead.name }),
                  !lead.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-1.5 h-1.5 rounded-full bg-accent" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.propertyTitle ?? "General inquiry" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0 ml-3", children: formatDate(lead.createdAt) })
            ]
          },
          lead.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Pending Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs gap-1", children: [
            "View All ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentPendingReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-8 text-center text-sm text-muted-foreground", children: "No pending reviews." }) : recentPendingReviews.map((rev) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: rev.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: rev.comment })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 shrink-0 ml-3", children: Array.from({ length: rev.rating }, (_, i) => `s-${i}`).map(
                (k) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-xs", children: "★" }, k)
              ) })
            ]
          },
          rev.id
        )) })
      ] })
    ] })
  ] });
}
export {
  AdminDashboardPage
};
