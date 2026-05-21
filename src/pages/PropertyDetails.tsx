import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Phone, Mail, BedDouble, Bath, Ruler, Trees } from "lucide-react";
import { properties, formatPrice } from "@/lib/properties";
import { useIsFavorite, toggleFavorite } from "@/lib/favorites";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PropertyDetails() {
  // Grab the dynamic ID from the URL (e.g., /property/123)
  const { propertyId } = useParams();
  
  // Find the matching property in your mock data
  const property = properties.find((p) => p.id === propertyId);
  const fav = useIsFavorite(property?.id || "");

  // If someone types a bad URL, show a clean not found state
  if (!property) {
    return (
      <div className="p-8 text-center mt-20">
        <p className="font-medium">Listing not found</p>
        <Link to="/" className="mt-3 inline-block text-sm text-muted-foreground underline">
          Back to listings
        </Link>
      </div>
    );
  }

  const stats = [
    { icon: BedDouble, label: `${property.beds} beds` },
    { icon: Bath, label: `${property.baths} baths` },
    { icon: Ruler, label: `${property.sqft.toLocaleString()} sqft` },
    ...(property.acres > 0
      ? [{ icon: Trees, label: `${property.acres} acre` }]
      : []),
  ];

  return (
    <div className="pb-8">
      {/* Hero image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted sm:aspect-[16/11]">
        <img
          src={property.images[0]}
          alt={property.address}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3" style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}>
          <Link
            to="/"
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </Link>
          <div className="pointer-events-auto flex gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md"
              aria-label="Share"
              onClick={async () => {
                try {
                  if (navigator.share)
                    await navigator.share({ title: property.address, url: window.location.href });
                  else await navigator.clipboard?.writeText(window.location.href);
                } catch {}
              }}
            >
              <Share2 className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              aria-label="Favorite"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md"
            >
              <Heart
                className={cn("h-5 w-5", fav ? "fill-rose-500 stroke-rose-500" : "")}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      {property.images.length > 1 && (
        <div className="grid grid-cols-3 gap-1 px-1 pt-1">
          {property.images.slice(1, 4).map((src: string, i: number) => (
            <div key={i} className="aspect-square overflow-hidden bg-muted">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="px-5 pt-5">
        <p className="text-3xl font-bold tracking-tight">
          {formatPrice(property.price)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {property.address}, {property.city}, {property.state} {property.zip}
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2 rounded-2xl border border-border bg-card p-3">
          {stats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-[11px] font-medium leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        <section className="mt-7">
          <h2 className="text-base font-semibold">About this home</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {property.description}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Meta label="Type" value={property.type} />
            <Meta label="Year built" value={String(property.yearBuilt)} />
            <Meta label="Lot" value={property.acres ? `${property.acres} acre` : "—"} />
            <Meta label="ZIP" value={property.zip} />
          </dl>
        </section>

        <section className="mt-7">
          <MortgageCalculator price={property.price} />
        </section>

        <section className="mt-7 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Listing agent</h2>
          <div className="mt-4 flex items-center gap-3">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{property.agent.name}</p>
              <p className="text-xs text-muted-foreground">
                Brokered by {property.agent.brokerage}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-xl border-border bg-transparent"
            >
              <a href={`tel:${property.agent.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> Call
              </a>
            </Button>
            <Button
              asChild
              className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href={`mailto:hello@housing.app?subject=Inquiry about ${property.address}`}>
                <Mail className="mr-2 h-4 w-4" /> Message
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2.5">
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
    </div>
  );
}