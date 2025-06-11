import SidebarNavlink from "@/layouts/sidebar/SidebarNavlink";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex min-h-svh flex-col">
      <header className="border-b p-4">
        <nav className="flex justify-end items-center gap-4">
          <SidebarNavlink to="/login" text="Login" />
          <SidebarNavlink to="/register" text="Register" />
        </nav>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </section>
  );
}
