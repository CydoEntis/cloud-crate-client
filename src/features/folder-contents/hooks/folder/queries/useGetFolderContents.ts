import { useQuery } from "@tanstack/react-query";

import type { GetFolderContentsParams } from "../../../types/folder/GetFolderContentsParams";
import { getFolderContents } from "@/features/folder-contents/api/folder/getFolderContents";
import type { FolderContents } from "@/features/folder-contents/types/FolderContents";

export const useGetFolderContents = (
  crateId: string,
  folderId: string | null,
  params: GetFolderContentsParams = {}
) => {
  const key = folderId ?? "root";
  return useQuery<FolderContents>({
    queryKey: [
      "folderContents",
      crateId,
      key,
      params.page,
      params.pageSize,
      params.searchTerm,
      params.sortBy,
      params.ascending,
    ],
    queryFn: () => getFolderContents(crateId, folderId, params),
    enabled: !!crateId,
  });
};
