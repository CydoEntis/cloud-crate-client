import { useQuery } from "@tanstack/react-query";
import { getUserCrates } from "../../api";
import type { UserCratesResponse } from "../../types/UserCratesResponse";

export const useGetUserCrates = () =>
  useQuery<UserCratesResponse>({
    queryKey: ["crates"],
    queryFn: getUserCrates,
  });
