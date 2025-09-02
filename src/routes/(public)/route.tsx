import SidebarNavlink from "@/layouts/sidebar/SidebarNavlink";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import logo from "@/assets/cloud-crate-logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { CreateFolderModal } from "@/features/folder-contents/components/folder";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <header className="p-4 flex-shrink-0 bg-background">
        <nav className="flex justify-between items-center gap-4">
          <Link to="/" className="flex justify-center items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-10 w-10" />
            <h3 className="font-bold text-3xl text-primary">Cloud Crate</h3>
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </section>
  );
}
