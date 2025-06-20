import { useMutation } from "@tanstack/react-query";
import { login, refresh, register } from "./api";
import { useAuthStore } from "./authStore";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      useAuthStore.getState().setAuth(accessToken);
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Redurect User possible or potentially call login here
    },
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
