import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-client";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors />
      </QueryProvider>
    </ThemeProvider>
  );
}
