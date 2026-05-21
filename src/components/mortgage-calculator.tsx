import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";

interface Props {
  price: number;
}

export function MortgageCalculator({ price }: Props) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.75);
  const [years, setYears] = useState(30);

  const monthly = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }, [price, downPct, rate, years]);

  const down = price * (downPct / 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold">Mortgage calculator</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Estimated monthly payment
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight">
        ${monthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        <span className="text-base font-normal text-muted-foreground"> /mo</span>
      </p>

      <div className="mt-6 space-y-5">
        <Field
          label="Down payment"
          value={`${downPct}% · $${down.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
        >
          <Slider
            value={[downPct]}
            min={5}
            max={50}
            step={1}
            onValueChange={([v]) => setDownPct(v)}
          />
        </Field>

        <Field label="Interest rate" value={`${rate.toFixed(2)}%`}>
          <Slider
            value={[rate]}
            min={2}
            max={12}
            step={0.05}
            onValueChange={([v]) => setRate(v)}
          />
        </Field>

        <Field label="Loan term" value={`${years} years`}>
          <Slider
            value={[years]}
            min={10}
            max={30}
            step={5}
            onValueChange={([v]) => setYears(v)}
          />
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      {children}
    </div>
  );
}
