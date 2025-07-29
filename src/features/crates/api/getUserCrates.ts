import type { ApiResponse } from "@/features/auth";
import type { Crate } from "../types/Crate";
import type { GetUserCratesParams } from "../types/GetUserCrateParams";
import api from "@/lib/api";

export const getUserCrates = async ({ searchTerm, sortBy, orderBy = "Desc" }: GetUserCratesParams = {}): Promise<
  Crate[]
> => {
  const params = new URLSearchParams();

  if (searchTerm) params.append("SearchTerm", searchTerm);
  if (sortBy) params.append("SortBy", sortBy);
  if (orderBy) params.append("OrderBy", orderBy);

  console.log(`/crates?${params.toString()}`);

  const { data } = await api.get<ApiResponse<Crate[]>>(`/crates?${params.toString()}`);
  return data.value!;
};
