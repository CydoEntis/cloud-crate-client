import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { Skeleton } from "@/shared/components/ui/skeleton";

function AppSidebarSkeleton({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-none">
      <SidebarContent className="bg-sidebar flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          {/* Logo Skeleton */}
          <div className="py-6 flex justify-center items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-8 w-32" />
          </div>

          {/* Add Crate Button Skeleton */}
          <SidebarMenu className="pt-4 pb-8">
            <SidebarMenuItem>
              <Skeleton className="h-10 w-full rounded-md" />
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Navigation Skeleton */}
          <SidebarMenu>
            {/* Main nav items - we know there are always 3 */}
            {Array.from({ length: 3 }).map((_, index) => (
              <SidebarMenuItem key={`nav-skeleton-${index}`} className="my-1">
                <div className="flex items-center gap-3 p-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </SidebarMenuItem>
            ))}

            {/* Admin nav skeleton - we'll show this conditionally */}
            <SidebarMenuItem className="my-1">
              <div className="flex items-center gap-3 p-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-24" />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Theme Toggle Skeleton */}
          <SidebarMenu className="pt-4 pb-8 px-5">
            <Skeleton className="h-6 w-12 rounded-full" />
          </SidebarMenu>
        </div>

        {/* Bottom Section - User Area Skeleton */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebarSkeleton;
