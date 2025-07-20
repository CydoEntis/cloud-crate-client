import type { UseFormReturn, Path, FieldValues } from "react-hook-form";

export type ApiError = { code: string; message: string };

const errorCodeToFieldMap: Record<string, string | null> = {
  ERR_DUPLICATE_EMAIL: "email",
  ERR_INVALID_EMAIL: "email",
  ERR_DUPLICATE_USERNAME: "email",
  ERR_PASSWORD_TOO_SHORT: "password",
  ERR_PASSWORD_REQUIRES_NON_ALPHANUMERIC: "password",
  ERR_PASSWORD_REQUIRES_DIGIT: "password",
  ERR_PASSWORD_REQUIRES_UPPER: "password",
  ERR_PASSWORD_REQUIRES_LOWER: "password",
  ERR_INVALID_CREDENTIALS: null,
  ERR_CRATE_LIMIT: null,
};

export function setFormErrors<T extends FieldValues>(form: UseFormReturn<T>, errors: ApiError[]): string | null {
  form.clearErrors();

  let globalError: string | null = null;

  errors.forEach(({ code, message }) => {
    const field = errorCodeToFieldMap[code];

    if (field) {
      form.setError(field as Path<T>, { type: "server", message });
    } else {
      globalError = message;
    }
  });

  return globalError;
}

export function extractApiErrors<T extends FieldValues>(err: unknown, form?: UseFormReturn<T>): string | null {
  const data = (err as any)?.response?.data;

  form?.clearErrors();

  if (data?.errors && typeof data.errors === "object" && !Array.isArray(data.errors)) {
    if (form) {
      setFieldErrorsFromValidationResponse(form, data.errors);
    }
    return null;
  }

  if (Array.isArray(data?.errors)) {
    if (form) {
      const globalError = setFormErrors(form, data.errors);
      return globalError;
    }
    const global = data.errors.find((e: ApiError) => !e.code || e.code.startsWith("ERR_"));
    return global?.message ?? null;
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (typeof (err as any)?.message === "string") {
    return (err as any).message;
  }

  return "An unknown error occurred";
}

export function setFieldErrorsFromValidationResponse<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Record<string, string[]>
) {
  form.clearErrors();

  for (const key in errors) {
    const fieldName = key.toLowerCase();
    const messages = errors[key];
    if (messages.length > 0) {
      form.setError(fieldName as Path<T>, { type: "server", message: messages[0] });
    }
  }
}
