import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";

import { useRegister } from "../hooks";
import { setFormErrors, type ApiError } from "@/lib/formUtils";
import { registerSchema } from "../schemas";
import type { RegisterRequest } from "../types";
import { useAuthStore } from "../store";

function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const search = useSearch({ from: "/(public)/(auth)/register" });
  const inviteToken = search.inviteToken;

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "", // ✅ added
    },
  });

  const { mutateAsync: register, isPending } = useRegister();
  const setAuth = useAuthStore((state) => state.setAuth);

  async function onSubmit(data: RegisterRequest) {
    const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(data.displayName)}`;

    try {
      const { token } = await register({
        ...data,
        profilePictureUrl: avatarUrl,
      });

      setAuth(token);
      if (inviteToken) {
        navigate({ to: `/invite/${inviteToken}` });
      } else {
        navigate({ to: "/" });
      }
    } catch (err: any) {
      if (err.response?.data && Array.isArray(err.response.data)) {
        setError(null);
        const globalError = setFormErrors(form, err.response.data.errors as ApiError[]);
        setError(globalError);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Register</CardTitle>
          <CardDescription className="text-sm">Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. coolcoder123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </div>

              {error && <p className="text-destructive text-sm mb-2">{error}</p>}

              <div className="space-y-1 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
                  disabled={isPending}
                >
                  {isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              search={inviteToken ? { inviteToken } : undefined}
              className="underline underline-offset-4 text-indigo-500 font-bold"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
