import { createBrowserRouter } from "react-router";
import { Layout } from "@/layout/layout";
import { homeRoutes } from "@/modules/home/routes/home.routes";
import { RouteErrorBoundary } from "./route-error-boundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout title="Microfrontend Template" />,
    errorElement: <RouteErrorBoundary />,
    children: [
      ...homeRoutes,
      {
        path: "home",
        children: homeRoutes,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Layout title="404 - Page Not Found">
        <div className="not-found">
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      </Layout>
    ),
  },
]);
