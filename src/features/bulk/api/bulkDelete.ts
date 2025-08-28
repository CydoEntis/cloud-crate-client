import type { ApiResponse } from "@/features/auth";
import type { BulkItemRequest } from "../types/BulkItemRequest";
import api from "@/lib/api";

export const bulkDelete = async (crateId: string, payload: BulkItemRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/delete`, payload);
};
