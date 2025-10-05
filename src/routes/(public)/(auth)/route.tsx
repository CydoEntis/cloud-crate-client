import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import clouds from "@/assets/Cloudy.svg";
import logo from "@/assets/cloud-crate-logo.png";
import { useAuthStore } from "@/features/auth/authStore";

export const Route = createFileRoute("/(public)/(auth)")({
  beforeLoad: () => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <img
        src={clouds}
        alt="Cloud background"
        className="pointer-events-none select-none absolute bottom-0 left-0 w-full h-[1000px] object-cover z-0"
      />

      <div className="relative z-10 flex flex-col justify-center min-h-svh">
        <div className="flex justify-center px-6 py-8">
          <div className="flex justify-center items-center gap-2">
            <img src={logo} alt="Cloud Crate Logo" className="h-16 w-16" />
            <h3 className="font-bold text-4xl text-primary">Cloud Crate</h3>
          </div>
        </div>
        <div className="flex flex-1 justify-center px-0 md:px-6 md:py-10 z-10 relative">
          <div className="w-full md:max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
