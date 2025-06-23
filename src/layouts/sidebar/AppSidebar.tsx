import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/cloud-crate-logo.png";
import SidebarNavlink from "./SidebarNavlink";
import { Files, LayoutDashboard, Settings, Star, Trash2, Users2, Plus, Box, Award } from "lucide-react";
import { useAuthStore } from "@/features/auth/authStore";
import { Button } from "@/components/ui/button";
import { useGetUserCrates } from "@/features/crates/hooks";

const navlinks = [
  { id: 1, text: "Dashboard", to: "/dashboard", icon: <LayoutDashboard /> },
  { id: 2, text: "Files", to: "/files", icon: <Files /> },
  { id: 3, text: "Members", to: "/members", icon: <Users2 /> },
  { id: 4, text: "Favorites", to: "/favorites", icon: <Star /> },
  { id: 5, text: "Deleted Files", to: "/deleted", icon: <Trash2 /> },
  { id: 6, text: "Settings", to: "/settings", icon: <Settings /> },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: crates, isLoading } = useGetUserCrates();
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

          {/* Divider */}
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-500">Your Crates (2/3)</div>

          {/* Crate Navigation */}
          <SidebarMenu>
            {isLoading ? (
              <SidebarMenuItem>
                <span className="text-sm text-muted-foreground">Loading crates...</span>
              </SidebarMenuItem>
            ) : (
              crates?.map((crate) => (
                <SidebarMenuItem key={crate.id}>
                  <SidebarNavlink to={`/crates/${crate.id}`} icon={<Box />} text={crate.name} />
                </SidebarMenuItem>
              ))
            )}

            <SidebarMenuItem className="mx-4">
              <Button
                onClick={() => console.log("Open new crate modal")}
                variant="ghost"
                className="w-full flex items-center justify-center border border-dashed border-gray-300 text-gray-400 hover:border-primary hover:text-primary hover:bg-indigo-50 p-2 cursor-pointer"
              >
                <Plus size={28} />
                <span className="text-sm font-medium">New Crate</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Logout Button */}
        <div className="pb-6 px-4 space-y-4">
          <div
            className="p-4 rounded-xl space-y-3 bg-indigo-50 border border-primary h-48"
            style={{
              backgroundImage: `url('/public/Cloudy.svg')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col gap-4 justify-center items-center">
              <h3 className="text-lg font-bold text-gray-700  tracking-tight leading-5 text-center">Upgrade to Pro</h3>
              <p className="text-sm text-gray-700 font-semibold  tracking-tighter leading-4 text-center">
                Upgrade to a premium account and get premium features
              </p>
              <Button className="cursor-pointer shadow-lg">Upgrade Now</Button>
            </div>
          </div>
          <Button
            onClick={logout}
            className="w-full py-2 px-4 rounded-xl text-center border-gray-500 hover:border-primary text-gray-500 cursor-pointer hover:bg-indigo-50 hover:text-primary"
            variant="outline"
          >
            Log Out
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
