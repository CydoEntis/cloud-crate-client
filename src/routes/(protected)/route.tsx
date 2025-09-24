import { useAuthStore } from "@/features/auth/authStore";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { InviteManagementModal } from "@/features/invites/components/InviteManagementModal";
import { UserDataProvider } from "@/features/user/components/UserDataProvider";
import { ProtectedLayout } from "@/shared/layouts/ProctedLayout";
import { BanDialog } from "@/shared/components/BanDialog";
import { useBanDialogStore } from "@/shared/store/banDialogStore";
import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";

function BanDialogWrapper() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { isOpen, message, hideBanDialog } = useBanDialogStore();

  const handleBanConfirm = () => {
    hideBanDialog();
    logout();
    router.navigate({ to: "/login" });
  };

  return <BanDialog open={isOpen} message={message} onConfirm={handleBanConfirm} />;
}

export const Route = createFileRoute("/(protected)")({
  beforeLoad: async ({ context }) => {
    const auth = useAuthStore.getState();
    if (!auth.isAuthenticated) {
      console.log("🚫 User not authenticated, redirecting to login");
      throw redirect({ to: "/login" });
    }

    console.log("✅ User authenticated, proceeding to protected route");
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
