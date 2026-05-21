import { Link } from "@tanstack/react-router";
import { ChevronLeft, Share2, Heart, ChevronRight } from "lucide-react";
import { useIsFavorite, toggleFavorite } from "@/lib/favorites";
import { formatPrice, type Property } from "@/lib/properties";
import { ImageCarousel } from "./image-carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusStyles: Record<Property["status"], { dot: string; label: string; text: string }> = {
  "for-sale": { dot: "bg-success", label: "For sale", text: "text-success" },
  new: { dot: "bg-success", label: "New", text: "text-success" },
  viewed: { dot: "bg-muted-foreground", label: "Viewed", text: "text-muted-foreground" },
  pending: { dot: "bg-amber-400", label: "Pending", text: "text-amber-400" },
};

interface Props {
  property: Property;
  showBack?: boolean;
}

export function PropertyCard({ property, showBack }: Props) {
  const fav = useIsFavorite(property.id);
  const status = statusStyles[property.status];

  const onShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/property/${property.id}`
        : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${property.address}, ${property.city}`,
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  };

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <article className="mb-4 overflow-hidden rounded-3xl bg-card shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]">
      <div className="relative aspect-[4/5] sm:aspect-[16/11]">
        <Link
          to="/property/$propertyId"
          params={{ propertyId: property.id }}
          className="block h-full w-full"
        >
          <ImageCarousel images={property.images} alt={property.address} />
        </Link>

        {/* Top controls */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {showBack ? (
            <button
              onClick={() => history.back()}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/70"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            </button>
          ) : (
            <span className="h-10 w-10" />
          )}
          <button
            onClick={onShare}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/70"
            aria-label="Share"
          >
            <Share2 className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        </div>

        {/* Favorite (bottom-right of image) */}
        <button
          onClick={onFav}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/70"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              fav ? "fill-rose-500 stroke-rose-500" : "fill-transparent",
            )}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Details */}
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[22px] font-semibold leading-tight tracking-tight">
            {property.city}, {property.state}
          </h3>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[13px]">
          <span className={cn("flex items-center gap-1.5 font-medium", status.text)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
            {status.label}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="text-muted-foreground">
            {property.baths} Bathroom{property.baths > 1 ? "s" : ""}
          </span>
        </div>

        <p className="mt-3 text-[26px] font-bold tracking-tight">
          {formatPrice(property.price)}
        </p>

        <p className="mt-2 text-[13.5px] text-muted-foreground">
          {property.beds} beds &nbsp;·&nbsp; {property.baths} baths &nbsp;·&nbsp;{" "}
          {property.sqft.toLocaleString()} sqft
          {property.acres > 0 && <> &nbsp;·&nbsp; {property.acres} acre</>}
        </p>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          {property.address}, {property.city}
        </p>

        <Button
          asChild
          className="mt-5 h-12 w-full rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Link to="/property/$propertyId" params={{ propertyId: property.id }}>
            Contact agent
          </Link>
        </Button>
      </div>
    </article>
  );
}
