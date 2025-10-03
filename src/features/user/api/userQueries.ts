import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "./userService";
import { useAuthStore } from "@/features/auth/authStore";
import { useUserStore } from "@/features/user/userStore";
import type { User } from "../userTypes";
import { SHARED_KEYS } from "../../shared/queryKeys";

export const userKeys = {
  all: ["user"] as const,
  me: () => SHARED_KEYS.userMe(),
};

export const useGetUser = (enabled: boolean = true) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const shouldEnable = enabled && isAuthenticated;

  return useQuery<User, Error>({
    queryKey: userKeys.me(),
    queryFn: userService.getUser,
    enabled: shouldEnable,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export function useUpdateDisplayName() {
  const queryClient = useQueryClient();
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (displayName: string) => userService.updateDisplayName(displayName),
    onSuccess: (_, displayName) => {
      updateUser({ displayName });
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      toast.success("Display name updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update display name");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      userService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to change password");
    },
  });
}
