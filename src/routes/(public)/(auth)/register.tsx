import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import AuthForm from "@/features/auth/components/auth-form";
import { authSearchSchema } from "@/features/auth/auth.schemas";

export const Route = createFileRoute("/(public)/(auth)/register")({
  component: RegisterPage,
  validateSearch: zodValidator(authSearchSchema),
});

function RegisterPage() {
  return <AuthForm mode="register" />;
}
