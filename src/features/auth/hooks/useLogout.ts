import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../authStore";
import { useUserStore } from "@/features/user/userStore";
import { authService } from "../api/authService";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      clearUser();

      queryClient.clear();

      navigate({ to: "/login" });
    },
    onError: (error) => {
      console.warn("Logout API call failed:", error);
      clearAuth();
      clearUser();
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });
}
