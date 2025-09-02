import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserProfile } from "../api/getUserProfile";
import type { UserProfileResponse } from "../types/User";
import { useUserStore } from "@/features/auth";

export function useGetCurrentUserProfile() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const query = useQuery<UserProfileResponse, Error>({
    queryKey: ["currentUser"],
    queryFn: getUserProfile,
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
