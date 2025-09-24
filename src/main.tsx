import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { router } from "./app/router";
import { AppProvider } from "./app/providers/AppProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider queryClient={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
    </AppProvider>
  </StrictMode>
);
