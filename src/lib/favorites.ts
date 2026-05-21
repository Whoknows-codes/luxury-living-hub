import * as React from "react";
import { create } from "zustand";

interface FavoritesState {
  ids: Set<string>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  ids: new Set<string>(),
  toggle: (id) =>
    set((s) => {
      const next = new Set(s.ids);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ids: next };
    }),
  has: (id) => get().ids.has(id),
}));

export function useIsFavorite(id: string) {
  return useFavorites((s) => s.ids.has(id));
}

// avoid unused import warning if tree-shaken
void React;
