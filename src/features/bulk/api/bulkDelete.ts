import type { ApiResponse } from "@/features/auth";
import type { BulkItemRequest } from "../types/BulkItemRequest";
import apiService from "@/shared/lib/api/ApiClient";

export const bulkDelete = async (crateId: string, payload: BulkItemRequest): Promise<void> => {
  await apiService.post<ApiResponse<void>>(`/crates/${crateId}/bulk/delete`, payload);
};
