import type { Property } from "@/lib/properties";
import { formatPrice } from "@/lib/properties";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

interface Props {
  properties: Property[];
}

export function MapView({ properties }: Props) {
  const [active, setActive] = useState<string | null>(properties[0]?.id ?? null);

  const bounds = useMemo(() => {
    const lats = properties.map((p) => p.lat);
    const lngs = properties.map((p) => p.lng);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [properties]);

  const pos = (p: Property) => {
    const xPad = 0.1;
    const yPad = 0.12;
    const x =
      ((p.lng - bounds.minLng) / Math.max(0.001, bounds.maxLng - bounds.minLng)) *
        (1 - xPad * 2) +
      xPad;
    const y =
      1 -
      (((p.lat - bounds.minLat) / Math.max(0.001, bounds.maxLat - bounds.minLat)) *
        (1 - yPad * 2) +
        yPad);
    return { left: `${x * 100}%`, top: `${y * 100}%` };
  };

  const activeProp = properties.find((p) => p.id === active);

  return (
    <div className="relative h-[calc(100dvh-180px)] w-full overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.06),transparent_55%)]">
      {/* faux grid */}
      <svg
        className="absolute inset-0 h-full w-full text-muted/40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {properties.map((p) => {
        const isActive = p.id === active;
        return (
          <button
            key={p.id}
            style={pos(p)}
            onClick={() => setActive(p.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg transition-all ${
              isActive
                ? "z-20 scale-110 border-primary bg-primary text-primary-foreground"
                : "z-10 border-border bg-card text-foreground hover:border-foreground/50"
            }`}
          >
            {p.price >= 1_000_000
              ? `$${(p.price / 1_000_000).toFixed(2)}M`
              : `$${(p.price / 1000).toFixed(0)}k`}
          </button>
        );
      })}

      {activeProp && (
        <Link
          to="/property/$propertyId"
          params={{ propertyId: activeProp.id }}
          className="absolute inset-x-3 bottom-3 z-30 flex gap-3 rounded-2xl border border-border bg-card/95 p-3 backdrop-blur-md"
        >
          <img
            src={activeProp.images[0]}
            alt=""
            className="h-20 w-24 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">
              {formatPrice(activeProp.price)}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {activeProp.beds} bd · {activeProp.baths} ba ·{" "}
              {activeProp.sqft.toLocaleString()} sqft
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {activeProp.address}, {activeProp.city}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
