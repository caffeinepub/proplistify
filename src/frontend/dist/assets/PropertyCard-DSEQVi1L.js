import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, M as MapPin, a as cn } from "./index-BANSdmlz.js";
import { P as PropertyBadge } from "./Badge-DH0HCHWw.js";
import { f as formatPrice } from "./format-B6hFwB6V.js";
import { B as Bed, a as Bath } from "./bed-gZtGX9n-.js";
import { A as ArrowRight } from "./arrow-right-edaG8tiI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
];
const Maximize = createLucideIcon("maximize", __iconNode);
function PropertyCard({ property, className }) {
  const isRental = property.propertyType === "rental";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": "property-card",
      className: cn(
        "group bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/properties/$slug",
            params: { slug: property.slug },
            className: "relative block overflow-hidden aspect-[4/3]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: property.heroImage || "/assets/images/placeholder.svg",
                  alt: property.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyBadge, { type: property.propertyType }),
                property.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm", children: "Featured" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card/95 backdrop-blur-sm text-foreground font-display font-bold text-sm px-3 py-1.5 rounded-full shadow-sm", children: formatPrice(property.price, isRental) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties/$slug", params: { slug: property.slug }, children: property.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-xs mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              property.address,
              ", ",
              property.city
            ] })
          ] }),
          property.bedrooms > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "w-3.5 h-3.5" }),
              property.bedrooms,
              " Bed",
              property.bedrooms !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "w-3.5 h-3.5" }),
              property.bathrooms,
              " Bath",
              property.bathrooms !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "w-3.5 h-3.5" }),
              property.areaSqft.toLocaleString(),
              " sqft"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/properties/$slug",
              params: { slug: property.slug },
              "data-ocid": "property-card-cta",
              className: "flex items-center justify-center gap-2 w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 group/btn",
              children: [
                "View Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  PropertyCard as P
};
