import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/cloud-crate-logo.png";
import SidebarNavlink from "./SidebarNavlink";

const navlinks = [
  { id: 1, text: "Home", to: "/" },
  { id: 2, text: "Buckets", to: "/buckets" },
  { id: 3, text: "Files", to: "/files" },
  { id: 4, text: "Login", to: "/login" },
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
              <SidebarNavlink text={link.text} to={link.to} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
