import { Bell, ChevronRight, CreditCard, HelpCircle, LogOut, Settings } from "lucide-react";

const items = [
  { icon: Bell, label: "Notifications" },
  { icon: CreditCard, label: "Saved searches" },
  { icon: Settings, label: "Account settings" },
  { icon: HelpCircle, label: "Help center" },
];

export default function Profile() {
  return (
    <div className="px-4 pt-6" style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)" }}>
      <h1 className="font-display text-3xl tracking-tight">Profile</h1>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <img
          src="https://i.pravatar.cc/120?img=68"
          alt="You"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">Alex Morgan</p>
          <p className="text-xs text-muted-foreground">alex@housing.app</p>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {items.map(({ icon: Icon, label }) => (
          <li key={label}>
            <button className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm transition hover:bg-muted/40">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-sm font-medium text-muted-foreground transition hover:text-foreground">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}