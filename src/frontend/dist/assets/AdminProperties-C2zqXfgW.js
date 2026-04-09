import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, b as Skeleton, S as Star } from "./index-BANSdmlz.js";
import { P as PropertyBadge, B as Badge } from "./Badge-DH0HCHWw.js";
import { I as Input } from "./index-HwEbhaYB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LDE1YHN9.js";
import { a as useProperties, c as useDeleteProperty, d as useUpdateProperty } from "./use-properties-BY35R6ki.js";
import { f as formatPrice } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { P as Plus } from "./plus-BHZeveKv.js";
import { S as Search } from "./search-CrlmNCJs.js";
import { E as Eye, P as Pencil } from "./pencil-ATOKoYa3.js";
import { T as Trash2 } from "./trash-2-Cm7CSzKm.js";
import "./chevron-up-Dey2yvMM.js";
import "./useMutation-B9otopnZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43", key: "16m0ql" }],
  ["path", { d: "M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91", key: "1vt8nq" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
];
const StarOff = createLucideIcon("star-off", __iconNode);
function AdminPropertiesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data, isLoading } = useProperties({ limit: 100 });
  const deleteProperty = useDeleteProperty();
  const updateProperty = useUpdateProperty();
  reactExports.useEffect(() => {
    setPageMeta("Properties — Admin", "Manage your real estate listings.");
  }, []);
  const filtered = ((data == null ? void 0 : data.properties) ?? []).filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.propertyType === typeFilter;
    return matchesSearch && matchesType;
  });
  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProperty.mutateAsync(deleteTarget.id);
      ue.success("Property deleted.");
    } catch {
      ue.error("Failed to delete property.");
    } finally {
      setDeleteTarget(null);
    }
  }
  async function toggleFeatured(id, current) {
    try {
      await updateProperty.mutateAsync({ id, isFeatured: !current });
      ue.success(current ? "Removed from featured." : "Marked as featured.");
    } catch {
      ue.error("Failed to update property.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-6xl", children: [
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Delete Property" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Are you sure you want to delete",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
          '"',
          deleteTarget.title,
          '"'
        ] }),
        "? This cannot be undone."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setDeleteTarget(null),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "destructive",
            onClick: confirmDelete,
            disabled: deleteProperty.isPending,
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-0.5", children: "Properties" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          (data == null ? void 0 : data.total) ?? 0,
          " listings total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/properties/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "new-property-btn",
          className: "bg-accent text-accent-foreground hover:opacity-90 gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Property"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "property-search",
            placeholder: "Search properties...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: typeFilter,
          onValueChange: (v) => setTypeFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "property-type-filter",
                className: "w-full sm:w-44",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sale", children: "For Sale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rental", children: "Rental" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "resale", children: "Resale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newProject", children: "New Project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "plotLand", children: "Plot / Land" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Property" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": "property-row",
            className: "hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: p.heroImage || "/assets/images/placeholder.svg",
                    alt: p.title,
                    className: "w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[200px]", children: p.title }),
                    p.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-accent fill-accent shrink-0" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: p.city })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyBadge, { type: p.propertyType }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: formatPrice(p.price, p.propertyType === "rental") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: p.status === "active" ? "success" : p.status === "sold" ? "destructive" : "muted",
                  children: p.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: p.isFeatured ? "Remove from featured" : "Mark as featured",
                    className: `w-8 h-8 ${p.isFeatured ? "text-accent" : "text-muted-foreground"}`,
                    onClick: () => toggleFeatured(p.id, p.isFeatured),
                    children: p.isFeatured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StarOff, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/properties/$slug",
                    params: { slug: p.slug },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        title: "View",
                        className: "w-8 h-8",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin/properties/$id/edit",
                    params: { id: p.id },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        title: "Edit",
                        className: "w-8 h-8",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Delete",
                    className: "w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10",
                    onClick: () => setDeleteTarget({ id: p.id, title: p.title }),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }) })
            ]
          },
          p.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "property-row-mobile",
          className: "p-4 space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: p.heroImage || "/assets/images/placeholder.svg",
                  alt: p.title,
                  className: "w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: p.title }),
                  p.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-accent fill-accent shrink-0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: p.city }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyBadge, { type: p.propertyType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: p.status === "active" ? "success" : p.status === "sold" ? "destructive" : "muted",
                      children: p.status
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: formatPrice(p.price, p.propertyType === "rental") })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1",
                  onClick: () => toggleFeatured(p.id, p.isFeatured),
                  children: [
                    p.isFeatured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-accent text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StarOff, { className: "w-3.5 h-3.5" }),
                    p.isFeatured ? "Unfeature" : "Feature"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/properties/$id/edit", params: { id: p.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                    " Edit"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs gap-1 text-destructive hover:bg-destructive/10",
                  onClick: () => setDeleteTarget({ id: p.id, title: p.title }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    " Delete"
                  ]
                }
              )
            ] })
          ]
        },
        p.id
      )) }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: search || typeFilter !== "all" ? "No properties match your filters." : "No properties yet." }),
        !search && typeFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/properties/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-accent text-accent-foreground hover:opacity-90 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "Add Your First Property"
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  AdminPropertiesPage
};
