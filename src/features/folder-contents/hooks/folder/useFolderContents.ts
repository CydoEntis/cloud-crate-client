import { useGetFolderContents } from "./queries/useGetFolderContents";
import type { FolderContents } from "@/features/folder-contents/types/FolderContents";

export function useFolderContents(
  crateId: string,
  folderId: string | null,
  page: number,
  pageSize: number,
  searchTerm: string,
  sortBy: "Name" | "CreatedAt" | "Size",
  ascending: boolean,
) {
  const { data, isLoading, error, refetch } = useGetFolderContents(crateId, folderId, {
    page,
    pageSize,
    searchTerm,
    sortBy,
    ascending,
  });

  const folderContents: FolderContents = data ?? {
    folderName: "",
    parentFolderId: null,
    folders: [],
    files: [],
    breadcrumbs: [],
    totalFolders: 0,
    totalFiles: 0,
  };

  return {
    folderContents,
    breadcrumbs: folderContents.breadcrumbs,
    folderName: folderContents.folderName,
    parentFolderId: folderContents.parentFolderId,
    totalFolders: folderContents.totalFolders,
    totalFiles: folderContents.totalFiles,
    page,
    pageSize,
    isLoading,
    error,
    refetch,
  };
}
