import { type UseFormReturn, type FieldValues } from "react-hook-form";
import { extractApiErrors } from "@/lib/formUtils";
import { useCallback, useState } from "react";

export function useApiFormErrorHandler<T extends FieldValues>(form: UseFormReturn<T>) {
  const [globalError, setGlobalError] = useState("");

  const handleApiError = useCallback(
    (err: unknown) => {
      const global = extractApiErrors(err, form);
      setGlobalError(global ?? "");
    },
    [form]
  );

  const clearErrors = useCallback(() => {
    setGlobalError("");
    form.clearErrors();
  }, [form]);

  return {
    globalError,
    hasError: Boolean(globalError),
    setGlobalError,
    handleApiError,
    clearErrors,
  };
}
