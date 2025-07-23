import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { QueryProvider } from "./shared/providers/query-provider";
import "./styles/global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>,
);
