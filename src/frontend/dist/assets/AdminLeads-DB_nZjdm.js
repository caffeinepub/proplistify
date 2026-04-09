import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Skeleton, t as Mail, P as Phone, L as Link, B as Button } from "./index-BANSdmlz.js";
import { B as Badge } from "./Badge-DH0HCHWw.js";
import { a as useLeads, b as useMarkLeadRead, c as useDeleteLead } from "./use-leads-Cuyfap6z.js";
import { a as formatDate } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { M as MessageSquare } from "./message-square-BrgBASuM.js";
import { T as Trash2 } from "./trash-2-Cm7CSzKm.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-Dey2yvMM.js";
import "./useMutation-B9otopnZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const INQUIRY_LABELS = {
  viewingRequest: { label: "Viewing Request", variant: "default" },
  information: { label: "Information", variant: "muted" },
  offer: { label: "Offer", variant: "success" },
  general: { label: "General", variant: "muted" }
};
function AdminLeadsPage() {
  const { data: leads, isLoading } = useLeads();
  const markRead = useMarkLeadRead();
  const deleteLead = useDeleteLead();
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [sortBy, setSortBy] = reactExports.useState("date");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  reactExports.useEffect(() => {
    setPageMeta("Leads — Admin", "Manage incoming property inquiries.");
  }, []);
  function handleSort(col) {
    if (sortBy === col) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  }
  async function handleMarkRead(id) {
    try {
      await markRead.mutateAsync(id);
    } catch {
      ue.error("Failed to mark lead as read.");
    }
  }
  async function handleDelete(id) {
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;
    try {
      await deleteLead.mutateAsync(id);
      ue.success("Lead deleted.");
    } catch {
      ue.error("Failed to delete lead.");
    }
  }
  const sorted = [...leads ?? []].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "date") cmp = a.createdAt - b.createdAt;
    else cmp = a.name.localeCompare(b.name);
    return sortDir === "asc" ? cmp : -cmp;
  });
  const unread = (leads == null ? void 0 : leads.filter((l) => !l.isRead).length) ?? 0;
  function SortIcon({ col }) {
    if (sortBy !== col) return null;
    return sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5 inline ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 inline ml-1" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Leads" }),
        unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full", children: [
          unread,
          " new"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (leads == null ? void 0 : leads.length) ?? 0,
        " total inquiries"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block bg-card rounded-xl border border-border overflow-hidden", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "th",
            {
              className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-foreground select-none",
              onClick: () => handleSort("name"),
              onKeyDown: (e) => e.key === "Enter" && handleSort("name"),
              children: [
                "Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { col: "name" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Inquiry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "th",
            {
              className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-foreground select-none",
              onClick: () => handleSort("date"),
              onKeyDown: (e) => e.key === "Enter" && handleSort("date"),
              children: [
                "Date ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { col: "date" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: sorted.map((lead) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": "lead-row",
                className: `hover:bg-muted/20 transition-colors cursor-pointer ${!lead.isRead ? "bg-accent/3" : ""}`,
                onClick: () => setExpandedId(expandedId === lead.id ? null : lead.id),
                onKeyDown: (e) => e.key === "Enter" && setExpandedId(expandedId === lead.id ? null : lead.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: lead.isRead ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Read" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded-full border border-accent/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                    "New"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: lead.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `mailto:${lead.email}`,
                        className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors",
                        onClick: (e) => e.stopPropagation(),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                          lead.email
                        ]
                      }
                    ),
                    lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `tel:${lead.phone}`,
                        className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors",
                        onClick: (e) => e.stopPropagation(),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                          lead.phone
                        ]
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: ((_a = INQUIRY_LABELS[lead.inquiryType]) == null ? void 0 : _a.variant) ?? "muted",
                      children: ((_b = INQUIRY_LABELS[lead.inquiryType]) == null ? void 0 : _b.label) ?? lead.inquiryType
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: lead.propertyId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/properties/$slug",
                      params: { slug: lead.propertyId },
                      className: "flex items-center gap-1 text-xs text-accent hover:underline",
                      onClick: (e) => e.stopPropagation(),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: lead.propertyTitle ?? lead.propertyId })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "General" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: formatDate(lead.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-end gap-1",
                      onClick: (e) => e.stopPropagation(),
                      onKeyDown: (e) => e.stopPropagation(),
                      children: [
                        !lead.isRead && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            className: "text-xs gap-1 h-7 hover:text-accent",
                            onClick: () => handleMarkRead(lead.id),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                              "Mark Read"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "w-7 h-7 text-destructive hover:text-destructive hover:bg-destructive/10",
                            onClick: () => handleDelete(lead.id),
                            "aria-label": "Delete lead",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ]
                    }
                  ) })
                ]
              },
              lead.id
            ),
            expandedId === lead.id && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg border border-border p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: lead.message })
            ] }) }) }, `${lead.id}-expanded`)
          ] });
        }) })
      ] }) }),
      !isLoading && (leads == null ? void 0 : leads.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No leads yet. They'll appear here when visitors submit inquiries." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden space-y-3", children: [
      isLoading ? Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, k)) : sorted.map((lead) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "lead-item",
            className: `bg-card rounded-xl border p-5 transition-all ${!lead.isRead ? "border-accent/30 shadow-card" : "border-border"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: lead.name }),
                  !lead.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent/10 text-accent text-xs font-medium px-2 py-0.5 rounded-full border border-accent/20", children: "New" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: ((_a = INQUIRY_LABELS[lead.inquiryType]) == null ? void 0 : _a.variant) ?? "muted",
                      children: ((_b = INQUIRY_LABELS[lead.inquiryType]) == null ? void 0 : _b.label) ?? lead.inquiryType
                    }
                  )
                ] }),
                lead.propertyTitle && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: lead.propertyTitle })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "text-sm text-muted-foreground text-left w-full",
                    onClick: () => setExpandedId(expandedId === lead.id ? null : lead.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: expandedId === lead.id ? "" : "line-clamp-2",
                          children: lead.message
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent mt-1 inline-block", children: expandedId === lead.id ? "Show less" : "Show more" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `mailto:${lead.email}`,
                      className: "flex items-center gap-1 hover:text-accent transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
                        lead.email
                      ]
                    }
                  ),
                  lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `tel:${lead.phone}`,
                      className: "flex items-center gap-1 hover:text-accent transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                        lead.phone
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(lead.createdAt) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 shrink-0", children: [
                !lead.isRead && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-xs gap-1 hover:text-accent",
                    onClick: () => handleMarkRead(lead.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                      "Mark Read"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10",
                    onClick: () => handleDelete(lead.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ] })
          },
          lead.id
        );
      }),
      !isLoading && (leads == null ? void 0 : leads.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 bg-card rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No leads yet. They'll appear here when visitors submit inquiries." }) })
    ] })
  ] });
}
export {
  AdminLeadsPage
};
