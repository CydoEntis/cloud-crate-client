import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { AppSidebar } from "./sidebar/AppSidebar";
import type { ReactNode } from "react";
import { useUserStore } from "@/features/user/userStore";
import UpsertCrateModal from "@/features/crates/components/UpsertCrateModal";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const user = useUserStore((state) => state.user);
  const isUserLoading = useUserStore((state) => state.isLoading);

  const isSidebarLoading = !user && isUserLoading;

  // 🔍 DEBUG: Let's see what's happening
  console.log("🔍 ProtectedLayout Debug:", {
    user: user ? "exists" : "null",
    isUserLoading,
    isSidebarLoading,
  });

  return (
    <SidebarProvider>
      <UpsertCrateModal />
      <AppSidebar isLoading={isSidebarLoading} />
      <SidebarInset className="md:py-4 md:pr-4 bg-sidebar">
        <header className="flex h-12 rounded-t-2xl shrink-0 items-center gap-2 px-4 bg-background">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 sm:p-2 lg:p-10 bg-background rounded-b-2xl">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
