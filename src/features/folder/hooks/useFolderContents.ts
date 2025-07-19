import { useMemo } from "react";
import { injectBackRow } from "../utils/folderItemTransformer";
import { useGetFolderContents } from "./queries/useGetFolderContents";

export function useFolderContents(
  crateId: string,
  folderId: string | null,
  page: number,
  pageSize: number,
  search: string
) {
  const { data, isLoading, error, refetch } = useGetFolderContents(crateId, folderId, {
    page,
    pageSize,
    search,
  });

  const folderItemsWithBackRow = useMemo(() => {
    if (!data) return [];
    return injectBackRow(data.items, folderId, data.parentFolderId ?? null, crateId);
  }, [data, folderId, crateId]);

  return {
    folderItemsWithBackRow,
    folderName: data?.folderName ?? "",
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
    refetch,
  };
}
