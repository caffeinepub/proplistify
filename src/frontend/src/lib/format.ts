export function formatPrice(price: number, isRental = false): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M${isRental ? "/mo" : ""}`;
  }
  if (price >= 1_000) {
    return `$${(price / 1_000).toFixed(price % 1_000 === 0 ? 0 : 1)}K${isRental ? "/mo" : ""}`;
  }
  return `$${price.toLocaleString()}${isRental ? "/mo" : ""}`;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp / 1_000_000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
