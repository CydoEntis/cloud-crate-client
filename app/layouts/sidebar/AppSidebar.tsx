import * as React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarRail } from "~/components/ui/sidebar";
import SidebarNavlink from "./SidebarNavlink";

const navlinks = [
  {
    id: 1,
    text: "Home",
    to: "/",
  },
  {
    id: 2,
    text: "Buckets",
    to: "/buckets",
  },
  {
    id: 3,
    text: "Files",
    to: "/files",
  },
    {
    id: 4,
    text: "Login",
    to: "/auth/login",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="p-3">
      <SidebarContent>
        <div className="py-6">
          <h3 className="text-xl text-indigo-500 font-extrabold">CloudCrate</h3>
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
