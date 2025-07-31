import type { ApiResponse, PaginatedResult } from "@/features/auth";
import type { Crate } from "../types/Crate";
import type { GetUserCratesParams } from "../types/GetUserCrateParams";
import api from "@/lib/api";

export const getUserCrates = async ({
  searchTerm,
  sortBy,
  orderBy = "Desc",
  page = 1,
  pageSize = 1,
}: GetUserCratesParams = {}): Promise<PaginatedResult<Crate>> => {
  const params = new URLSearchParams();

  if (searchTerm) params.append("SearchTerm", searchTerm);
  if (sortBy) params.append("SortBy", sortBy);
  if (orderBy) params.append("OrderBy", orderBy);
  if (page) params.append("Page", page.toString());
  if (pageSize) params.append("PageSize", pageSize.toString());

  console.log(`/crates?${params.toString()}`);

  const { data } = await api.get<ApiResponse<PaginatedResult<Crate>>>(`/crates?${params.toString()}`);
  return data.value!;
};
