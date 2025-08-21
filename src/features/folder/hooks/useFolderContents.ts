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
    return injectBackRow(data.items, crateId, data.breadcrumbs);
  }, [data, crateId]);

  return {
    folderItemsWithBackRow,
    breadcrumbs: data?.breadcrumbs ?? [],
    folderName: data?.folderName ?? null,
    parentFolderId: data?.parentFolderId ?? null,
    totalCount: data?.totalCount ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 20,
    isLoading,
    error,
    refetch,
  };
}
