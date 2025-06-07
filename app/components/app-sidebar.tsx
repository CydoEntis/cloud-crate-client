import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { NavLink } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="p-3">
      <SidebarContent>
        <h3 className="text-xl text-cyan-600 font-extrabold">CloudCrate</h3>
        <SidebarMenu>
          <SidebarMenuItem key={1}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 rounded-lg bg-cyan-600 text-white"
                  : "block px-4 py-2 rounded-lg bg-none text-black"
              }
            >
              Home
            </NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem key={1}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 rounded-lg bg-cyan-600 text-white"
                  : "block px-4 py-2 rounded-lg bg-none text-black"
              }
            >
              Dashboard
            </NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem key={2}>
            <NavLink
              to="/buckets"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 rounded-lg bg-cyan-600 text-white"
                  : "block px-4 py-2 rounded-lg bg-none text-black"
              }
            >
              Buckets
            </NavLink>
          </SidebarMenuItem>

          <SidebarMenuItem key={3}>
            <NavLink
              to="/files"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 rounded-lg bg-cyan-600 text-white"
                  : "block px-4 py-2 rounded-lg bg-none text-black"
              }
            >
              Files
            </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
