import { q as useParams, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, p as Separator, b as Skeleton } from "./index-BANSdmlz.js";
import { A as ArticleCard } from "./ArticleCard-DG9O4h0Q.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CVN5wbw-.js";
import { b as useArticleBySlug, u as useRecentArticles } from "./use-articles-ATTiTLYq.js";
import { a as formatDate } from "./format-B6hFwB6V.js";
import { s as setPageMeta, b as generateArticleJsonLD, g as generateBreadcrumbJsonLD } from "./seo-CK-m768L.js";
import { B as BookOpen } from "./book-open-C5Xq64zx.js";
import { A as ArrowLeft } from "./arrow-left-DJWRKDae.js";
import { m as motion } from "./proxy-Clkm2goj.js";
import { U as User, C as Calendar } from "./user-rMVy1jhs.js";
import { S as Share2 } from "./share-2-DtRdFtVN.js";
import { A as ArrowRight } from "./arrow-right-edaG8tiI.js";
import "./useMutation-B9otopnZ.js";
function ArticleContent({ content }) {
  const lines = content.split("\n");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: lines.map((line, i) => {
    const key = `cl-${i}`;
    if (line.startsWith("# "))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "font-display font-bold text-2xl md:text-3xl text-foreground mt-8 mb-3 leading-snug",
          children: line.slice(2)
        },
        key
      );
    if (line.startsWith("## "))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "font-display font-semibold text-xl text-foreground mt-7 mb-2",
          children: line.slice(3)
        },
        key
      );
    if (line.startsWith("### "))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h4",
        {
          className: "font-display font-semibold text-lg text-foreground mt-5 mb-2",
          children: line.slice(4)
        },
        key
      );
    if (line.startsWith("- "))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "li",
        {
          className: "text-foreground/80 leading-relaxed ml-5 list-disc",
          children: line.slice(2)
        },
        key
      );
    if (line.trim() === "") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" }, key);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed text-base", children: line }, key);
  }) });
}
function ArticleSidebar({
  recentArticles,
  currentSlug
}) {
  const recent = recentArticles.filter((a) => a.slug !== currentSlug).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-accent" }),
        "Recent Articles"
      ] }),
      recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No other articles yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: recent.map((art) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog/$slug",
          params: { slug: art.slug },
          "data-ocid": "sidebar-recent-article",
          className: "group flex gap-3 items-start",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: art.featuredImage || "/assets/images/placeholder.svg",
                alt: art.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors", children: art.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                formatDate(art.publishedAt)
              ] })
            ] })
          ]
        }
      ) }, art.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 border border-accent/20 rounded-xl p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-2", children: "Ready to Find Your Property?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4 leading-relaxed", children: "Browse our curated listings of rentals, sales, new projects, and plots." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          className: "w-full cta-primary",
          size: "sm",
          "data-ocid": "sidebar-browse-cta",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: "Browse Properties" })
        }
      )
    ] })
  ] });
}
function ArticleLoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10", "data-ocid": "article-loading", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40 mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:grid lg:grid-cols-[1fr_320px] lg:gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[16/9] w-full rounded-2xl mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-1/2 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-px w-full mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          Array.from({ length: 8 }, (_, i) => `s-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, k)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block space-y-4 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" })
      ] })
    ] })
  ] }) });
}
function ArticleDetailPage() {
  const { slug } = useParams({ strict: false });
  const { data: article, isLoading } = useArticleBySlug(slug);
  const { data: recentArticles = [] } = useRecentArticles(4);
  reactExports.useEffect(() => {
    if (!article) return;
    setPageMeta(
      article.title,
      article.metaDescription,
      article.featuredImage,
      window.location.href,
      "article"
    );
    generateArticleJsonLD(article);
    generateBreadcrumbJsonLD([
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: article.title }
    ]);
  }, [article]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleLoadingSkeleton, {});
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "article-not-found",
        className: "flex flex-col items-center justify-center min-h-[65vh] gap-5 px-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Article Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "The article you're looking for may have been removed or the link may be incorrect." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Blog"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Go Home" }) })
          ] })
        ]
      }
    );
  }
  const relatedArticles = recentArticles.filter((a) => a.slug !== slug).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Breadcrumbs,
      {
        items: [{ label: "Blog", href: "/blog" }, { label: article.title }]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:grid lg:grid-cols-[1fr_320px] lg:gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden aspect-[16/9] mb-8 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: article.featuredImage || "/assets/images/placeholder.svg",
                alt: article.title,
                className: "w-full h-full object-cover",
                loading: "eager"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-5", children: article.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "italic text-muted-foreground text-lg leading-relaxed border-l-4 border-accent/40 pl-4 mb-5", children: article.metaDescription }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: article.author })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  formatDate(article.publishedAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "ml-auto gap-1.5 text-xs hover:text-accent",
                    "data-ocid": "article-share",
                    onClick: () => {
                      var _a;
                      return (_a = navigator.share) == null ? void 0 : _a.call(navigator, {
                        title: article.title,
                        url: window.location.href
                      });
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
                      "Share"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleContent, { content: article.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-12" }),
            relatedArticles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Related Articles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: relatedArticles.map((art, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: art })
                },
                art.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "gap-2",
                "data-ocid": "article-back",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  "Back to Blog"
                ] })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleSidebar,
        {
          recentArticles,
          currentSlug: slug
        }
      ) }) })
    ] }) }) })
  ] });
}
export {
  ArticleDetailPage
};
