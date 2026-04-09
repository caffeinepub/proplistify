import { PropertyBadge } from "@/components/Badge";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bath, Bed, MapPin, Maximize } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const isRental = property.propertyType === "rental";

  return (
    <article
      data-ocid="property-card"
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 flex flex-col",
        className,
      )}
    >
      {/* Image */}
      <Link
        to="/properties/$slug"
        params={{ slug: property.slug }}
        className="relative block overflow-hidden aspect-[4/3]"
      >
        <img
          src={property.heroImage || "/assets/images/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <PropertyBadge type={property.propertyType} />
          {property.isFeatured && (
            <span className="bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-card/95 backdrop-blur-sm text-foreground font-display font-bold text-sm px-3 py-1.5 rounded-full shadow-sm">
            {formatPrice(property.price, isRental)}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display font-semibold text-foreground text-base leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors">
          <Link to="/properties/$slug" params={{ slug: property.slug }}>
            {property.title}
          </Link>
        </h3>

        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {property.address}, {property.city}
          </span>
        </div>

        {property.bedrooms > 0 && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {property.bedrooms} Bed{property.bedrooms !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms} Bath{property.bathrooms !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              {property.areaSqft.toLocaleString()} sqft
            </span>
          </div>
        )}

        <div className="mt-auto">
          <Link
            to="/properties/$slug"
            params={{ slug: property.slug }}
            data-ocid="property-card-cta"
            className="flex items-center justify-center gap-2 w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 group/btn"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export { formatPrice } from "@/lib/format";
