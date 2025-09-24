import { useQuery } from "@tanstack/react-query";
import { userService } from "./userService";
import { useAuthStore } from "@/features/auth/authStore";
import type { User } from "../userTypes";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
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
