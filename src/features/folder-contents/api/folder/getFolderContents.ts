import type { ApiResponse } from "@/features/auth";
import type { GetFolderContentsParams } from "../../types/folder/GetFolderContentsParams";
import type { FolderContents } from "../../types/FolderContents";
import { folderContentsSchema } from "../../schemas/FolderContentsSchema";
import apiService from "@/shared/lib/api/ApiClient";

export const getFolderContents = async (
  crateId: string,
  folderId: string | null,
  params: GetFolderContentsParams = {}
): Promise<FolderContents> => {
  const queryParams = new URLSearchParams();

  queryParams.append("Page", String(params.page ?? 1));
  queryParams.append("PageSize", String(params.pageSize ?? 20));

  if (params.sortBy) queryParams.append("OrderBy", params.sortBy);

  if (typeof params.ascending === "boolean") {
    queryParams.append("Ascending", params.ascending ? "true" : "false");
  }

  if (params.searchTerm) queryParams.append("SearchTerm", params.searchTerm);

  const url = folderId
    ? `/crates/${crateId}/folders/contents/${folderId}?${queryParams.toString()}`
    : `/crates/${crateId}/folders/contents?${queryParams.toString()}`;

  try {
    const response = await apiService.get<ApiResponse<any>>(url);
    const data = folderContentsSchema.parse(response.data.data);
    console.log("Folder contents:", data);
    return data;
  } catch (err) {
    console.error("Error fetching folder contents:", err);
    throw err instanceof Error ? err : new Error("Unknown error fetching folder contents");
  }
};
