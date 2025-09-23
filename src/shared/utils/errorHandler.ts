import { AxiosError } from "axios";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { ApiResponse, ApiError } from "../lib/sharedTypes";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function isSuspensionError(error: unknown): boolean {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data;
    const message = responseData?.message || "";

    return (
      error.response.status === 401 &&
      (message.includes("suspended") || message.includes("banned") || message === "Account has been suspended")
    );
  }
  return false;
}

export function handleApiError(error: unknown): AppError {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data;
    const statusCode = error.response.status;

    if (responseData && "isSuccess" in responseData) {
      const apiResponse = responseData as ApiResponse<any>;
      const message = apiResponse.message || "Request failed";
      return new AppError(message, statusCode, error);
    }

    if (responseData?.errors && typeof responseData.errors === "object" && !Array.isArray(responseData.errors)) {
      const firstError = Object.values(responseData.errors)[0];
      const message = Array.isArray(firstError) ? firstError[0] : String(firstError);
      return new AppError(message, statusCode, error);
    }

    const message = responseData?.message || responseData?.title || "Something went wrong";
    return new AppError(message, statusCode, error);
  }

  if (error instanceof Error) {
    return new AppError(error.message, undefined, error);
  }

  return new AppError("An unexpected error occurred", undefined, error);
}

export function showErrorToast(error: unknown) {
  const appError = handleApiError(error);
  toast.error(appError.message);
}

export function getErrorMessage(error: unknown): string {
  return handleApiError(error).message;
}

export function setFormErrors<T extends FieldValues>(error: unknown, form: UseFormReturn<T>): string | null {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data;

    if (responseData?.errors && typeof responseData.errors === "object" && !Array.isArray(responseData.errors)) {
      Object.entries(responseData.errors).forEach(([field, messages]) => {
        const messageArray = Array.isArray(messages) ? messages : [messages];
        form.setError(field.toLowerCase() as Path<T>, {
          type: "server",
          message: messageArray[0],
        });
      });
      return null;
    }

    if (responseData?.errors && Array.isArray(responseData.errors)) {
      const fieldMappings: Record<string, string> = {
        ERR_DUPLICATE_EMAIL: "email",
        ERR_INVALID_EMAIL: "email",
        ERR_DUPLICATE_USERNAME: "email",
        ERR_PASSWORD_TOO_SHORT: "password",
        ERR_PASSWORD_REQUIRES_NON_ALPHANUMERIC: "password",
        ERR_PASSWORD_REQUIRES_DIGIT: "password",
        ERR_PASSWORD_REQUIRES_UPPER: "password",
        ERR_PASSWORD_REQUIRES_LOWER: "password",
      };

      let globalError: string | null = null;

      responseData.errors.forEach((apiError: ApiError) => {
        const fieldName = fieldMappings[apiError.code];
        if (fieldName) {
          form.setError(fieldName as Path<T>, {
            type: "server",
            message: apiError.message,
          });
        } else {
          globalError = apiError.message;
        }
      });

      return globalError;
    }
  }

  return handleApiError(error).message;
}
