import { useAuthStore } from "@/features/auth/auth.store";
import { UserDataProvider } from "@/features/user/components/user-data-provider";
import { ProtectedLayout } from "@/shared/layouts/ProctedLayout";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: () => {
    const auth = useAuthStore.getState();

    if (!auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProtectedRoute,
});

function ProtectedRoute() {
  return (
    <UserDataProvider>
      <ProtectedLayout>
        <Outlet />
      </ProtectedLayout>
    </UserDataProvider>
  );
}
