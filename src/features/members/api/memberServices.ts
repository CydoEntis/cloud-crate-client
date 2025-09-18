import apiService from "@/shared/lib/api/ApiClient";
import type { Member, MemberQueryParameters } from "../memberTypes";
import type { ApiResponse, PaginatedResult } from "@/shared/lib/sharedTypes";

export const memberService = {
  async getMembers(crateId: string, params?: MemberQueryParameters): Promise<PaginatedResult<Member>> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params?.searchTerm) queryParams.set("searchTerm", params.searchTerm);
    if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params?.ascending !== undefined) queryParams.set("ascending", params.ascending.toString());
    if (params?.filterByRole) queryParams.set("filterByRole", params.filterByRole);
    if (params?.recentOnly) queryParams.set("recentOnly", params.recentOnly.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const url = `/crates/${crateId}/members${queryString ? `?${queryString}` : ""}`;

    const response = await apiService.get<ApiResponse<PaginatedResult<Member>>>(url);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to fetch members:", errors);
      throw new Error(message ?? "Failed to fetch members");
    }

    return result;
  },
};
