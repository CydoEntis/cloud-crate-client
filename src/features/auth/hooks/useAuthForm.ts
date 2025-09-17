import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { extractApiErrors } from "@/shared/lib/formUtils";

export function useAuthForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleAuthSuccess = (inviteToken?: string) => {
    if (inviteToken) {
      navigate({ to: `/invite/${inviteToken}` });
    } else {
      navigate({ to: "/" });
    }
  };

  const handleAuthError = (err: unknown, form: any) => {
    const globalError = extractApiErrors(err, form);
    setError(globalError);
  };

  const clearError = () => setError(null);

  return {
    error,
    handleAuthSuccess,
    handleAuthError,
    clearError,
  };
}
