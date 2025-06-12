import SidebarNavlink from "@/layouts/sidebar/SidebarNavlink";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import logo from "@/assets/cloud-crate-logo.png";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <header className="border-b  p-4 flex-shrink-0">
        <nav className="flex justify-between items-center gap-4">
          <Link to="/" className="flex justify-center items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-10 w-10" />
            <h3 className="font-bold text-3xl text-indigo-500">Cloud Crate</h3>
          </Link>

          <div className="flex gap-4 items-center">
            <SidebarNavlink to="/login" text="Login" />
            <SidebarNavlink to="/register" text="Register" />
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </section>
  );
}
