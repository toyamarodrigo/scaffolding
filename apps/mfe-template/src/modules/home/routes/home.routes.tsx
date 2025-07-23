import type { RouteObject } from "react-router";
import { ModuleErrorBoundary } from "@/shared/components";
import { HomeContainer } from "../containers/home.container";

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <ModuleErrorBoundary>
        <HomeContainer />
      </ModuleErrorBoundary>
    ),
  },
];

// Route constants for type safety
export const HOME_ROUTES = {
  ROOT: "",
} as const;
