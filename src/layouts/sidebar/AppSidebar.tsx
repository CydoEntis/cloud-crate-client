import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/cloud-crate-logo.png";
import SidebarNavlink from "./SidebarNavlink";
import { Files, LayoutDashboard, Settings, Star, Trash2, Users2, Plus, Box, Award, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import UpgradeAccountButton from "@/features/user/components/UpgradeAccountButton";
import { useAuthStore, useUserStore } from "@/features/auth";
import CrateSidebarLinks from "@/features/crates/components/CrateSideBarLinks";
import AddCrateButton from "@/features/crates/components/AddCrateButton";
import ThemeToggle from "@/components/ThemeToggle";

const navlinks = [
  { id: 2, text: "Crates", to: "/crates", icon: <Box /> },
  { id: 5, text: "Deleted Files", to: "/deleted", icon: <Trash2 /> },
  { id: 6, text: "Settings", to: "/settings", icon: <Settings /> },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    useAuthStore.getState().clearAuth();
    navigate({ to: "/login" });
  };

  return (
    <Sidebar {...props} className="border-none">
      <SidebarContent className="bg-sidebar flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          {/* Logo */}
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
          </SidebarMenu>
        </div>

        {/* Bottom Section */}
        <div className="pb-6 px-4 space-y-4">
          <ThemeToggle />

          <div className="border-t pt-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-9 h-9 rounded-md overflow-hidden">
                <img src={user?.profilePicture} />
              </div>
              <div>
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={logout}
              className="p-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              variant="ghost"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
