import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";

type RegisterFormProps = {
  register: () => void;
};

const registerSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm({ register }: RegisterFormProps) {
  const [error, setError] = useState("");

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      const response = await fetch("http://localhost:5233/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result);
      }

      const result = await response.json();

      const token = result.token;

      localStorage.setItem("token", token);

      console.log(token);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className=" shadow-md">
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>Enter your email below to register to your account</CardDescription>
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
                <p className="text-destructive text-sm">{error && error}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 cursor-pointer hover:bg-indigo-600 transition-all duration-200"
                >
                  Register
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-indigo-500 hover:bg-indigo-50  cursor-pointer transition-all duration-200"
                >
                  Register with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4 text-indigo-500 font-bold">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
