import { useMemo } from "react";
import { injectBackRow } from "../utils/folderItemTransformer";
import { useGetFolderContents } from "./queries/useGetFolderContents";

export function useFolderContents(
  crateId: string,
  folderId: string | null,
  page: number,
  pageSize: number,
  searchTerm: string,
  sortBy: "Name" | "CreatedAt" | "Size",
  orderBy: "Asc" | "Desc"
) {
  const { data, isLoading, error, refetch } = useGetFolderContents(crateId, folderId, {
    page,
    pageSize,
    searchTerm,
    sortBy,
    orderBy,
  });

  const folderItemsWithBackRow = useMemo(() => {
    if (!data) return [];
    return injectBackRow(data.items, crateId);
  }, [data, crateId]);

  return {
    folderItemsWithBackRow,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
    refetch,
  };
}
