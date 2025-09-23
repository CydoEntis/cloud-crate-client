import type { ApiResponse } from "@/features/auth";
import type { BulkMoveRequest } from "../types/BulkMoveRequest";
import apiService from "@/shared/lib/api/ApiService";

export const bulkMove = async (crateId: string, payload: BulkMoveRequest): Promise<void> => {
  await apiService.post<ApiResponse<void>>(`/crates/${crateId}/bulk/move`, payload);
};
