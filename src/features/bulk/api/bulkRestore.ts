import api from "@/lib/api";
import type { BulkItemRequest } from "../types/BulkItemRequest";
import type { ApiResponse } from "@/features/auth";

export const bulkRestore = async (crateId: string, payload: BulkItemRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/restore`, payload);
};
