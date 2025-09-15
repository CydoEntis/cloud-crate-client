import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import AuthForm from "@/features/auth/components/auth-form";
import { authSearchSchema } from "@/features/auth/auth.schemas";

export const Route = createFileRoute("/(public)/(auth)/login")({
  validateSearch: zodValidator(authSearchSchema),
  component: LoginPage,
});

function LoginPage() {
  return <AuthForm mode="login" />;
}
