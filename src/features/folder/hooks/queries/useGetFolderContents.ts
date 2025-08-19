import { useQuery } from "@tanstack/react-query";
import { getFolderContents } from "../../api/getFolderContents";
import type { FolderContentsResponse } from "../../types/response/FolderContentsResponse";

export const useGetFolderContents = (
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
) => {
  const key = folderId ?? "root";
  return useQuery<FolderContentsResponse>({
    queryKey: [
      "folderContents",
      crateId,
      key,
      params.page,
      params.pageSize,
      params.search,
      params.sortBy,
      params.orderBy,
      params.searchSubfolders,
    ],
    queryFn: () => getFolderContents(crateId, folderId, params),
    enabled: !!crateId,
  });
};
