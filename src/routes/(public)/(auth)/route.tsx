import { createFileRoute, Outlet } from "@tanstack/react-router";
import clouds from "@/assets/Cloudy.svg";
import logo from "@/assets/cloud-crate-logo.png";

export const Route = createFileRoute("/(public)/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-white">
      <img
        src={clouds}
        alt="Cloud background"
        className="pointer-events-none select-none absolute bottom-0 left-0 w-full h-[1000px] object-cover z-0"
      />

      <div className="relative z-10 flex flex-col top-50 justify-center min-h-svh px-6">
        <div className="flex justify-center">
          <div className="flex justify-center items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-16 w-16" />
            <h3 className="font-bold text-4xl text-indigo-500">Cloud Crate</h3>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
