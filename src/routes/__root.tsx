import * as React from "react";
import { QueryClient } from "@tanstack/react-query";
import { BanDialog } from "@/shared/components/BanDialog";
import { useAuthStore } from "@/features/auth/authStore";
import { createRootRouteWithContext, Outlet, useRouter } from "@tanstack/react-router";
import { useBanDialogStore } from "@/shared/store/banDialogStore";

export type RouterContext = {
  queryClient: QueryClient;
};

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

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <p>Not found</p>,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <BanDialogWrapper />
    </React.Fragment>
  );
}
