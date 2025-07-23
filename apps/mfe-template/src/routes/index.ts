export { router } from "./router";

// Route utilities
export const ROUTE_PATHS = {
  HOME: "/",
} as const;

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];
