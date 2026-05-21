import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchHeader, defaultFilters, type Filters } from "@/components/search-header";
import { PropertyCard } from "@/components/property-card";
import { MapView } from "@/components/map-view";
import { properties } from "@/lib/properties";
import { cn } from "@/lib/utils";
import { LayoutGrid, Map as MapIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Housing — Find your next home" },
      {
        name: "description",
        content: "Premium real estate listings in a modern, mobile-first dark experience.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return properties.filter((p) => {
      if (q) {
        const hay = `${p.address} ${p.city} ${p.state} ${p.zip}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.beds && p.beds < filters.beds) return false;
      if (filters.baths && p.baths < filters.baths) return false;
      if (filters.type !== "Any" && p.type !== filters.type) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <SearchHeader filters={filters} onChange={setFilters} />

      <div className="px-4 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl leading-none tracking-tight">
              Housing
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {filtered.length} home{filtered.length === 1 ? "" : "s"} for you
            </p>
          </div>
          <div className="flex rounded-full border border-border bg-card p-1 text-xs">
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition",
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> List
            </button>
            <button
              onClick={() => setView("map")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition",
                view === "map"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              <MapIcon className="h-3.5 w-3.5" /> Map
            </button>
          </div>
        </div>

        {view === "list" ? (
          filtered.length ? (
            filtered.map((p) => <PropertyCard key={p.id} property={p} />)
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-medium">No matches</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try widening your filters.
              </p>
            </div>
          )
        ) : (
          <MapView properties={filtered.length ? filtered : properties} />
        )}
      </div>
    </>
  );
}
