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

const navlinks = [
  { id: 1, text: "Dashboard", to: "/dashboard", icon: <LayoutDashboard /> },
  { id: 2, text: "Crates", to: "/crates", icon: <Box /> },
  { id: 3, text: "Members", to: "/members", icon: <Users2 /> },
  { id: 4, text: "Favorites", to: "/favorites", icon: <Star /> },
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
    <Sidebar {...props}>
      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="py-6">
            <Link to="/" className="flex justify-center items-center gap-2">
              <img src={logo} alt="Cloud Crate Logo" className="h-10 w-10" />
              <h3 className="font-bold text-3xl text-indigo-500">Cloud Crate</h3>
            </Link>
          </div>

          {/* Main Navigation */}
          <SidebarMenu>
            {navlinks.map((link) => (
              <SidebarMenuItem key={link.id} className="my-1">
                <SidebarNavlink text={link.text} to={link.to} icon={link.icon} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarMenu>
            <AddCrateButton />
          </SidebarMenu>
        </div>

        {/* Logout Button */}
        <div className="pb-6 px-4 space-y-4">
          {/* <UpgradeAccountButton /> */}

          <div className="border-t-1 py-4 flex justify-between items-center">
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
              className="py-2 px-4 rounded-md text-center hover:text-primary hover:bg-violet-100 text-gray-500 cursor-pointer "
              variant="ghost"
            >
              <LogOut />
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
