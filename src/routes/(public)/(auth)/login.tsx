import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { LoginForm } from "@/features/auth";

const loginSearchSchema = z.object({
  inviteToken: z.string().optional(),
});

export const Route = createFileRoute("/(public)/(auth)/login")({
  validateSearch: zodValidator(loginSearchSchema),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex flex-1 justify-center p-6 md:p-10 pt-16 z-10 relative">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
