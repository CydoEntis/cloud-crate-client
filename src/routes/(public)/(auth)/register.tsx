import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../../../features/auth/login/LoginForm";
import { RegisterForm } from "@/features/auth/register/RegisterForm";

export const Route = createFileRoute("/(public)/(auth)/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
       <RegisterForm register={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </div>
  );
}
