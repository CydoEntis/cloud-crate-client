import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { QueryClient } from "@tanstack/react-query";

interface AppProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export function AppProvider({ children, queryClient }: AppProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <QueryProvider queryClient={queryClient}>
        {children}
        <Toaster position="top-right" richColors />
      </QueryProvider>
    </ThemeProvider>
  );
}
