import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/cloud-crate-logo.png";
import SidebarNavlink from "./SidebarNavlink";
import { Cog, Files, LayoutDashboard, Settings, Star, Trash2, Users2 } from "lucide-react";

const navlinks = [
  { id: 1, text: "Dashboard", to: "/dashboard", icon: <LayoutDashboard /> },
  { id: 2, text: "Files", to: "/files", icon: <Files /> },
  { id: 3, text: "Members", to: "/members", icon: <Users2 /> },
  { id: 4, text: "Favorites", to: "/favorites", icon: <Star /> },
  { id: 5, text: "Deleted Files", to: "/deleted", icon: <Trash2 /> },
  { id: 6, text: "Settings", to: "/Settings", icon: <Settings /> },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <div className="py-6">
          <Link to="/" className="flex justify-center items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-10 w-10" />
            <h3 className="font-bold text-3xl text-indigo-500">Cloud Crate</h3>
          </Link>
        </div>
        <SidebarMenu>
          {navlinks.map((link) => (
            <SidebarMenuItem key={link.id} className="my-1">
              <SidebarNavlink text={link.text} to={link.to} icon={link.icon} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
