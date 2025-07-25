import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/features/auth";
import z from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

const loginSearchSchema = z.object({
  inviteToken: z.string().optional(),
});

export const Route = createFileRoute("/(public)/(auth)/register")({
  component: RegisterPage,
  validateSearch: zodValidator(loginSearchSchema),
});

function RegisterPage() {
  return (
    <div className="flex flex-1 justify-center p-6 md:p-10 pt-16 z-10 relative ">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
