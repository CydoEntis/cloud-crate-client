import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useAuthForm } from "../hooks/useAuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import type { LoginRequest, RegisterRequest } from "../authTypes";
import { loginSchema, registerSchema } from "../authSchemas";
import { useLogin, useRegister } from "../api/authQueries";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";
  const search = useSearch({
    from: isLogin ? "/(public)/(auth)/login" : "/(public)/(auth)/register",
  });
  const inviteToken = search.inviteToken;

  const { error, handleAuthSuccess, handleAuthError, clearError } = useAuthForm();

  const form = useForm<LoginRequest | RegisterRequest>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { email: "", password: "", confirmPassword: "", displayName: "" },
  });

  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();

  const isPending = isLogin ? isLoginPending : isRegisterPending;

  console.log("Form errors:", form.formState.errors);
  console.log("Form is valid:", form.formState.isValid);

  async function onSubmit(data: LoginRequest | RegisterRequest) {
    try {
      console.log("onSubmit called with mode:", mode);
      console.log("isLogin:", isLogin);
      console.log("Form data:", data);

      clearError();
      if (isLogin) {
        await login(data as LoginRequest);
      } else {
        const registerData = data as RegisterRequest;
        const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(registerData.displayName)}`;

        await register({
          ...registerData,
          profilePictureUrl: avatarUrl,
        });
      }

      handleAuthSuccess(inviteToken);
    } catch (err: unknown) {
      handleAuthError(err, form);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-md border-none bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{isLogin ? "Login" : "Register"}</CardTitle>
          <CardDescription className="text-sm">
            {isLogin ? "Enter your account details" : "Enter your details to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="space-y-4">
                {!isLogin && (
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
                )}

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

                {!isLogin && (
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="********" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {error && <p className="text-destructive text-sm mb-2">{error}</p>}
              </div>

              <div className="space-y-1 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
                  disabled={isPending}
                >
                  {isPending ? `${isLogin ? "Logging in" : "Registering"}...` : isLogin ? "Login" : "Register"}
                </Button>

                {isLogin && (
                  <Button
                    variant="outline"
                    className="w-full border border-indigo-500 hover:bg-indigo-50 transition-all duration-200 mt-3"
                  >
                    Login with Google
                  </Button>
                )}
              </div>

              <div className="mt-4 text-center text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link
                  to={isLogin ? "/register" : "/login"}
                  search={inviteToken ? { inviteToken } : undefined}
                  className="underline underline-offset-4 text-indigo-500 font-bold"
                >
                  {isLogin ? "Sign up" : "Login"}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthForm;
