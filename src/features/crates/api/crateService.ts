import apiService from "@/shared/lib/api/ApiClient";
import type { ApiResponse, PaginatedResult } from "@/features/auth/authTypes";

import type { Crate, CrateDetails, CreateCrateRequest, GetCrateParams, UpdateCrateRequest } from "../crateTypes";

export const crateService = {
  async getCrate(crateId: string): Promise<CrateDetails> {
    const response = await apiService.get<ApiResponse<CrateDetails>>(`/crates/${crateId}`);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to get crate:", errors);
      throw new Error(message ?? `Failed to fetch crate with id ${crateId}`);
    }

    return result;
  },

  async getCrates(crateParams: GetCrateParams): Promise<PaginatedResult<Crate>> {
    const { searchTerm, sortBy = "Name", ascending = false, page = 1, memberType = "All" } = crateParams;
    const params = new URLSearchParams();

    if (searchTerm) params.append("SearchTerm", searchTerm);
    if (sortBy) params.append("SortBy", sortBy);
    params.append("Ascending", ascending.toString());
    params.append("Page", page.toString());
    if (memberType) params.append("MemberType", memberType);

    const response = await apiService.get<ApiResponse<PaginatedResult<Crate>>>(`/crates?${params.toString()}`);

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to fetch crates:", errors);
      throw new Error(message ?? "Failed to fetch crates");
    }

    return result;
  },

  async createCrate(request: CreateCrateRequest): Promise<Crate> {
    const response = await apiService.post<ApiResponse<Crate>>("/crates", request);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to create crate:", errors);
      throw new Error(message ?? "Failed to create crate");
    }

    return result;
  },

  async updateCrate(crateId: string, request: UpdateCrateRequest): Promise<Crate> {
    const response = await apiService.put<ApiResponse<Crate>>(`/crates/${crateId}`, request);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to update crate:", errors);
      throw new Error(message ?? "Failed to update crate");
    }

    return result;
  },

  async deleteCrate(crateId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}`);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to delete crate:", errors);
      throw new Error(message ?? "Failed to delete crate");
    }
  },

  async leaveCrate(crateId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/crates/${crateId}/leave`);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to leave crate:", errors);
      throw new Error(message ?? "Failed to leave crate");
    }
  },

  async bulkDeleteCrate(crateIds: string[]): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/crates/bulk-delete`, { crateIds });
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to delete crates:", errors);
      throw new Error(message ?? "Failed to delete crates");
    }
  },

  async bulkLeaveCrate(crateIds: string[]): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/crates/bulk-leave`, { crateIds });
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to leave crates:", errors);
      throw new Error(message ?? "Failed to leave crates");
    }
  },
};
