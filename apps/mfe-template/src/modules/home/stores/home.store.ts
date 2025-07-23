// Example store for home feature
// This is a placeholder - replace with actual state management

import type { HomeData, HomeFilters } from "../types/home.types";
import { create } from "zustand";

type HomeStore = {
  // State
  items: HomeData[];
  filters: HomeFilters;
  loading: boolean;
  error: string | null;

  // Actions
  setItems: (items: HomeData[]) => void;
  setFilters: (filters: HomeFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export const useHomeStore = create<HomeStore>(set => ({
  // Initial state
  items: [],
  filters: { status: "all", sortBy: "date", sortOrder: "desc" },
  loading: false,
  error: null,

  // Actions
  setItems: items => set({ items }),
  setFilters: filters => set({ filters }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  clearError: () => set({ error: null }),
}));
