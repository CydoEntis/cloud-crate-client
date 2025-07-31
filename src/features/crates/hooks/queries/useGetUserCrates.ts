import { useQuery } from "@tanstack/react-query";
import { getUserCrates } from "../../api";
import type { Crate } from "../../types/Crate";
import type { GetUserCratesParams } from "../../types/GetUserCrateParams";
import type { PaginatedResult } from "@/features/auth";

export const useGetUserCrates = (params: GetUserCratesParams = {}) => {
  return useQuery<PaginatedResult<Crate>>({
    queryKey: ["crates", params],
    queryFn: () => getUserCrates(params),
  });
};
