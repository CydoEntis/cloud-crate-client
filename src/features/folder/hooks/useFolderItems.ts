import { useMemo } from "react";
import { useGetFolderContentsQuery } from "./queries/useGetFolderContentsQuery";
import { injectBackRow } from "../utils/folderItemTransformer";

export function useFolderItems(
  crateId: string,
  folderId: string | null,
  page: number,
  pageSize: number,
  searchQuery: string
) {
  const { data, isLoading, error, refetch } = useGetFolderContentsQuery(crateId, folderId, {
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
