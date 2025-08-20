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
    <SidebarProvider >
      <CreateCrateModal />
      <InviteModal />
      <AppSidebar />
      <SidebarInset className="md:py-4 md:pr-4 bg-background md:bg-sidebar">
        <header className="flex h-12 rounded-t-xl shrink-0 items-center gap-2 border-b border-sidebar px-4 bg-background">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 sm:p-2 lg:p-10 bg-background rounded-b-xl">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
