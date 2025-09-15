import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { AppProviders } from "./app/providers";
import { router } from "./app/router";
import AuthHydrator from "./features/auth/components/auth-hydrator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <AuthHydrator>
        <RouterProvider router={router} />
      </AuthHydrator>
    </AppProviders>
  </StrictMode>
);
