import type { ApiResponse, PaginatedResult } from "@/features/auth";
import type { FolderOrFileItem } from "../types/FolderOrFileItem";
import { FolderOrFileItemSchema } from "../schemas/FolderOrFileItemSchema";
import z from "zod";
import api from "@/lib/api";
import type { GetFolderContentsParams } from "../types/GetFolderContentsParams";

export const getFolderContents = async (
  crateId: string,
  folderId: string | null,
  params: GetFolderContentsParams = {}
): Promise<PaginatedResult<FolderOrFileItem> & { folderName: string; parentFolderId?: string | null }> => {
  const queryParams = new URLSearchParams();
  queryParams.append("Page", String(params.page ?? 1));
  queryParams.append("PageSize", String(params.pageSize ?? 20));

  if (params.sortBy) queryParams.append("SortBy", params.sortBy);
  if (params.orderBy) queryParams.append("OrderBy", params.orderBy);
  if (params.searchTerm) queryParams.append("SearchTerm", params.searchTerm); // <-- added search term

  const url = folderId
    ? `/crates/${crateId}/folders/contents/${folderId}?${queryParams.toString()}`
    : `/crates/${crateId}/folders/contents?${queryParams.toString()}`;

  try {
    const response =
      await api.get<
        ApiResponse<PaginatedResult<FolderOrFileItem> & { folderName: string; parentFolderId?: string | null }>
      >(url);

    const PaginatedFolderSchema = z.object({
      items: z.array(FolderOrFileItemSchema),
      totalCount: z.number().int(),
      page: z.number().int(),
      pageSize: z.number().int(),
      folderName: z.string(),
      parentFolderId: z.string().uuid().nullable().optional(),
    });

    console.log("FOLDER CONTENTS: ", response.data.value);

    return PaginatedFolderSchema.parse(response.data.value);
  } catch (err) {
    console.error("Error fetching folder contents:", err);
    throw err instanceof Error ? err : new Error("Unknown error fetching folder contents");
  }
};
