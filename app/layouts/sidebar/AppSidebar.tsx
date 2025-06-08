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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="p-3">
      <SidebarContent>
        <h3 className="text-xl text-cyan-600 font-extrabold">CloudCrate</h3>
        <SidebarMenu>
          {navlinks.map((link) => (
            <SidebarMenuItem key={link.id}>
              <SidebarNavlink text={link.text} to={link.to} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
