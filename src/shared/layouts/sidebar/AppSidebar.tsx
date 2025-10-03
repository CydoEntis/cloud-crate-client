import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Settings, Trash2, Box, Shield, X } from "lucide-react";
import logo from "@/assets/cloud-crate-logo.png";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, useSidebar } from "@/shared/components/ui/sidebar";
import { Button } from "@/shared/components/ui/button";
import { useUserStore } from "@/features/user/userStore";
import AddCrateButton from "@/features/crates/components/AddCrateButton";
import SidebarNavlink from "./SidebarNavlink";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import { SidebarUserSection } from "./SidebarUserSection";
import AppSidebarSkeleton from "./AppSidebarSkeleton";
import { Separator } from "@/shared/components/ui/separator";
import { RecentCratesSection } from "./RecentCratesSection";

const navlinks = [
  { id: "crates", text: "Crates", to: "/crates", icon: <Box className="h-4 w-4" /> },
  { id: "trash", text: "Trash", to: "/trash", icon: <Trash2 className="h-4 w-4" /> },
];

const adminNavlinks = [{ id: "admin", text: "Admin Panel", to: "/admin", icon: <Shield className="h-4 w-4" /> }];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isLoading?: boolean;
}

export function AppSidebar({ isLoading = false, ...props }: AppSidebarProps) {
  const user = useUserStore((state) => state.user);
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  if (isLoading) {
    return <AppSidebarSkeleton {...props} />;
  }

  return (
    <Sidebar {...props} className="border-none">
      <SidebarContent className="bg-sidebar flex flex-col justify-between h-full border-none">
        {/* Top Section */}
        <div>
          <div className="py-6 relative px-4">
            <Link to="/" className="flex items-center gap-2" onClick={handleNavClick}>
              <img src={logo} alt="Cloud Crate Logo" className="h-8 w-8" />
              <h3 className="font-bold text-2xl text-primary">Cloud Crate</h3>
            </Link>

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-6"
                onClick={() => setOpenMobile(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <SidebarMenu className="pt-4 pb-8">
            <AddCrateButton />
          </SidebarMenu>

          {user?.isAdmin &&
            adminNavlinks.map((link) => (
              <SidebarMenuItem key={link.id} className="my-1">
                <SidebarNavlink text={link.text} to={link.to} icon={link.icon} onClick={handleNavClick} />
                <div className="px-4 py-2">
                  <Separator />
                </div>
              </SidebarMenuItem>
            ))}

          {/* Main Navigation */}
          <SidebarMenu>
            {navlinks.map((link) => (
              <SidebarMenuItem key={link.id} className="my-1">
                <SidebarNavlink text={link.text} to={link.to} icon={link.icon} onClick={handleNavClick} />
              </SidebarMenuItem>
            ))}
            <RecentCratesSection onItemClick={handleNavClick} />
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
