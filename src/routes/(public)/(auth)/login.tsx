import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import AuthForm from "@/features/auth/components/AuthForm";
import { authSearchSchema } from "@/features/auth/authSchemas";

export const Route = createFileRoute("/(public)/(auth)/login")({
  validateSearch: zodValidator(authSearchSchema),
  component: LoginPage,
});

function LoginPage() {
  return <AuthForm mode="login" />;
}
