import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function ImageGallery({
  images,
  alt = "Property image",
  className,
}: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
    [images.length],
  );

  if (!images.length) return null;

  return (
    <>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden bg-muted group",
          className,
        )}
      >
        {/* Main image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
          {/* Lightbox trigger */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="Open full size image"
            className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm text-foreground p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-card/80 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-foreground">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm text-foreground p-2 rounded-full hover:bg-card transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm text-foreground p-2 rounded-full hover:bg-card transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-none">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200",
                  i === current
                    ? "border-accent opacity-100"
                    : "border-transparent opacity-60 hover:opacity-80",
                )}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 m-0 max-w-full max-h-full w-full h-full border-0"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 bg-card/20 text-accent-foreground p-2 rounded-full hover:bg-card/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/20 text-accent-foreground p-3 rounded-full hover:bg-card/40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/20 text-accent-foreground p-3 rounded-full hover:bg-card/40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </dialog>
      )}
    </>
  );
}
