import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "../authStore";
import { useUserStore } from "../../user/userStore";
import { authService } from "./authService";
import type { User } from "@/features/user/userTypes";

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
        accessToken: response.accessToken,
        accessTokenExpires: response.accessTokenExpires,
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
        accessToken: response.accessToken,
        accessTokenExpires: response.accessTokenExpires,
      });

      if (response.user) {
        setAuthUser(response.user);
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      clearUser();
      queryClient.clear();
      router.navigate({ to: "/login" });
    },
    onError: () => {
      clearAuth();
      clearUser();
      queryClient.clear();
      router.navigate({ to: "/login" });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
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
