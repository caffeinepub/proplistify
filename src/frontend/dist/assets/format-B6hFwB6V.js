function formatPrice(price, isRental = false) {
  if (price >= 1e6) {
    return `$${(price / 1e6).toFixed(price % 1e6 === 0 ? 0 : 1)}M${isRental ? "/mo" : ""}`;
  }
  if (price >= 1e3) {
    return `$${(price / 1e3).toFixed(price % 1e3 === 0 ? 0 : 1)}K${isRental ? "/mo" : ""}`;
  }
  return `$${price.toLocaleString()}${isRental ? "/mo" : ""}`;
}
function formatDate(timestamp) {
  const date = new Date(timestamp / 1e6);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
export {
  formatDate as a,
  formatPrice as f,
  slugify as s
};
