import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";

import { useLogin } from "../hooks";
import type { LoginRequest } from "../types";
import { extractApiErrors, setFormErrors, type ApiError } from "@/lib/formUtils";
import { loginSchema } from "../schemas";
import { useAuthStore } from "../store";

function LoginForm() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/(public)/(auth)/login" });
  const inviteToken = search.inviteToken;

  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);

  async function onSubmit(data: LoginRequest) {
    try {
      const accessToken = await login(data);
      console.log(accessToken);
      setAuth(accessToken);

      if (inviteToken) {
        navigate({ to: `/invite/${inviteToken}` });
      } else {
        navigate({ to: "/" });
      }
    } catch (err: unknown) {
      const globalError = extractApiErrors(err, form);
      setError(globalError);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-sm">Enter your account details</CardDescription>
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
                        <Input placeholder="m@example.com" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && <p className="text-destructive text-sm mb-2">{error}</p>}
              </div>

              <div className="space-y-1 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
                  disabled={isPending}
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full border border-indigo-500 hover:bg-indigo-50 transition-all duration-200 mt-3"
                >
                  Login with Google
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4 text-indigo-500 font-bold">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
