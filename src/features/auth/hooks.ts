import { useMutation } from "@tanstack/react-query";
import { login, refresh, register } from "./api";
import api from "@/lib/api";
import { useAuthStore } from "./authStore";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, userId }) => {
      api.setAccessToken(accessToken);
      useAuthStore.getState().setAuth(accessToken, userId);
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: ({ accessToken, userId }) => {
      api.setAccessToken(accessToken);
      useAuthStore.getState().setAuth(accessToken, userId);
    },
  });

export const useRefresh = () =>
  useMutation({
    mutationFn: refresh,
    onSuccess: ({ accessToken, userId }) => {
      api.setAccessToken(accessToken);
      useAuthStore.getState().setAuth(accessToken, userId);
    },
    onError: () => {
      api.clearAccessToken();
      useAuthStore.getState().clearAuth();
    },
  });
