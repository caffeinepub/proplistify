import { c as createLucideIcon, u as useNavigate, o as useSearch, r as reactExports, j as jsxRuntimeExports, b as Skeleton, B as Button, L as Link } from "./index-BANSdmlz.js";
import { A as ArticleCard } from "./ArticleCard-DG9O4h0Q.js";
import { B as Breadcrumbs, C as ChevronRight } from "./Breadcrumbs-CVN5wbw-.js";
import { a as useArticles } from "./use-articles-ATTiTLYq.js";
import { s as setPageMeta, g as generateBreadcrumbJsonLD } from "./seo-CK-m768L.js";
import { m as motion } from "./proxy-Clkm2goj.js";
import { B as BookOpen } from "./book-open-C5Xq64zx.js";
import { C as ChevronLeft } from "./chevron-left-B5RpwIYz.js";
import "./format-B6hFwB6V.js";
import "./user-rMVy1jhs.js";
import "./arrow-right-edaG8tiI.js";
import "./useMutation-B9otopnZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
const ARTICLES_PER_PAGE = 9;
function BlogPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const currentPage = Math.max(1, Number.parseInt(search.page ?? "1", 10) || 1);
  const { data, isLoading } = useArticles(currentPage, ARTICLES_PER_PAGE);
  reactExports.useEffect(() => {
    setPageMeta(
      "Real Estate Blog | PropListify Insights",
      "Expert real estate guides, market analysis, investment strategies, and neighborhood spotlights from the Skyline Properties team.",
      "/assets/generated/blog-hero.dim_800x450.jpg",
      window.location.href
    );
    generateBreadcrumbJsonLD([{ label: "Home", href: "/" }, { label: "Blog" }]);
  }, []);
  const totalPages = (data == null ? void 0 : data.totalPages) ?? 1;
  function goToPage(page) {
    void navigate({ to: "/blog", search: { page: String(page) } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{ label: "Blog" }] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight", children: "Real Estate Insights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: "Market analysis, investment strategies, buyer guides, and neighborhood spotlights — everything you need to make smart property decisions." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4", children: [
      !isLoading && currentPage === 1 && (data == null ? void 0 : data.articles[0]) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wider text-accent", children: "Featured Article" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: data.articles[0], featured: true })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: currentPage === 1 ? "All Articles" : `Articles — Page ${currentPage}` }),
        data && data.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          data.total,
          " article",
          data.total !== 1 ? "s" : ""
        ] })
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl overflow-hidden border border-border bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[16/9] w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3 mt-2" })
            ] })
          ]
        },
        key
      )) }),
      !isLoading && data && data.articles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: (currentPage === 1 ? data.articles.slice(1) : data.articles).map(
        (article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.08, duration: 0.4 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article })
          },
          article.id
        )
      ) }),
      !isLoading && (!(data == null ? void 0 : data.articles) || data.articles.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          "data-ocid": "blog-empty-state",
          className: "flex flex-col items-center justify-center py-24 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "No articles published yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-6", children: "Our editorial team is crafting expert insights. Check back soon for real estate guides and market analysis." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Browse Properties Instead" }) })
          ]
        }
      ),
      !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "blog-pagination",
          className: "flex items-center justify-center gap-2 mt-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                disabled: currentPage <= 1,
                onClick: () => goToPage(currentPage - 1),
                "aria-label": "Previous page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => {
                const isActive = page === currentPage;
                const isNearby = Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;
                if (!isNearby) {
                  if (page === currentPage - 3 || page === currentPage + 3) {
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-muted-foreground text-sm px-1",
                        children: "…"
                      },
                      page
                    );
                  }
                  return null;
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: isActive ? "default" : "outline",
                    size: "icon",
                    onClick: () => goToPage(page),
                    "aria-label": `Page ${page}`,
                    "aria-current": isActive ? "page" : void 0,
                    className: "w-9 h-9 text-sm",
                    children: page
                  },
                  page
                );
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                disabled: currentPage >= totalPages,
                onClick: () => goToPage(currentPage + 1),
                "aria-label": "Next page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  BlogPage
};
