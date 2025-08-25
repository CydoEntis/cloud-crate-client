import api from "@/lib/api";
import type { ApiResponse } from "@/features/auth";
import type { BulkItemRequest, BulkMoveRequest } from "../hooks/bulk.hooks";


export const bulkMove = async (crateId: string, payload: BulkMoveRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/move`, payload);
};

export const bulkDelete = async (crateId: string, payload: BulkItemRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/delete`, payload);
};

export const bulkRestore = async (crateId: string, payload: BulkItemRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/restore`, payload);
};
