import api from "@/lib/api";
import type { ApiResponse } from "@/features/auth";

interface BulkMoveRequest {
  fileIds: string[];
  folderIds: string[];
  newParentId: string | null;
}

interface BulkDeleteRequest {
  fileIds: string[];
  folderIds: string[];
}

interface BulkRestoreRequest {
  fileIds: string[];
  folderIds: string[];
}

export const bulkMove = async (crateId: string, payload: BulkMoveRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/move`, payload);
};

export const bulkDelete = async (crateId: string, payload: BulkDeleteRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/delete`, payload);
};

export const bulkRestore = async (crateId: string, payload: BulkRestoreRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/bulk/restore`, payload);
};
