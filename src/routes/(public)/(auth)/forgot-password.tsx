import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { forgotPasswordSchema } from "@/features/auth/authSchemas";
import { useForgotPassword } from "@/features/auth/api/authQueries";
import type { ForgotPasswordRequest } from "@/features/auth/authTypes";
import { extractApiErrors } from "@/shared/lib/formUtils";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";

export const Route = createFileRoute("/(public)/(auth)/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  async function onSubmit(data: ForgotPasswordRequest) {
    try {
      setError(null);
      await forgotPassword(data.email);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage = extractApiErrors(err, form);
      setError(errorMessage);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-md border-none bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
            <CardDescription className="text-sm">Password reset instructions have been sent</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertDescription>
                If an account with that email exists, we've sent you a password reset link. Please check your email and
                follow the instructions to reset your password.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>

              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full">
                  Try Different Email
                </Button>

                <Link to="/login" className="w-full">
                  <Button variant="ghost" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-md border-none bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
          <CardDescription className="text-sm">
            Enter your email address and we'll send you a reset link
          </CardDescription>
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
                        <Input placeholder="m@example.com" {...field} type="email" disabled={isPending} />
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
                  {isPending ? "Sending..." : "Send Reset Link"}
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
