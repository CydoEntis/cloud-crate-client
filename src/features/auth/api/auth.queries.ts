import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../auth.store";
import { useUserStore } from "../../user/user.store";
import { authService } from "./auth.service";
import type { AuthUser } from "../auth.types";
import type { User } from "@/features/user/types/User";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setAuthUser = useUserStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setAuth({
        accessToken: response.token,
        refreshToken: response.refreshToken,
      });

      if (response.user) {
        setAuthUser(response.user);
      }
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setAuthUser = useUserStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      setAuth({
        accessToken: response.token,
        refreshToken: response.refreshToken,
      });

      if (response.user) {
        setAuthUser(response.user);
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      clearUser();
      queryClient.clear();
    },
    onError: () => {
      clearAuth();
      clearUser();
      queryClient.clear();
    },
  });
};

export const useMe = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery<User, Error>({
    queryKey: authKeys.me(),
    queryFn: () => authService.me(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useUpdateUserFromMe = () => {
  const setUser = useUserStore((state) => state.setUser);
  const { data: userData } = useMe();

  return () => {
    if (userData) {
      setUser(userData);
    }
  };
};
