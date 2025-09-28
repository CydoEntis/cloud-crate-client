import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Settings, Trash2, Box, Shield } from "lucide-react";
import logo from "@/assets/cloud-crate-logo.png";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { useUserStore } from "@/features/user/userStore";
import AddCrateButton from "@/features/crates/components/AddCrateButton";
import SidebarNavlink from "./SidebarNavlink";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import { SidebarUserSection } from "./SidebarUserSection";
import AppSidebarSkeleton from "./AppSidebarSkeleton";

const navlinks = [
  { id: "crates", text: "Crates", to: "/crates", icon: <Box /> },
  { id: "deleted", text: "Deleted Files", to: "/deleted", icon: <Trash2 /> },
  { id: "settings", text: "Settings", to: "/settings", icon: <Settings /> },
];

const adminNavlinks = [{ id: "admin", text: "Admin Panel", to: "/admin", icon: <Shield /> }];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isLoading?: boolean;
}

export function AppSidebar({ isLoading = false, ...props }: AppSidebarProps) {
  const user = useUserStore((state) => state.user);


  if (isLoading) {
    return <AppSidebarSkeleton {...props} />;
  }

  return (
    <Sidebar {...props} className="border-none">
      <SidebarContent className="bg-sidebar flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          <div className="py-6">
            <Link to="/" className="flex justify-center items-center gap-2">
              <img src={logo} alt="Cloud Crate Logo" className="h-10 w-10" />
              <h3 className="font-bold text-3xl text-primary">Cloud Crate</h3>
            </Link>
          </div>
          <SidebarMenu className="pt-4 pb-8">
            <AddCrateButton />
          </SidebarMenu>

          {/* Main Navigation */}
          <SidebarMenu>
            {navlinks.map((link) => (
              <SidebarMenuItem key={link.id} className="my-1">
                <SidebarNavlink text={link.text} to={link.to} icon={link.icon} />
              </SidebarMenuItem>
            ))}

            {user?.isAdmin &&
              adminNavlinks.map((link) => (
                <SidebarMenuItem key={link.id} className="my-1">
                  <SidebarNavlink text={link.text} to={link.to} icon={link.icon} />
                </SidebarMenuItem>
              ))}
          </SidebarMenu>

          <SidebarMenu className="pt-4 pb-8 px-5">
            <ThemeToggle />
          </SidebarMenu>
        </div>
        <SidebarUserSection />
      </SidebarContent>
    </Sidebar>
  );
}
