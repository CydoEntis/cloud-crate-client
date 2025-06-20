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

export function extractApiErrors<T extends FieldValues>(err: any, form?: UseFormReturn<T>): string | null {
  const data = err?.response?.data;
  if (data?.errors && Array.isArray(data.errors)) {
    if (form) {
      return setFormErrors(form, data.errors);
    }
    return data.errors.find((e: ApiError) => !errorCodeToFieldMap[e.code])?.message ?? null;
  }

  if (data?.message) {
    return data.message;
  }

  if (err.message) {
    return err.message;
  }

  return "An unknown error occurred";
}
