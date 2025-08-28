import type { ApiResponse } from "@/features/auth";
import type { BulkMoveRequest } from "../types/BulkMoveRequest";
import api from "@/lib/api";

export const bulkMove = async (crateId: string, payload: BulkMoveRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/move`, payload);
};
