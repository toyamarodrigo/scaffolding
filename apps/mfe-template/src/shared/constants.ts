export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
} as const;

export const STORAGE_KEYS = {
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
} as const;
