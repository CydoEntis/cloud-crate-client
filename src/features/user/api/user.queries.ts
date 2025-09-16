import { useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";
import { useAuthStore } from "@/features/auth/auth.store";
import type { User } from "../user.types";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export const useGetUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery<User, Error>({
    queryKey: userKeys.me(),
    queryFn: userService.getUser,
    enabled: isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
