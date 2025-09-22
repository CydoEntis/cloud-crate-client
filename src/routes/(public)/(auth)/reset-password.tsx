import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { resetPasswordSchema } from "@/features/auth/authSchemas";
import { useResetPassword } from "@/features/auth/api/authQueries";
import type { ResetPasswordRequest } from "@/features/auth/authTypes";
import { extractApiErrors } from "@/shared/lib/formUtils";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

const resetPasswordSearchSchema = z.object({
  token: z.string().optional(),
  email: z.string().optional(),
});

export const Route = createFileRoute("/(public)/(auth)/reset-password")({
  validateSearch: zodValidator(resetPasswordSearchSchema),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token, email } = Route.useSearch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      token: token || "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  // Check if we have required params
  const hasRequiredParams = token && email;

  async function onSubmit(data: ResetPasswordRequest) {
    try {
      setError(null);
      await resetPassword(data);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage = extractApiErrors(err, form);
      setError(errorMessage);
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-md border-none bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Password Reset Successfully</CardTitle>
            <CardDescription className="text-sm">Your password has been updated</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertDescription>
                Your password has been successfully reset. You can now log in with your new password.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => navigate({ to: "/login" })}
              className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Missing required parameters
  if (!hasRequiredParams) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-md border-none bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Invalid Reset Link</CardTitle>
            <CardDescription className="text-sm">This password reset link is invalid or expired</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                This password reset link is missing required information or may have expired. Please request a new
                password reset link.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2">
              <Link to="/forgot-password" className="w-full">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200">
                  Request New Reset Link
                </Button>
              </Link>

              <Link to="/login" className="w-full">
                <Button variant="ghost" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-md border-none bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
          <CardDescription className="text-sm">Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={true} className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter new password" {...field} type="password" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm new password" {...field} type="password" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-4 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
                  disabled={isPending}
                >
                  {isPending ? "Resetting..." : "Reset Password"}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-indigo-500 hover:text-indigo-600 underline underline-offset-4"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
