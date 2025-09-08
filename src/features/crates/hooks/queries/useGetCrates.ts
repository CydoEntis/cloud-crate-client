import { useQuery } from "@tanstack/react-query";
import { getCrates } from "../../api";
import type { Crate } from "../../types/Crate";
import type { PaginatedResult } from "@/features/auth";
import type { GetCrateParams } from "../../types/GetCrateParams";

export const useGetUserCrates = (params: GetCrateParams = {}) => {
  return useQuery<PaginatedResult<Crate>, Error, PaginatedResult<Crate>, any[]>({
    queryKey: ["crates", params],
    queryFn: () => getCrates(params),
  });
};
