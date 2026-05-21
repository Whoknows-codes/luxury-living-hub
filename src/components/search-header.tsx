import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Filters {
  query: string;
  priceMin: number;
  priceMax: number;
  beds: number;
  baths: number;
  type: "Any" | "House" | "Condo" | "Townhouse" | "Land";
}

export const defaultFilters: Filters = {
  query: "",
  priceMin: 0,
  priceMax: 3_000_000,
  beds: 0,
  baths: 0,
  type: "Any",
};

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const types: Filters["type"][] = ["Any", "House", "Condo", "Townhouse", "Land"];

export function SearchHeader({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Filters>(filters);

  const apply = () => {
    onChange(draft);
    setOpen(false);
  };

  const reset = () => setDraft(defaultFilters);

  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `$${(n / 1000).toFixed(0)}k`;

  return (
    <header
      className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            placeholder="City, ZIP, address"
            className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          {filters.query && (
            <button
              onClick={() => onChange({ ...filters, query: "" })}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Sheet open={open} onOpenChange={(o) => { setOpen(o); if (o) setDraft(filters); }}>
          <SheetTrigger asChild>
            <button
              aria-label="Filters"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground"
            >
              <SlidersHorizontal className="h-4.5 w-4.5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-3xl border-border bg-card pb-8"
          >
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-7 px-1">
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-medium">Price range</h4>
                  <span className="text-xs text-muted-foreground">
                    {fmt(draft.priceMin)} – {fmt(draft.priceMax)}
                  </span>
                </div>
                <Slider
                  value={[draft.priceMin, draft.priceMax]}
                  min={0}
                  max={3_000_000}
                  step={50_000}
                  onValueChange={([min, max]) =>
                    setDraft({ ...draft, priceMin: min, priceMax: max })
                  }
                />
              </section>

              <section>
                <h4 className="mb-3 text-sm font-medium">Beds</h4>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <Pill
                      key={n}
                      active={draft.beds === n}
                      onClick={() => setDraft({ ...draft, beds: n })}
                    >
                      {n === 0 ? "Any" : `${n}+`}
                    </Pill>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-sm font-medium">Baths</h4>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Pill
                      key={n}
                      active={draft.baths === n}
                      onClick={() => setDraft({ ...draft, baths: n })}
                    >
                      {n === 0 ? "Any" : `${n}+`}
                    </Pill>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-sm font-medium">Property type</h4>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <Pill
                      key={t}
                      active={draft.type === t}
                      onClick={() => setDraft({ ...draft, type: t })}
                    >
                      {t}
                    </Pill>
                  ))}
                </div>
              </section>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl border-border bg-transparent"
                  onClick={reset}
                >
                  Reset
                </Button>
                <Button
                  className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={apply}
                >
                  Show results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-medium transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-muted-foreground/40",
      )}
    >
      {children}
    </button>
  );
}
