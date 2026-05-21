import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useFavoriteIds } from "@/lib/favorites";
import { properties } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved homes — Housing" }] }),
  component: SavedPage,
});

function SavedPage() {
  const ids = useFavoriteIds();
  const saved = properties.filter((p) => ids.has(p.id));

  return (
    <div className="px-4 pt-6" style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)" }}>
      <h1 className="font-display text-3xl tracking-tight">Saved</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        {saved.length} favorite{saved.length === 1 ? "" : "s"}
      </p>

      <div className="mt-5">
        {saved.length ? (
          saved.map((p) => <PropertyCard key={p.id} property={p} />)
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
            <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 font-medium">No saved homes yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tap the heart on any listing to save it here.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Browse homes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
