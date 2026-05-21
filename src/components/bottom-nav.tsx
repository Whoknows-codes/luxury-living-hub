import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/saved", label: "Saved", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-4">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    active && "scale-110",
                  )}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
