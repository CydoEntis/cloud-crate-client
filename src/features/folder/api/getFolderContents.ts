import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { GetFolderContentsParams } from "../types/GetFolderContentsParams";
import { FolderContentsResultSchema, type FolderContentsResult } from "../schemas/FolderContentsSchema";

export const getFolderContents = async (
  crateId: string,
  folderId: string | null,
  params: GetFolderContentsParams = {}
): Promise<FolderContentsResult> => {
  const queryParams = new URLSearchParams();
  queryParams.append("Page", String(params.page ?? 1));
  queryParams.append("PageSize", String(params.pageSize ?? 20));

  if (params.sortBy) queryParams.append("SortBy", params.sortBy);
  if (params.orderBy) queryParams.append("OrderBy", params.orderBy);
  if (params.searchTerm) queryParams.append("SearchTerm", params.searchTerm);

  const url = folderId
    ? `/crates/${crateId}/folders/contents/${folderId}?${queryParams.toString()}`
    : `/crates/${crateId}/folders/contents?${queryParams.toString()}`;

  try {
    const response = await api.get<ApiResponse<any>>(url);
    const data = FolderContentsResultSchema.parse(response.data.value);
    console.log("Folder contents:", data);
    return data;
  } catch (err) {
    console.error("Error fetching folder contents:", err);
    throw err instanceof Error ? err : new Error("Unknown error fetching folder contents");
  }
};
