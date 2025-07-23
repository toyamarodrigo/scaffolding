// Example types for home feature
// This is a placeholder - replace with actual home feature types

export type HomeData = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type HomeStats = {
  totalItems: number;
  activeItems: number;
  completedItems: number;
};

export type HomeFilters = {
  status?: "active" | "completed" | "all";
  sortBy?: "date" | "title";
  sortOrder?: "asc" | "desc";
};
