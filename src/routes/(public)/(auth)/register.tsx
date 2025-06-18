import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../../../features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const Route = createFileRoute("/(public)/(auth)/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex flex-1 justify-center p-6 md:p-10 pt-16 z-10 relative ">
      <div className="w-full max-w-sm">
        <RegisterForm
          register={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
