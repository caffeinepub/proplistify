const SITE_NAME = "PropListify";
const DEFAULT_IMAGE = "/assets/generated/og-default.jpg";
function setMeta(name, content, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(
    `meta[${attr}="${name}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function injectJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}
function setPageMeta(title, description, image, url, type = "website") {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = image || DEFAULT_IMAGE;
  const canonicalUrl = url || window.location.href;
  document.title = fullTitle;
  setMeta("description", description);
  setMeta("og:title", fullTitle, true);
  setMeta("og:description", description, true);
  setMeta("og:image", imageUrl, true);
  setMeta("og:url", canonicalUrl, true);
  setMeta("og:type", type, true);
  setMeta("og:site_name", SITE_NAME, true);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", description);
  setMeta("twitter:image", imageUrl);
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}
function generatePropertyJsonLD(property) {
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
      availability: "https://schema.org/InStock"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city
    },
    numberOfRooms: property.bedrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.areaSqft,
      unitCode: "FTK"
    }
  };
  injectJsonLd(`ld-json-property-${property.id}`, data);
}
function generateArticleJsonLD(article) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.featuredImage,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME
    },
    datePublished: new Date(article.publishedAt / 1e6).toISOString(),
    dateModified: new Date(article.updatedAt / 1e6).toISOString(),
    url: `${window.location.origin}/blog/${article.slug}`
  };
  injectJsonLd(`ld-json-article-${article.id}`, data);
}
function generateBreadcrumbJsonLD(items) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...item.href ? { item: `${window.location.origin}${item.href}` } : {}
    }))
  };
  injectJsonLd("ld-json-breadcrumb", data);
}
export {
  generatePropertyJsonLD as a,
  generateArticleJsonLD as b,
  generateBreadcrumbJsonLD as g,
  setPageMeta as s
};
