import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import { FolderContentsResponseSchema } from "../schemas";
import type { FolderContentsResponse } from "../types";

export const getFolderContents = async (
  crateId: string,
  folderId: string | null,
  params: { page: number; pageSize: number; search: string }
): Promise<FolderContentsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString());
  if (params.search) queryParams.append("search", params.search);

  const folderSegment = folderId ? `contents/${folderId}` : "contents";
  const url = `/crates/${crateId}/folders/${folderSegment}?${queryParams.toString()}`;

  try {
    const response = await api.get<ApiResponse<FolderContentsResponse>>(url);
    return FolderContentsResponseSchema.parse(response.data.data);
  } catch (err) {
    console.error("Error fetching folder contents:", err);
    throw err instanceof Error ? err : new Error("Unknown error occurred while fetching folder contents");
  }
};
