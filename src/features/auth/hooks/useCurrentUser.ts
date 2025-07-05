import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUser } from "../api";
import type { UserResponse } from "../types";
import { useUserStore } from "../store";

export function useCurrentUser() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const query = useQuery<UserResponse, Error>({
    queryKey: ["currentUser"],
    queryFn: getUser,
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
