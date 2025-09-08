import type { ApiResponse, PaginatedResult } from "@/features/auth";
import type { Crate } from "../types/Crate";
import api from "@/lib/api";
import type { GetCrateParams } from "../types/GetCrateParams";

export const getCrates = async ({
  searchTerm,
  sortBy,
  ascending = false,
  page = 1,
  pageSize = 10,
  memberType = "All",
}: GetCrateParams = {}): Promise<PaginatedResult<Crate>> => {
  const params = new URLSearchParams();

  if (searchTerm) params.append("SearchTerm", searchTerm);
  if (sortBy) params.append("SortBy", sortBy);
  params.append("Ascending", ascending.toString());
  params.append("Page", page.toString());
  params.append("PageSize", pageSize.toString());
  if (memberType) params.append("MemberType", memberType);

  const { data } = await api.get<ApiResponse<PaginatedResult<Crate>>>(`/crates?${params.toString()}`);
  console.log(data.value);
  return data.value!;
};
