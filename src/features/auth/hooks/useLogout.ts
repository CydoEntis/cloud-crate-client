import { useUserStore } from "@/features/user/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { authService } from "../api/authService";
import { useAuthStore } from "../authStore";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all state
      clearAuth();
      clearUser();
      queryClient.clear();

      // Show success message
      toast.success("Successfully logged out");

      // Navigate to login
      router.navigate({ to: "/login" });
    },
    onError: (error) => {
      clearAuth();
      clearUser();
      queryClient.clear();

      console.warn("Logout API failed, but clearing local state:", error);

      router.navigate({ to: "/login" });
    },
  });
};
