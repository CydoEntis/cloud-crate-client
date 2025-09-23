import { useAuthStore } from "@/features/auth/authStore";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { InviteManagementModal } from "@/features/invites/components/InviteManagementModal";
import { UserDataProvider } from "@/features/user/components/UserDataProvider";
import { ProtectedLayout } from "@/shared/layouts/ProctedLayout";
import { authService } from "@/features/auth/api/authService";
import { BanDialog } from "@/shared/components/BanDialog";
import { useBanDialogStore } from "@/shared/store/banDialogStore";
import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";

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

export const Route = createFileRoute("/(protected)")({
  beforeLoad: async ({ context }) => {
    const auth = useAuthStore.getState();

    if (!auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }

    try {
      await context.queryClient.ensureQueryData({
        queryKey: ["auth", "me"],
        queryFn: () => authService.me(),
        staleTime: 0,
        retry: false,
      });
    } catch (error) {
      console.log("Ban check failed during route load:", error);
    }
  },
  component: ProtectedRoute,
});

function ProtectedRoute() {
  return (
    <AuthGuard>
      <UserDataProvider>
        <ProtectedLayout>
          <Outlet />
          <InviteManagementModal />
        </ProtectedLayout>
      </UserDataProvider>
      <BanDialogWrapper />
    </AuthGuard>
  );
}
