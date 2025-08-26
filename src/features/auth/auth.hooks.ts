import { useMutation } from "@tanstack/react-query";
import { login, register } from "./auth.api";
import { refresh } from "./api/refresh";
import { useAuthStore } from "./store";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useRefresh = () =>
  useMutation({
    mutationFn: refresh,
    onSuccess: ({ accessToken }) => {
      useAuthStore.getState().setAuth(accessToken);
    },
    onError: () => {
      useAuthStore.getState().clearAuth();
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Redurect User possible or potentially call login here
    },
  });
