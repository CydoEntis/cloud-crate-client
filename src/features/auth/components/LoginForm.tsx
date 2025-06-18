import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLogin } from "../hooks";
import { useAuthStore } from "../authStore";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: LoginValues) => {
    try {
      const { token} = await login(data);
      console.log(token);
      setAuth(token, "1");
      navigate({to: "/"});
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className=" shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-sm">Enter your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required {...form.register("email")} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required {...form.register("password")} />
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 cursor-pointer hover:bg-indigo-600 transition-all duration-200"
                  disabled={isPending}
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-indigo-500 hover:bg-indigo-50  cursor-pointer transition-all duration-200"
                >
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4 text-indigo-500 font-bold">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
