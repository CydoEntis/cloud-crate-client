import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import AuthForm from "@/features/auth/components/AuthForm";
import { authSearchSchema } from "@/features/auth/authSchemas";

export const Route = createFileRoute("/(public)/(auth)/register")({
  component: RegisterPage,
  validateSearch: zodValidator(authSearchSchema),
});

function RegisterPage() {
  return <AuthForm mode="register" />;
}
