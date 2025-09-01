import { useMemo } from "react";
import { injectBackRow } from "../../utils/folder/folderItemTransformer";
import { useGetFolderContents } from "./queries/useGetFolderContents";

export function useFolderItems(
  crateId: string,
  folderId: string | null,
  page: number,
  pageSize: number,
  searchQuery: string
) {
  const { data, isLoading, error, refetch } = useGetFolderContents(crateId, folderId, {
    page,
    pageSize,
    search: searchQuery,
  });

  const folderItemsWithBackRow = useMemo(() => {
    if (!data) return [];
    return injectBackRow(data.items, folderId, data.parentFolderId ?? null, crateId);
  }, [data, folderId, crateId]);

  return {
    data,
    isLoading,
    error,
    refetch,
    folderItemsWithBackRow,
  };
}
