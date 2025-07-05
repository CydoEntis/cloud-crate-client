import { useMutation } from "@tanstack/react-query";
import { refresh } from "../api";
import { useAuthStore } from "../store";

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
