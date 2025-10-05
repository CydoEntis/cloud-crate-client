import apiService from "@/shared/lib/api/ApiService";
import type { Member, MemberQueryParameters } from "../memberTypes";
import type { ApiResponse, PaginatedResult } from "@/shared/lib/sharedTypes";
import type { CrateRole } from "@/features/crates/crateTypes";

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

  async assignRole(crateId: string, userId: string, role: CrateRole): Promise<void> {
    try {
      const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/members/${userId}/role`, { role });

      const { isSuccess, message, errors } = response.data;
      if (!isSuccess) {
        console.error("Failed to assign role:", errors);
        throw new Error(message ?? "Failed to assign role");
      }

    } catch (error: any) {
      console.error("Full error object:", error);

      if (error.message === "Failed to assign role" || error.message?.includes("Failed to assign role")) {
        throw error;
      }

      if (error.response?.data) {
        const errorData = error.response.data;

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          throw new Error(errorMessages.join(", "));
        }

        if (errorData.message || errorData.title) {
          throw new Error(errorData.message || errorData.title);
        }
      }

      throw new Error(error.message || "Failed to assign role - unknown error");
    }
  },

  async removeMember(crateId: string, userId: string): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}/members/${userId}`);

      const { isSuccess, message, errors } = response.data;
      if (!isSuccess) {
        console.error("Failed to remove member:", errors);
        throw new Error(message ?? "Failed to remove member");
      }
    } catch (error: any) {
      if (error.response?.data) {
        const errorData = error.response.data;

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          throw new Error(errorMessages.join(", "));
        }

        if (errorData.message || errorData.title) {
          throw new Error(errorData.message || errorData.title);
        }
      }

      throw new Error(error.message || "Failed to remove member");
    }
  },

  async leaveCrate(crateId: string): Promise<void> {
    try {
      const response = await apiService.post<ApiResponse<void>>(`/crates/${crateId}/members/leave`);

      const { isSuccess, message, errors } = response.data;
      if (!isSuccess) {
        console.error("Failed to leave crate:", errors);
        throw new Error(message ?? "Failed to leave crate");
      }
    } catch (error: any) {
      if (error.response?.data) {
        const errorData = error.response.data;

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          throw new Error(errorMessages.join(", "));
        }

        if (errorData.message || errorData.title) {
          throw new Error(errorData.message || errorData.title);
        }
      }

      throw new Error(error.message || "Failed to leave crate");
    }
  },
};
