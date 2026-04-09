// SEO utility for managing document meta, Open Graph, Twitter Cards, and JSON-LD structured data

const SITE_NAME = "PropListify";
const DEFAULT_IMAGE = "/assets/generated/og-default.jpg";

interface MetaOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

function setMeta(name: string, content: string, property = false): void {
  const attr = property ? "property" : "name";
  let el = document.querySelector(
    `meta[${attr}="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function injectJsonLd(id: string, data: object): void {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function setPageMeta(
  title: string,
  description: string,
  image?: string,
  url?: string,
  type: MetaOptions["type"] = "website",
): void {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = image || DEFAULT_IMAGE;
  const canonicalUrl = url || window.location.href;

  document.title = fullTitle;

  // Standard meta
  setMeta("description", description);

  // Open Graph
  setMeta("og:title", fullTitle, true);
  setMeta("og:description", description, true);
  setMeta("og:image", imageUrl, true);
  setMeta("og:url", canonicalUrl, true);
  setMeta("og:type", type, true);
  setMeta("og:site_name", SITE_NAME, true);

  // Twitter Card
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", description);
  setMeta("twitter:image", imageUrl);

  // Canonical
  let canonical = document.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}

export function generatePropertyJsonLD(property: {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  heroImage: string;
  address: string;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
}): void {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${window.location.origin}/properties/${property.slug}`,
    image: property.heroImage,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
    },
    numberOfRooms: property.bedrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.areaSqft,
      unitCode: "FTK",
    },
  };
  injectJsonLd(`ld-json-property-${property.id}`, data);
}

export function generateArticleJsonLD(article: {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  featuredImage: string;
  author: string;
  publishedAt: number;
  updatedAt: number;
}): void {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.featuredImage,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    datePublished: new Date(article.publishedAt / 1_000_000).toISOString(),
    dateModified: new Date(article.updatedAt / 1_000_000).toISOString(),
    url: `${window.location.origin}/blog/${article.slug}`,
  };
  injectJsonLd(`ld-json-article-${article.id}`, data);
}

export function generateBreadcrumbJsonLD(
  items: Array<{ label: string; href?: string }>,
): void {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${window.location.origin}${item.href}` } : {}),
    })),
  };
  injectJsonLd("ld-json-breadcrumb", data);
}
