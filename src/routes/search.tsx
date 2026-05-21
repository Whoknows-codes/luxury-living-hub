import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchHeader, defaultFilters, type Filters } from "@/components/search-header";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/properties";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Housing" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
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
        <h1 className="font-display text-3xl tracking-tight">Search</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="mt-4">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </>
  );
}
