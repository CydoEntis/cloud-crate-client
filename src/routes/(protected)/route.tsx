import { useAuthStore } from "@/features/auth/authStore";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { InviteManagementModal } from "@/features/invites/components/InviteManagementModal";
import { UserDataProvider } from "@/features/user/components/UserDataProvider";
import { ProtectedLayout } from "@/shared/layouts/ProtectedLayout";
import { BanDialog } from "@/shared/components/dialogs/BanDialog";
import { useBanDialogStore } from "@/shared/store/banDialogStore";
import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { userService } from "@/features/user/api/userService";

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
      // console.log("🚫 User not authenticated, redirecting to login");
      throw redirect({ to: "/login" });
    }

    // console.log("✅ User authenticated, proceeding to protected route");

    try {
      // console.log("👤 Pre-loading user data for child routes...");

      const userData = await context.queryClient.ensureQueryData({
        queryKey: ["user", "me"],
        queryFn: () => userService.getUser(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      });

      // console.log("👤 User data pre-loaded:", { isAdmin: userData.isAdmin });
      return { userData };
    } catch (error: any) {
      // console.error("❌ Failed to pre-load user data:", error.message);

      if (error.response?.status === 401) {
        // console.log("🔄 Authentication issue during user data load");
        throw redirect({ to: "/login" });
      }

      // console.warn("⚠️ Continuing without pre-loaded user data");
      return { userData: null };
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
