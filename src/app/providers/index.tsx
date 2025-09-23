import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-client";
import { BanDialog } from "@/shared/components/BanDialog";
import { useAuthStore } from "@/features/auth/authStore";
import { useRouter } from "@tanstack/react-router";
import { useBanDialogStore } from "@/shared/store/banDialogStore";

interface AppProvidersProps {
  children: ReactNode;
}

function BanDialogWrapper() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { isOpen, message, hideBanDialog } = useBanDialogStore();

  const handleBanConfirm = () => {
    hideBanDialog();
    clearAuth();
    router.navigate({ to: "/login" });
  };

  return <BanDialog open={isOpen} message={message} onConfirm={handleBanConfirm} />;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors />
        <BanDialogWrapper />
      </QueryProvider>
    </ThemeProvider>
  );
}
