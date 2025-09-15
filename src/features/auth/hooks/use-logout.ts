import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../auth.store";
import { useUserStore } from "@/features/user/user.store";
import { authService } from "../api/auth.service";

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
