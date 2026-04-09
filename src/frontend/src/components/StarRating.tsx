import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

const SIZE_MAP = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly = false,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <fieldset
      className="flex items-center gap-0.5 border-0 p-0 m-0"
      aria-label={`Rating: ${value} out of ${max} stars`}
    >
      {stars.map((star) => {
        const filled = star <= value;
        return readOnly ? (
          <Star
            key={star}
            className={cn(
              SIZE_MAP[size],
              filled
                ? "fill-accent text-accent"
                : "fill-muted text-muted-foreground/30",
            )}
          />
        ) : (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            onKeyDown={(e) => e.key === "Enter" && onChange?.(star)}
            aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            className={cn(
              "transition-transform duration-100 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              !readOnly && "cursor-pointer",
            )}
          >
            <Star
              className={cn(
                SIZE_MAP[size],
                filled
                  ? "fill-accent text-accent"
                  : "fill-transparent text-muted-foreground/50 hover:text-accent/70",
              )}
            />
          </button>
        );
      })}
    </fieldset>
  );
}
