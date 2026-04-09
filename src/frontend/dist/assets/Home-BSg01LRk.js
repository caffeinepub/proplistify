import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, a as cn, u as useNavigate, S as Star, L as Link, b as Skeleton, U as Users, P as Phone } from "./index-BANSdmlz.js";
import { A as ArticleCard } from "./ArticleCard-DG9O4h0Q.js";
import { L as LeadCaptureForm } from "./LeadCaptureForm-BpZBHWed.js";
import { P as PropertyCard } from "./PropertyCard-DSEQVi1L.js";
import { I as Input } from "./index-HwEbhaYB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-LDE1YHN9.js";
import { S as Search } from "./search-CrlmNCJs.js";
import { u as useRecentArticles } from "./use-articles-ATTiTLYq.js";
import { u as useFeaturedProperties, a as useProperties } from "./use-properties-BY35R6ki.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { m as motion } from "./proxy-Clkm2goj.js";
import { A as ArrowRight } from "./arrow-right-edaG8tiI.js";
import { M as MessageSquare } from "./message-square-BrgBASuM.js";
import "./format-B6hFwB6V.js";
import "./user-rMVy1jhs.js";
import "./label-BfJvJEcg.js";
import "./index.esm-wPuANXr6.js";
import "./use-leads-Cuyfap6z.js";
import "./useMutation-B9otopnZ.js";
import "./index-lAb_Q-5s.js";
import "./circle-check-big-ClO8OrA9.js";
import "./loader-circle-DmH7jCmO.js";
import "./Badge-DH0HCHWw.js";
import "./bed-gZtGX9n-.js";
import "./chevron-up-Dey2yvMM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const PROPERTY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "rental", label: "Rental" },
  { value: "sale", label: "For Sale" },
  { value: "resale", label: "Resale" },
  { value: "newProject", label: "New Project" },
  { value: "plotLand", label: "Plot / Land" }
];
const PRICE_RANGES = [
  { value: "any", label: "Any Price" },
  { value: "0-500000", label: "Under $500K" },
  { value: "500000-1000000", label: "$500K – $1M" },
  { value: "1000000-2500000", label: "$1M – $2.5M" },
  { value: "2500000-999999999", label: "$2.5M+" }
];
function SearchBar({
  onSearch,
  className,
  compact = false
}) {
  const [query, setQuery] = reactExports.useState("");
  const [type, setType] = reactExports.useState("all");
  const [priceRange, setPriceRange] = reactExports.useState("any");
  function handleSearch() {
    const filters = {};
    if (query.trim()) filters.search = query.trim();
    if (type !== "all") filters.propertyType = type;
    if (priceRange !== "any") {
      const [min, max] = priceRange.split("-").map(Number);
      filters.minPrice = min;
      filters.maxPrice = max;
    }
    onSearch(filters);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col md:flex-row gap-2 bg-card rounded-xl p-2 shadow-elevated border border-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "search-input",
              type: "text",
              placeholder: "Search by city, address, or keyword...",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onKeyDown: handleKeyDown,
              className: "pl-9 border-0 bg-transparent focus-visible:ring-0 text-sm h-10"
            }
          )
        ] }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-border hidden md:block self-stretch my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: setType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "search-type-filter",
                className: "w-full md:w-40 border-0 bg-transparent focus:ring-0 text-sm h-10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Type" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PROPERTY_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-border hidden md:block self-stretch my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priceRange, onValueChange: setPriceRange, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "search-price-filter",
                className: "w-full md:w-44 border-0 bg-transparent focus:ring-0 text-sm h-10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Price Range" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PRICE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.value, children: r.label }, r.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "search-submit",
            onClick: handleSearch,
            className: "bg-accent text-accent-foreground hover:opacity-90 h-10 px-5 text-sm font-semibold shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 mr-1.5" }),
              "Search"
            ]
          }
        )
      ]
    }
  );
}
const HERO_IMAGE = "/assets/generated/hero-skyline.dim_1400x700.jpg";
const STATS = [
  { label: "Properties Listed", value: "500+" },
  { label: "Happy Clients", value: "200+" },
  { label: "Cities Covered", value: "50+" },
  { label: "Years Experience", value: "10+" }
];
const PROPERTY_TYPE_NAV = [
  {
    type: "rental",
    label: "Rental",
    emoji: "🏠",
    description: "Monthly & yearly leases",
    badgeClass: "badge-rental"
  },
  {
    type: "sale",
    label: "For Sale",
    emoji: "🏢",
    description: "Premium properties to own",
    badgeClass: "badge-sale"
  },
  {
    type: "resale",
    label: "Resale",
    emoji: "🔑",
    description: "Great value resale homes",
    badgeClass: "badge-resale"
  },
  {
    type: "newProject",
    label: "New Projects",
    emoji: "🏗️",
    description: "Fresh launches & pre-sales",
    badgeClass: "badge-new-project"
  },
  {
    type: "plotLand",
    label: "Plots & Land",
    emoji: "🌿",
    description: "Build your dream from ground up",
    badgeClass: "badge-plot-land"
  }
];
const WHY_CHOOSE_US = [
  {
    icon: Users,
    title: "Expert Agents",
    description: "Our seasoned team brings local market knowledge and decades of negotiation expertise."
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description: "Every property is manually verified for legal clarity, title, and documentation."
  },
  {
    icon: Zap,
    title: "Fast Transactions",
    description: "Streamlined processes and digital paperwork cut closing time by up to 40%."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance from our dedicated support team — always available."
  }
];
function PropertyTypeCard({
  item,
  count,
  index,
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      "data-ocid": `property-type-${item.type}`,
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.08 },
      onClick: () => onNavigate(item.type),
      className: "group w-full text-left rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/30",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl mb-3 block", "aria-hidden": "true", children: item.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-1 text-foreground group-hover:text-accent transition-colors", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-2", children: item.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${item.badgeClass}`,
            children: [
              count,
              " listings ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        )
      ]
    }
  );
}
function HomePage() {
  const navigate = useNavigate();
  const { data: featured, isLoading: loadingFeatured } = useFeaturedProperties();
  const { data: articles, isLoading: loadingArticles } = useRecentArticles(3);
  const { data: rentalPage } = useProperties({ propertyType: "rental" });
  const { data: salePage } = useProperties({ propertyType: "sale" });
  const { data: resalePage } = useProperties({ propertyType: "resale" });
  const { data: newProjectPage } = useProperties({
    propertyType: "newProject"
  });
  const { data: plotLandPage } = useProperties({ propertyType: "plotLand" });
  const typeCounts = {
    rental: (rentalPage == null ? void 0 : rentalPage.total) ?? 0,
    sale: (salePage == null ? void 0 : salePage.total) ?? 0,
    resale: (resalePage == null ? void 0 : resalePage.total) ?? 0,
    newProject: (newProjectPage == null ? void 0 : newProjectPage.total) ?? 0,
    plotLand: (plotLandPage == null ? void 0 : plotLandPage.total) ?? 0
  };
  reactExports.useEffect(() => {
    setPageMeta(
      "PropListify — Find Your Dream Property | Real Estate Listings",
      "Discover exclusive rentals, sales, resales, new projects, and land across the city. PropListify connects you with verified premium real estate.",
      HERO_IMAGE,
      window.location.href,
      "website"
    );
  }, []);
  function handleSearch(filters) {
    const params = new URLSearchParams();
    if (filters.search) params.set("q", filters.search);
    if (filters.propertyType) params.set("type", filters.propertyType);
    if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
    void navigate({ to: "/properties", search: Object.fromEntries(params) });
  }
  function handleTypeNavigate(type) {
    void navigate({ to: "/properties", search: { type } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero-section",
        className: "relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
              style: { backgroundImage: `url('${HERO_IMAGE}')` },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hero-gradient", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }),
                    "#1 Trusted Real Estate Platform"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-5 leading-[1.08]", children: [
                    "Find Your",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent italic", children: "Dream Property" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed", children: "Browse exclusive rentals, sales, resales, new projects, and land across the city — all in one place." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65, delay: 0.18 },
                className: "max-w-3xl mx-auto mb-8",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SearchBar,
                  {
                    "data-ocid": "hero-search",
                    onSearch: handleSearch,
                    className: "shadow-2xl"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.38 },
                className: "flex flex-col sm:flex-row items-center justify-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "hero-cta-browse",
                      size: "lg",
                      className: "cta-primary px-8 py-3 text-sm font-semibold rounded-xl shadow-lg min-w-44",
                      children: [
                        "Browse Properties",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "hero-cta-contact",
                      size: "lg",
                      variant: "outline",
                      className: "bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white px-8 py-3 text-sm font-semibold rounded-xl min-w-44",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                        "Contact Us"
                      ]
                    }
                  ) })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "stats-section", className: "bg-accent py-10 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 text-center", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl md:text-4xl text-white", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/75 mt-1", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "property-types-section",
        className: "py-16 md:py-20 bg-muted/30",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-3", children: "Browse by Property Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto text-sm sm:text-base", children: "Whether you're renting, buying, or investing — find the perfect category for your needs." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: PROPERTY_TYPE_NAV.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PropertyTypeCard,
            {
              item,
              count: typeCounts[item.type],
              index: i,
              onNavigate: handleTypeNavigate
            },
            item.type
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "featured-section",
        className: "py-16 md:py-20 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "Featured Properties" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1.5 text-sm", children: "Handpicked premium listings selected by our experts" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/properties",
                "data-ocid": "featured-see-all",
                className: "hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200",
                children: [
                  "View All ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: loadingFeatured ? Array.from({ length: 6 }, (_, i) => `skel-feat-${i}`).map(
            (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl overflow-hidden border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
                  ] })
                ]
              },
              key
            )
          ) : featured == null ? void 0 : featured.map((property, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { property })
            },
            property.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden -mx-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide", children: loadingFeatured ? Array.from({ length: 3 }, (_, i) => `skel-m-${i}`).map(
            (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "snap-start shrink-0 w-72 rounded-xl overflow-hidden border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
                  ] })
                ]
              },
              key
            )
          ) : featured == null ? void 0 : featured.map((property) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start shrink-0 w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { property }) }, property.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "featured-see-all-mobile",
              variant: "outline",
              className: "gap-2",
              children: [
                "View All Properties",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "why-choose-us", className: "py-16 md:py-20 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-3", children: "Why Choose PropListify?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto text-sm sm:text-base", children: "We combine local expertise with cutting-edge technology to deliver an unmatched real estate experience." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: WHY_CHOOSE_US.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-card rounded-xl p-6 border border-border shadow-card text-center hover:shadow-elevated transition-shadow duration-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-6 h-6 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2 text-sm", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: item.description })
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "blog-section",
        className: "py-16 md:py-20 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "Market Insights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1.5 text-sm", children: "Expert guides and market analysis" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog",
                "data-ocid": "blog-see-all",
                className: "hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200",
                children: [
                  "All Articles ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: loadingArticles ? Array.from({ length: 3 }, (_, i) => `skel-art-${i}`).map(
            (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl overflow-hidden border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[16/9] w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
                  ] })
                ]
              },
              key
            )
          ) : articles == null ? void 0 : articles.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article })
            },
            article.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
            "All Articles",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "lead-cta-section",
        className: "py-16 md:py-20 bg-muted/30",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight", children: [
              "Ready to Find Your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Next Property?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed mb-6", children: "Our expert agents are available 7 days a week. Fill out the form and we'll get back to you within 2 hours." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3 text-sm text-muted-foreground", children: [
              "Free property consultation",
              "No obligation viewings",
              "Market valuation reports"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent shrink-0" }),
              item
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-5", children: "Send Us an Inquiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LeadCaptureForm, {})
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "cta-dark-section",
        className: "py-16 md:py-20 bg-primary",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold uppercase tracking-widest mb-4 text-accent", children: "Get in Touch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight", children: [
                "Your Dream Property",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Awaits You Today"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed", children: "From first inquiry to final handover — our team is with you every step of the way. Start your property journey now." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "cta-contact-btn",
                    size: "lg",
                    className: "cta-primary px-8 py-3 text-sm font-semibold rounded-xl shadow-lg min-w-44",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                      "Contact Us"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "tel:+1-800-555-0199",
                    "data-ocid": "cta-phone-link",
                    className: "inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-9 h-9 rounded-full bg-accent/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-accent" }) }),
                      "+1 (800) 555-0199"
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  HomePage
};
