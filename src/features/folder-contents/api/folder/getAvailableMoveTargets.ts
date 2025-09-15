import type { ApiResponse } from "@/features/auth";
import apiService from "@/shared/lib/api/ApiClient";
import type { CrateFolder } from "../../types/folder/CrateFolder";

export const getAvailableMoveTargets = async (crateId: string, excludeFolderId?: string): Promise<CrateFolder[]> => {
  const query = excludeFolderId ? `?excludeFolderId=${excludeFolderId}` : "";
  const url = `/crates/${crateId}/folders/available-move-targets${query}`;

  const response = await apiService.get<ApiResponse<CrateFolder[]>>(url);
  return response.data.data ?? [];
};
