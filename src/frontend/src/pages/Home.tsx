import { ArticleCard } from "@/components/ArticleCard";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentArticles } from "@/hooks/use-articles";
import { useFeaturedProperties, useProperties } from "@/hooks/use-properties";
import { setPageMeta } from "@/seo";
import type { PropertyFilters, PropertyType } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const HERO_IMAGE = "/assets/generated/hero-skyline.dim_1400x700.jpg";

const STATS = [
  { label: "Properties Listed", value: "500+" },
  { label: "Happy Clients", value: "200+" },
  { label: "Cities Covered", value: "50+" },
  { label: "Years Experience", value: "10+" },
];

const PROPERTY_TYPE_NAV: {
  type: PropertyType;
  label: string;
  emoji: string;
  description: string;
  badgeClass: string;
}[] = [
  {
    type: "rental",
    label: "Rental",
    emoji: "🏠",
    description: "Monthly & yearly leases",
    badgeClass: "badge-rental",
  },
  {
    type: "sale",
    label: "For Sale",
    emoji: "🏢",
    description: "Premium properties to own",
    badgeClass: "badge-sale",
  },
  {
    type: "resale",
    label: "Resale",
    emoji: "🔑",
    description: "Great value resale homes",
    badgeClass: "badge-resale",
  },
  {
    type: "newProject",
    label: "New Projects",
    emoji: "🏗️",
    description: "Fresh launches & pre-sales",
    badgeClass: "badge-new-project",
  },
  {
    type: "plotLand",
    label: "Plots & Land",
    emoji: "🌿",
    description: "Build your dream from ground up",
    badgeClass: "badge-plot-land",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: Users,
    title: "Expert Agents",
    description:
      "Our seasoned team brings local market knowledge and decades of negotiation expertise.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is manually verified for legal clarity, title, and documentation.",
  },
  {
    icon: Zap,
    title: "Fast Transactions",
    description:
      "Streamlined processes and digital paperwork cut closing time by up to 40%.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance from our dedicated support team — always available.",
  },
];

function PropertyTypeCard({
  item,
  count,
  index,
  onNavigate,
}: {
  item: (typeof PROPERTY_TYPE_NAV)[number];
  count: number;
  index: number;
  onNavigate: (type: PropertyType) => void;
}) {
  return (
    <motion.button
      type="button"
      data-ocid={`property-type-${item.type}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => onNavigate(item.type)}
      className="group w-full text-left rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/30"
    >
      <span className="text-3xl mb-3 block" aria-hidden="true">
        {item.emoji}
      </span>
      <h3 className="font-display font-semibold text-sm mb-1 text-foreground group-hover:text-accent transition-colors">
        {item.label}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        {item.description}
      </p>
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${item.badgeClass}`}
      >
        {count} listings <ArrowRight className="w-3 h-3" />
      </span>
    </motion.button>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const { data: featured, isLoading: loadingFeatured } =
    useFeaturedProperties();
  const { data: articles, isLoading: loadingArticles } = useRecentArticles(3);

  // Counts per type
  const { data: rentalPage } = useProperties({ propertyType: "rental" });
  const { data: salePage } = useProperties({ propertyType: "sale" });
  const { data: resalePage } = useProperties({ propertyType: "resale" });
  const { data: newProjectPage } = useProperties({
    propertyType: "newProject",
  });
  const { data: plotLandPage } = useProperties({ propertyType: "plotLand" });

  const typeCounts: Record<PropertyType, number> = {
    rental: rentalPage?.total ?? 0,
    sale: salePage?.total ?? 0,
    resale: resalePage?.total ?? 0,
    newProject: newProjectPage?.total ?? 0,
    plotLand: plotLandPage?.total ?? 0,
  };

  useEffect(() => {
    setPageMeta(
      "PropListify — Find Your Dream Property | Real Estate Listings",
      "Discover exclusive rentals, sales, resales, new projects, and land across the city. PropListify connects you with verified premium real estate.",
      HERO_IMAGE,
      window.location.href,
      "website",
    );
  }, []);

  function handleSearch(filters: PropertyFilters) {
    const params = new URLSearchParams();
    if (filters.search) params.set("q", filters.search);
    if (filters.propertyType) params.set("type", filters.propertyType);
    if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
    void navigate({ to: "/properties", search: Object.fromEntries(params) });
  }

  function handleTypeNavigate(type: PropertyType) {
    void navigate({ to: "/properties", search: { type } });
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        data-ocid="hero-section"
        className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          aria-hidden="true"
        />
        {/* Multi-layer gradient for readability */}
        <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-current" />
              #1 Trusted Real Estate Platform
            </span>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-5 leading-[1.08]">
              Find Your{" "}
              <span className="text-accent italic">Dream Property</span>
            </h1>
            <p className="text-white/75 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Browse exclusive rentals, sales, resales, new projects, and land
              across the city — all in one place.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <SearchBar
              data-ocid="hero-search"
              onSearch={handleSearch}
              className="shadow-2xl"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/properties">
              <Button
                data-ocid="hero-cta-browse"
                size="lg"
                className="cta-primary px-8 py-3 text-sm font-semibold rounded-xl shadow-lg min-w-44"
              >
                Browse Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                data-ocid="hero-cta-contact"
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white px-8 py-3 text-sm font-semibold rounded-xl min-w-44"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────────── */}
      <section data-ocid="stats-section" className="bg-accent py-10 md:py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display font-bold text-3xl md:text-4xl text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/75 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Property Type Navigation ─────────────────────────── */}
      <section
        data-ocid="property-types-section"
        className="py-16 md:py-20 bg-muted/30"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              Browse by Property Type
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              Whether you're renting, buying, or investing — find the perfect
              category for your needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PROPERTY_TYPE_NAV.map((item, i) => (
              <PropertyTypeCard
                key={item.type}
                item={item}
                count={typeCounts[item.type]}
                index={i}
                onNavigate={handleTypeNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────────────── */}
      <section
        data-ocid="featured-section"
        className="py-16 md:py-20 bg-background"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Featured Properties
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                Handpicked premium listings selected by our experts
              </p>
            </div>
            <Link
              to="/properties"
              data-ocid="featured-see-all"
              className="hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop: 3-col grid | Mobile: horizontal scroll */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingFeatured
              ? Array.from({ length: 6 }, (_, i) => `skel-feat-${i}`).map(
                  (key) => (
                    <div
                      key={key}
                      className="rounded-xl overflow-hidden border border-border"
                    >
                      <Skeleton className="aspect-[4/3] w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </div>
                  ),
                )
              : featured?.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
          </div>

          {/* Mobile horizontal scroll carousel */}
          <div className="sm:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {loadingFeatured
                ? Array.from({ length: 3 }, (_, i) => `skel-m-${i}`).map(
                    (key) => (
                      <div
                        key={key}
                        className="snap-start shrink-0 w-72 rounded-xl overflow-hidden border border-border"
                      >
                        <Skeleton className="aspect-[4/3] w-full" />
                        <div className="p-4 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    ),
                  )
                : featured?.map((property) => (
                    <div key={property.id} className="snap-start shrink-0 w-72">
                      <PropertyCard property={property} />
                    </div>
                  ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 sm:hidden">
            <Link to="/properties">
              <Button
                data-ocid="featured-see-all-mobile"
                variant="outline"
                className="gap-2"
              >
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section data-ocid="why-choose-us" className="py-16 md:py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              Why Choose PropListify?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              We combine local expertise with cutting-edge technology to deliver
              an unmatched real estate experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border shadow-card text-center hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog / Market Insights ────────────────────────────── */}
      <section
        data-ocid="blog-section"
        className="py-16 md:py-20 bg-background"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Market Insights
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                Expert guides and market analysis
              </p>
            </div>
            <Link
              to="/blog"
              data-ocid="blog-see-all"
              className="hidden sm:flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200"
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingArticles
              ? Array.from({ length: 3 }, (_, i) => `skel-art-${i}`).map(
                  (key) => (
                    <div
                      key={key}
                      className="rounded-xl overflow-hidden border border-border"
                    >
                      <Skeleton className="aspect-[16/9] w-full" />
                      <div className="p-5 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ),
                )
              : articles?.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
          </div>

          <div className="flex justify-center mt-8 sm:hidden">
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                All Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lead Capture CTA ──────────────────────────────────── */}
      <section
        data-ocid="lead-cta-section"
        className="py-16 md:py-20 bg-muted/30"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                Ready to Find Your
                <br />
                <span className="text-accent">Next Property?</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Our expert agents are available 7 days a week. Fill out the form
                and we'll get back to you within 2 hours.
              </p>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                {[
                  "Free property consultation",
                  "No obligation viewings",
                  "Market valuation reports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-elevated p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-5">
                Send Us an Inquiry
              </h3>
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark CTA Footer Banner ────────────────────────────── */}
      <section
        data-ocid="cta-dark-section"
        className="py-16 md:py-20 bg-primary"
      >
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 text-accent">
              Get in Touch
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
              Your Dream Property
              <br />
              Awaits You Today
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              From first inquiry to final handover — our team is with you every
              step of the way. Start your property journey now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button
                  data-ocid="cta-contact-btn"
                  size="lg"
                  className="cta-primary px-8 py-3 text-sm font-semibold rounded-xl shadow-lg min-w-44"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <a
                href="tel:+1-800-555-0199"
                data-ocid="cta-phone-link"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/15">
                  <Phone className="w-4 h-4 text-accent" />
                </span>
                +1 (800) 555-0199
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
