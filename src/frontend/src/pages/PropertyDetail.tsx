import { Badge, PropertyBadge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageGallery } from "@/components/ImageGallery";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { usePropertyBySlug } from "@/hooks/use-properties";
import {
  usePropertyRating,
  useReviews,
  useSubmitReview,
} from "@/hooks/use-reviews";
import { formatDate, formatPrice } from "@/lib/format";
import {
  generateBreadcrumbJsonLD,
  generatePropertyJsonLD,
  setPageMeta,
} from "@/seo";
import type { PropertyType, SubmitReviewInput } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  Bath,
  Bed,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Expand,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Share2,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── constants ──────────────────────────────────────────────────────────────────

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  rental: "Rental",
  sale: "For Sale",
  resale: "Resale",
  newProject: "New Project",
  plotLand: "Plot / Land",
};

// ── skeleton ───────────────────────────────────────────────────────────────────

function PropertyDetailSkeleton() {
  return (
    <div data-ocid="property-detail-skeleton">
      <Skeleton className="w-full h-[50vh] md:h-[62vh] rounded-none" />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <div>
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── floorplan lightbox ─────────────────────────────────────────────────────────

function FloorplanLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <dialog
      open
      className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 m-0 max-w-full max-h-full w-full h-full border-0"
      aria-label="Floorplan lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close floorplan"
        className="absolute top-4 right-4 bg-card/20 text-accent-foreground p-2 rounded-full hover:bg-card/40 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt="Floorplan"
        className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-elevated"
      />
    </dialog>
  );
}

// ── overview with read-more ────────────────────────────────────────────────────

function OverviewSection({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 400;
  const display = isLong && !expanded ? `${text.slice(0, 400)}…` : text;

  return (
    <section>
      <h2 className="text-xl font-display font-semibold text-foreground mb-3">
        Overview
      </h2>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
        {display}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm text-accent font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
          data-ocid="overview-toggle"
        >
          {expanded ? (
            <>
              Read Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </section>
  );
}

// ── review form ────────────────────────────────────────────────────────────────

function ReviewForm({ propertyId }: { propertyId: string }) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const submitReview = useSubmitReview();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a star rating.");
      return;
    }
    const input: SubmitReviewInput = {
      propertyId,
      name,
      email,
      rating,
      comment,
    };
    try {
      await submitReview.mutateAsync(input);
      toast.success("Review submitted! It will appear once approved.");
      setRating(0);
      setName("");
      setEmail("");
      setComment("");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-muted/30 rounded-xl p-5 border border-border"
      data-ocid="review-form"
    >
      <h3 className="font-display font-semibold text-foreground">
        Write a Review
      </h3>
      <div className="space-y-1.5">
        <Label>Your Rating *</Label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="review-name">Full Name *</Label>
          <Input
            id="review-name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-ocid="review-name-input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="review-email">Email *</Label>
          <Input
            id="review-email"
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-ocid="review-email-input"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="review-comment">Your Review *</Label>
        <Textarea
          id="review-comment"
          placeholder="Share your experience with this property..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          data-ocid="review-comment-input"
        />
      </div>
      <Button
        type="submit"
        disabled={submitReview.isPending}
        className="w-full bg-accent text-accent-foreground hover:opacity-90 font-semibold h-11"
        data-ocid="review-submit-btn"
      >
        {submitReview.isPending ? "Submitting…" : "Submit Review"}
      </Button>
    </form>
  );
}

// ── main page ──────────────────────────────────────────────────────────────────

export function PropertyDetailPage() {
  const { slug } = useParams({ from: "/properties/$slug" });
  const { data: property, isLoading } = usePropertyBySlug(slug);
  const { data: reviews = [] } = useReviews(property?.id ?? "");
  const { data: ratingData } = usePropertyRating(property?.id ?? "");
  const [floorplanLightbox, setFloorplanLightbox] = useState<string | null>(
    null,
  );
  const [saved, setSaved] = useState(false);
  const leadFormRef = useRef<HTMLDivElement>(null);
  const closeFloorplan = useCallback(() => setFloorplanLightbox(null), []);

  // SEO injection
  useEffect(() => {
    if (!property) return;
    const desc = property.description.slice(0, 160);
    setPageMeta(
      property.title,
      desc,
      property.heroImage,
      window.location.href,
      "product",
    );
    generatePropertyJsonLD(property);
    const typeLabel = PROPERTY_TYPE_LABELS[property.propertyType];
    generateBreadcrumbJsonLD([
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
      { label: typeLabel },
      { label: property.title },
    ]);
  }, [property]);

  if (isLoading) return <PropertyDetailSkeleton />;

  if (!property) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[55vh] gap-5 text-center px-4"
        data-ocid="property-not-found"
      >
        <Building2 className="w-16 h-16 text-muted-foreground/30" />
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Property Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:opacity-90"
          >
            <Link to="/properties">Browse All Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const typeLabel = PROPERTY_TYPE_LABELS[property.propertyType];
  const isRental = property.propertyType === "rental";
  const avg = ratingData?.average ?? 0;
  const count = ratingData?.count ?? 0;
  const breadcrumbs = [
    { label: "Properties", href: "/properties" },
    { label: typeLabel },
    { label: property.title },
  ];

  return (
    <>
      {/* ── Full-width hero ─────────────────────────────────────────────── */}
      <div
        className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden"
        data-ocid="property-hero"
      >
        <img
          src={property.heroImage}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* dark gradient */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Status badge */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <Badge
            variant={
              property.status === "active"
                ? "success"
                : property.status === "pending"
                  ? "warning"
                  : "muted"
            }
            className="text-sm shadow-elevated capitalize"
          >
            {property.status === "active"
              ? "Available"
              : property.status === "pending"
                ? "Pending"
                : property.status === "sold"
                  ? "Sold"
                  : "Inactive"}
          </Badge>
        </div>

        {/* Hero text block */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <PropertyBadge type={property.propertyType} />
              {property.isFeatured && (
                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border bg-accent/20 text-white border-accent/30">
                  Featured
                </span>
              )}
            </div>
            <h1 className="font-display font-bold text-white text-2xl md:text-4xl leading-tight max-w-3xl mb-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-white font-semibold text-xl md:text-2xl">
                {formatPrice(property.price, isRental)}
              </span>
              <span className="flex items-center gap-1.5 text-white/80 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                {property.address}, {property.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page body ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 pb-28 lg:pb-8">
        {/* ── Left / main column ────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-10">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Quick stats bar */}
          <div
            className="flex flex-wrap items-center gap-5 py-4 border-y border-border text-sm"
            data-ocid="property-stats-bar"
          >
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-2 text-foreground">
                <Bed className="w-5 h-5 text-accent" />
                <span>
                  {property.bedrooms} Bedroom
                  {property.bedrooms !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-2 text-foreground">
                <Bath className="w-5 h-5 text-accent" />
                <span>
                  {property.bathrooms} Bathroom
                  {property.bathrooms !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-foreground">
              <Ruler className="w-5 h-5 text-accent" />
              <span>{property.areaSqft.toLocaleString()} sqft</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{property.city}</span>
            </div>
            {count > 0 && (
              <div className="flex items-center gap-2">
                <StarRating value={avg} readOnly size="sm" />
                <span className="text-muted-foreground">
                  {avg} ({count} review{count !== 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>

          {/* Property details grid */}
          <section data-ocid="property-details-grid">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              Property Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-card">
                  <Bed className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold text-foreground">
                      {property.bedrooms}
                    </p>
                  </div>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-card">
                  <Bath className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold text-foreground">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-card">
                <Ruler className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="font-semibold text-foreground">
                    {property.areaSqft.toLocaleString()} sqft
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-card">
                <Building2 className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold text-foreground">{typeLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-card">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="font-semibold text-foreground">
                    {property.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-card">
                <Calendar className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Listed</p>
                  <p className="font-semibold text-foreground text-xs">
                    {formatDate(property.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Photo gallery */}
          {property.galleryImages.length > 0 && (
            <section data-ocid="property-gallery">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                Photo Gallery
              </h2>
              <ImageGallery
                images={property.galleryImages}
                alt={property.title}
              />
            </section>
          )}

          {/* Overview */}
          {property.overview && <OverviewSection text={property.overview} />}

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <section data-ocid="property-amenities">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-foreground bg-muted/40 border border-border rounded-lg px-3 py-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {amenity}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Floor plans */}
          {property.floorplans.length > 0 && (
            <section data-ocid="property-floorplans">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                Floor Plans
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.floorplans.map((plan, i) => {
                  const isPdf = plan.toLowerCase().endsWith(".pdf");
                  return (
                    <div
                      key={plan}
                      className="group relative bg-muted border border-border rounded-xl overflow-hidden"
                    >
                      {isPdf ? (
                        <a
                          href={plan}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`floorplan-pdf-${i}`}
                          aria-label={`Download floor plan ${i + 1}`}
                          className="flex flex-col items-center justify-center h-32 gap-2 text-sm text-muted-foreground hover:text-accent transition-colors p-4"
                        >
                          <Download className="w-8 h-8" />
                          <span className="font-medium text-center">
                            Floor Plan {i + 1}
                          </span>
                          <span className="text-xs">Download PDF</span>
                        </a>
                      ) : (
                        <>
                          <img
                            src={plan}
                            alt={`Floor plan ${i + 1}`}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => setFloorplanLightbox(plan)}
                            aria-label={`View floor plan ${i + 1} full size`}
                            className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-200"
                            data-ocid={`floorplan-thumb-${i}`}
                          >
                            <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Description */}
          <section data-ocid="property-description">
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              About This Property
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </section>

          {/* Reviews */}
          <section data-ocid="property-reviews">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Reviews
              </h2>
              {count > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating value={avg} readOnly size="sm" />
                  <span className="text-sm font-semibold text-foreground">
                    {avg}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({count} review{count !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
            </div>

            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground mb-8">
                No reviews yet. Be the first to share your experience!
              </p>
            ) : (
              <div className="space-y-4 mb-8">
                {reviews.map((review) => (
                  <Card
                    key={review.id}
                    className="shadow-card"
                    data-ocid={`review-item-${review.id}`}
                  >
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm leading-tight">
                              {review.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <StarRating value={review.rating} readOnly size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <ReviewForm propertyId={property.id} />
          </section>
        </div>

        {/* ── Right / sidebar column ────────────────────────────────────── */}
        <div className="space-y-5">
          <div ref={leadFormRef} className="lg:sticky lg:top-24 space-y-4">
            {/* Lead capture card */}
            <Card
              className="shadow-elevated border-border overflow-hidden"
              data-ocid="lead-capture-sidebar"
            >
              <CardHeader className="bg-accent/5 border-b border-border pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <CardTitle className="text-base font-display">
                    Enquire About This Property
                  </CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  Fill in your details and we'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent className="pt-5">
                <LeadCaptureForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                />
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2 text-sm"
                onClick={() =>
                  navigator.share?.({
                    title: property.title,
                    url: window.location.href,
                  })
                }
                data-ocid="share-btn"
              >
                <Share2 className="w-4 h-4" /> Share
              </Button>
              <Button
                variant="outline"
                className={`flex-1 gap-2 text-sm ${saved ? "text-accent border-accent/50" : ""}`}
                onClick={() => {
                  setSaved((v) => !v);
                  toast.success(
                    saved ? "Removed from saved." : "Property saved!",
                  );
                }}
                data-ocid="save-btn"
              >
                <Heart
                  className={`w-4 h-4 ${saved ? "fill-accent text-accent" : ""}`}
                />
                {saved ? "Saved" : "Save"}
              </Button>
            </div>

            {/* Quick summary card */}
            <Card className="shadow-card">
              <CardContent className="pt-5 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(property.price, isRental)}
                  </span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-semibold text-foreground">
                      {property.bedrooms}
                    </span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-semibold text-foreground">
                      {property.bathrooms}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Area</span>
                  <span className="font-semibold text-foreground">
                    {property.areaSqft.toLocaleString()} sqft
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <PropertyBadge type={property.propertyType} />
                </div>
                {count > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1.5">
                      <StarRating value={avg} readOnly size="sm" />
                      <span className="font-semibold text-foreground">
                        {avg}
                      </span>
                    </div>
                  </div>
                )}
                <Separator />
                <div className="flex items-center gap-3 pt-1">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Call us directly
                    </p>
                    <a
                      href="tel:+12125551234"
                      className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      +1 (212) 555-1234
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom CTA ─────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 flex gap-3 shadow-elevated"
        data-ocid="mobile-sticky-cta"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            {property.title}
          </p>
          <p className="font-semibold text-foreground text-sm">
            {formatPrice(property.price, isRental)}
          </p>
        </div>
        <Button
          onClick={() =>
            leadFormRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="shrink-0 bg-accent text-accent-foreground hover:opacity-90 font-semibold"
          data-ocid="mobile-enquire-btn"
        >
          Enquire Now
        </Button>
      </div>

      {/* ── Floorplan lightbox ───────────────────────────────────────────── */}
      {floorplanLightbox && (
        <FloorplanLightbox src={floorplanLightbox} onClose={closeFloorplan} />
      )}
    </>
  );
}
