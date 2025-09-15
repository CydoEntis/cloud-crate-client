import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User } from "../types/User";
import { getUser } from "../api/getUser";
import { useUserStore } from "../user.store";

export function useGetUser() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const query = useQuery<User, Error>({
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
