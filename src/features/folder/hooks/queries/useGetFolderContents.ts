import { useQuery } from "@tanstack/react-query";
import { getFolderContents } from "../../api/getFolderContents";
import type { FolderContentsResult } from "../../schemas/FolderContentsSchema";
import type { GetFolderContentsParams } from "../../types/GetFolderContentsParams";

export const useGetFolderContents = (
  crateId: string,
  folderId: string | null,
  params: GetFolderContentsParams = {}
) => {
  const key = folderId ?? "root";
  return useQuery<FolderContentsResult>({
    queryKey: [
      "folderContents",
      crateId,
      key,
      params.page,
      params.pageSize,
      params.searchTerm,
      params.sortBy,
      params.orderBy,
    ],
    queryFn: () => getFolderContents(crateId, folderId, params),
    enabled: !!crateId,
  });
};
