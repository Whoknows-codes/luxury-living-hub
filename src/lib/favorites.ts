import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let favorites: Set<string> = new Set();

if (typeof window !== "undefined") {
  try {
    const raw = window.localStorage.getItem("housing:favorites");
    if (raw) favorites = new Set(JSON.parse(raw));
  } catch {}
}

function emit() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        "housing:favorites",
        JSON.stringify([...favorites]),
      );
    } catch {}
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function toggleFavorite(id: string) {
  const next = new Set(favorites);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  favorites = next;
  emit();
}

export function useIsFavorite(id: string) {
  return useSyncExternalStore(
    subscribe,
    () => favorites.has(id),
    () => false,
  );
}

export function useFavoriteIds() {
  return useSyncExternalStore(
    subscribe,
    () => favorites,
    () => favorites,
  );
}
