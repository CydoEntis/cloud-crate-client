import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../../../features/auth/components/LoginForm";

export const Route = createFileRoute("/(public)/(auth)/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex flex-1  justify-center  p-6 md:p-10 pt-16 z-10 relative ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
