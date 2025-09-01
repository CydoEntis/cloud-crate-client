import api from "@/lib/api";
import type { Folder } from "../types/Folder";
import type { ApiResponse } from "@/features/auth";

export const getAvailableMoveTargets = async (crateId: string, excludeFolderId?: string): Promise<Folder[]> => {
  const query = excludeFolderId ? `?excludeFolderId=${excludeFolderId}` : "";
  const url = `/crates/${crateId}/folders/available-move-targets${query}`;

  const response = await api.get<ApiResponse<Folder[]>>(url);
  return response.data.value ?? [];
};
