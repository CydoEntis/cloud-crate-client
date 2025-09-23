import { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
  message?: string;
  traceId?: string;
}

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

export function handleApiError(error: unknown): AppError {
  if (error instanceof AxiosError && error.response) {
    const errorData = error.response.data as ApiErrorResponse;
    const statusCode = error.response.status;

    let errorMessage = errorData.message || errorData.title || "Request failed";

    if (errorData.errors) {
      const validationErrors = Object.entries(errorData.errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; ");
      errorMessage = validationErrors;
    }

    switch (statusCode) {
      case 400:
        errorMessage = errorMessage || "Invalid request data";
        break;
      case 401:
        errorMessage = "You are not authorized to perform this action";
        break;
      case 403:
        errorMessage = "Access denied";
        break;
      case 404:
        errorMessage = "Resource not found";
        break;
      case 500:
        errorMessage = "Server error occurred";
        break;
    }

    return new AppError(errorMessage, statusCode, error);
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
