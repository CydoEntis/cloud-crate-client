import { useQuery } from "@tanstack/react-query";
import { getFolderContents } from "../../api/getFolderContents";
import type { FolderContentsResponse } from "../../types/response/FolderContentsResponse";

export const useGetFolderContents = (
  crateId: string,
  folderId: string | null,
  params: { page: number; pageSize: number; search: string }
) => {
  const key = folderId ?? "root";

  return useQuery<FolderContentsResponse>({
    queryKey: ["folderContents", crateId, key, params.page, params.pageSize, params.search],
    queryFn: () => getFolderContents(crateId, folderId, params),
    enabled: !!crateId,
  });
};
