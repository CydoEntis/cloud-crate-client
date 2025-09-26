import { useQuery } from "@tanstack/react-query";
import { userService } from "./userService";
import { useAuthStore } from "@/features/auth/authStore";
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
