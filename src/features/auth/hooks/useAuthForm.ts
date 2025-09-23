import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { setFormErrors, getErrorMessage } from "@/shared/utils/errorHandler";

export function useAuthForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuthSuccess = async () => {
    setError(null);
    await router.navigate({ to: "/" });
  };

  const handleAuthError = (err: unknown, form: any) => {
    const globalError = setFormErrors(err, form);
    setError(globalError);
  };

  const clearError = () => setError(null);

  return { error, handleAuthSuccess, handleAuthError, clearError };
}
