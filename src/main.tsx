import "./globals.css";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { useAuthStore } from "@/features/auth"; // ✅ import auth store

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ✅ This hydrates auth state on first load
function AuthHydrator({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuth(token);
    }
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthHydrator>
          <Toaster position="top-right" richColors />
          <RouterProvider router={router} />
        </AuthHydrator>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
