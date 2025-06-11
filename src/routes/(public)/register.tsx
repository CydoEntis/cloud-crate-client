import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../../features/auth/login/LoginForm";

export const Route = createFileRoute("/(public)/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <p>Register Form goes here.</p>
        {/* <LoginForm login={() => console.log("LOGGING IN")} /> */}
      </div>
    </div>
  );
}
