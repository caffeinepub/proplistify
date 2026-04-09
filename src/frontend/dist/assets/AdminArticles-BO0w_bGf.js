import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, b as Skeleton } from "./index-BANSdmlz.js";
import { B as Badge } from "./Badge-DH0HCHWw.js";
import { c as useAllArticles, d as useDeleteArticle, e as useUpdateArticle } from "./use-articles-ATTiTLYq.js";
import { a as formatDate } from "./format-B6hFwB6V.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { u as ue } from "./index-lAb_Q-5s.js";
import { P as Plus } from "./plus-BHZeveKv.js";
import { C as CircleCheckBig } from "./circle-check-big-ClO8OrA9.js";
import { C as CircleX } from "./circle-x-CzDtyQ_j.js";
import { E as Eye, P as Pencil } from "./pencil-ATOKoYa3.js";
import { T as Trash2 } from "./trash-2-Cm7CSzKm.js";
import "./useMutation-B9otopnZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function AdminArticlesPage() {
  const { data: articles, isLoading } = useAllArticles();
  const deleteArticle = useDeleteArticle();
  const updateArticle = useUpdateArticle();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setPageMeta("Articles — Admin", "Manage your blog articles.");
  }, []);
  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteArticle.mutateAsync(deleteTarget.id);
      ue.success("Article deleted.");
    } catch {
      ue.error("Failed to delete article.");
    } finally {
      setDeleteTarget(null);
    }
  }
  async function togglePublished(id, current) {
    try {
      await updateArticle.mutateAsync({ id, isPublished: !current });
      ue.success(current ? "Article unpublished." : "Article published.");
    } catch {
      ue.error("Failed to update article.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-6xl", children: [
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Delete Article" }),
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
            disabled: deleteArticle.isPending,
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-0.5", children: "Articles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          (articles == null ? void 0 : articles.length) ?? 0,
          " articles total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "new-article-btn",
          className: "bg-accent text-accent-foreground hover:opacity-90 gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "New Article"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Article" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Author" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: articles == null ? void 0 : articles.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": "article-row",
            className: "hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: a.featuredImage || "/assets/images/placeholder.svg",
                    alt: a.title,
                    className: "w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[220px]", children: a.title })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: a.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(a.publishedAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: a.isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                "Published"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                "Draft"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: a.isPublished ? "Unpublish" : "Publish",
                    className: `w-8 h-8 ${a.isPublished ? "text-emerald-600" : "text-muted-foreground"}`,
                    onClick: () => togglePublished(a.id, a.isPublished),
                    children: a.isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: { slug: a.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "View on site",
                    className: "w-8 h-8",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin/articles/$id/edit",
                    params: { id: a.id },
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
                    onClick: () => setDeleteTarget({ id: a.id, title: a.title }),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }) })
            ]
          },
          a.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: articles == null ? void 0 : articles.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "article-row-mobile",
          className: "p-4 space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: a.featuredImage || "/assets/images/placeholder.svg",
                  alt: a.title,
                  className: "w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate mb-0.5", children: a.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1.5", children: [
                  a.author,
                  " · ",
                  formatDate(a.publishedAt)
                ] }),
                a.isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                  "Published"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                  "Draft"
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
                  onClick: () => togglePublished(a.id, a.isPublished),
                  children: [
                    a.isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                    a.isPublished ? "Unpublish" : "Publish"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/$id/edit", params: { id: a.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                  onClick: () => setDeleteTarget({ id: a.id, title: a.title }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    " Delete"
                  ]
                }
              )
            ] })
          ]
        },
        a.id
      )) }),
      (articles == null ? void 0 : articles.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "No articles yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-accent text-accent-foreground hover:opacity-90 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "Write Your First Article"
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  AdminArticlesPage
};
