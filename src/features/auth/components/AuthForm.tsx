import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useAuthForm } from "../hooks/useAuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
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

  if (!isLogin && !inviteToken) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-md border-none bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Invitation Required</CardTitle>
            <CardDescription className="text-sm">Registration is by invitation only</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Registration requires a valid invitation. If you have an invite link, please use that to access the
                registration form.
              </AlertDescription>
            </Alert>
            <div className="mt-6 space-y-3">
              <Link to="/login">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Go to Login</Button>
              </Link>
              <p className="text-center text-sm text-muted-foreground">Need an invitation? Contact an administrator.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const form = useForm<LoginRequest | RegisterRequest>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : {
          email: "",
          password: "",
          confirmPassword: "",
          displayName: "",
          inviteToken: inviteToken || "", // Include invite token
        },
  });

  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();

  const isPending = isLogin ? isLoginPending : isRegisterPending;

  async function onSubmit(data: LoginRequest | RegisterRequest) {
    try {
      clearError();
      if (isLogin) {
        await login(data as LoginRequest);
      } else {
        const registerData = data as RegisterRequest;
        const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(registerData.displayName)}`;

        await register({
          ...registerData,
          profilePictureUrl: avatarUrl,
          inviteToken: inviteToken || "", 
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
          {!isLogin && inviteToken && (
            <Alert>
              <AlertDescription>
                You have been invited to join CloudCrate. Complete the form below to create your account.
              </AlertDescription>
            </Alert>
          )}
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

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
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

              {isLogin && (
                <div className="text-center mt-4">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-indigo-500 hover:text-indigo-600 underline underline-offset-4"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}

              <div className="mt-4 text-center text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link
                  to={isLogin ? "/register" : "/login"}
                  search={inviteToken ? { inviteToken } : undefined}
                  className="underline underline-offset-4 text-indigo-500 font-bold"
                >
                  {isLogin ? "Contact admin for invite" : "Login"}
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
