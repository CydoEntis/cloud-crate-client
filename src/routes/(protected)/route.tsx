import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth";
import CreateCrateModal from "@/features/crates/components/CreateCrateModal";
import { InviteModal } from "@/features/invites/components/inviteModal";
import { useGetCurrentUserProfile } from "@/features/user/hooks/useGetUserProfile";
import { AppSidebar } from "@/layouts/sidebar/AppSidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: () => {
    const auth = useAuthStore.getState();
    if (!auth.isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, isError, data: user } = useGetCurrentUserProfile();

  if (isLoading) return <div>Loading user data...</div>;
  if (isError) return <div>Failed to load user data</div>;

  return (
    <SidebarProvider>
      <CreateCrateModal />
      <InviteModal />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-10 bg-gray-50 dark:bg-slate-950">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
