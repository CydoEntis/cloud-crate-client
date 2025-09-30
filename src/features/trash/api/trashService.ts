import apiService from "@/shared/lib/api/ApiService";
import type { ApiResponse, PaginatedResult } from "@/shared/lib/sharedTypes";
import type { TrashItem, TrashQueryParams } from "../trashTypes";

const ALL_CRATES_ID = "00000000-0000-0000-0000-000000000000";

export const trashService = {
  async getTrashItems(params: TrashQueryParams): Promise<PaginatedResult<TrashItem>> {
    const queryParams = new URLSearchParams();

    queryParams.append("page", String(params.page ?? 1));
    queryParams.append("pageSize", String(params.pageSize ?? 20));

    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (typeof params.ascending === "boolean") {
      queryParams.append("ascending", params.ascending ? "true" : "false");
    }
    if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);

    // Use ALL_CRATES_ID if no crateId specified
    const crateId = params.crateId || ALL_CRATES_ID;
    const url = `/crates/${crateId}/folders/trash?${queryParams.toString()}`;
    const response = await apiService.get<ApiResponse<PaginatedResult<TrashItem>>>(url);

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to get trash items:", errors);
      throw new Error(message ?? "Failed to fetch trash items");
    }

    return result;
  },

  async restoreFile(crateId: string, fileId: string): Promise<void> {
    const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/files/${fileId}/restore`);

    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to restore file:", errors);
      throw new Error(message ?? "Failed to restore file");
    }
  },

  async restoreFolder(crateId: string, folderId: string): Promise<void> {
    const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/folders/${folderId}/restore`);

    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to restore folder:", errors);
      throw new Error(message ?? "Failed to restore folder");
    }
  },

  async permanentlyDeleteFile(crateId: string, fileId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}/files/${fileId}`);

    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to permanently delete file:", errors);
      throw new Error(message ?? "Failed to permanently delete file");
    }
  },

  async permanentlyDeleteFolder(crateId: string, folderId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}/folders/${folderId}/permanent`);

    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to permanently delete folder:", errors);
      throw new Error(message ?? "Failed to permanently delete folder");
    }
  },
};
