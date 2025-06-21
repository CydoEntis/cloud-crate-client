import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, login, refresh, register } from "./api";
import { useAuthStore } from "./authStore";
import { useUserStore } from "./userStore";
import { useEffect } from "react";
import api from "@/lib/api";
import type { UserResponse } from "./types";

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

export function useCurrentUser() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const query = useQuery<UserResponse, Error>({
    queryKey: ["currentUser"],
    queryFn: getUser,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
    if (query.isError) {
      clearUser();
    }
  }, [query.data, query.isError, setUser, clearUser]);

  return query;
}
