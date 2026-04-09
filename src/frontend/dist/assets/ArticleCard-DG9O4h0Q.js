import { j as jsxRuntimeExports, L as Link, a as cn } from "./index-BANSdmlz.js";
import { a as formatDate } from "./format-B6hFwB6V.js";
import { C as Calendar, U as User } from "./user-rMVy1jhs.js";
import { A as ArrowRight } from "./arrow-right-edaG8tiI.js";
function ArticleCard({
  article,
  className,
  featured = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": "article-card",
      className: cn(
        "group bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 flex flex-col",
        featured && "lg:flex-row",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/blog/$slug",
            params: { slug: article.slug },
            className: cn(
              "relative block overflow-hidden",
              featured ? "lg:w-2/5 aspect-[16/9] lg:aspect-auto" : "aspect-[16/9]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: article.featuredImage || "/assets/images/placeholder.svg",
                  alt: article.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex flex-col flex-1 p-5",
              featured && "lg:p-8 justify-center"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                  formatDate(article.publishedAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                  article.author
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: cn(
                    "font-display font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors",
                    featured ? "text-xl lg:text-2xl line-clamp-3" : "text-base line-clamp-2"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: { slug: article.slug }, children: article.title })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: cn(
                    "text-sm text-muted-foreground leading-relaxed mb-4",
                    featured ? "line-clamp-4" : "line-clamp-3"
                  ),
                  children: article.metaDescription
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/blog/$slug",
                  params: { slug: article.slug },
                  "data-ocid": "article-card-cta",
                  className: "inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200",
                  children: [
                    "Read More ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
export {
  ArticleCard as A
};
