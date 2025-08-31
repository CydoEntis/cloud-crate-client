import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    return true ? redirect({ to: "/crates" }) : redirect({ to: "/login" });
  },
});
