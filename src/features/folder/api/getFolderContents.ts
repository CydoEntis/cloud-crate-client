import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { FolderContentsResponse } from "../types/response/FolderContentsResponse";
import { FolderContentsResponseSchema } from "../schemas/FolderContentsResponseSchema";

export const getFolderContents = async (
  crateId: string,
  folderId: string | null,
  params: {
    page: number;
    pageSize: number;
    search: string;
    sortBy: "Name" | "CreatedAt" | "SizeInBytes";
    orderBy: "Asc" | "Desc";
    searchSubfolders: boolean;
  }
): Promise<FolderContentsResponse> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.orderBy) queryParams.append("orderBy", params.orderBy);
  if (typeof params.searchSubfolders === "boolean") {
    queryParams.append("searchSubfolders", String(params.searchSubfolders));
  }

  const folderSegment = folderId ? `contents/${folderId}` : "contents";
  const url = `/crates/${crateId}/folders/${folderSegment}?${queryParams.toString()}`;

  try {
    const response = await api.get<ApiResponse<FolderContentsResponse>>(url);
    // simulate latency if you want:
    // await new Promise((res) => setTimeout(res, 1500));
    return FolderContentsResponseSchema.parse(response.data.value);
  } catch (err) {
    console.error("Error fetching folder contents:", err);
    throw err instanceof Error ? err : new Error("Unknown error occurred while fetching folder contents");
  }
};
