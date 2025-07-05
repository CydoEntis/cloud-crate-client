// src/features/folder/hooks/useFolderContents.ts

import { getFiles } from "@/features/files/api";
import { useQuery } from "@tanstack/react-query";
import { getRootFolders } from "../api/getRootFolders";
import { getSubfolders } from "../api/getSubfolders";

export const useFolderContents = (crateId: string, folderId: string | null) => {
  const key = folderId ?? "root";

  const {
    data: folders = [],
    isLoading: isFoldersLoading,
    error: foldersError,
    refetch: refetchFolders,
  } = useQuery({
    queryKey: ["folders", crateId, key],
    queryFn: () => (folderId ? getSubfolders(crateId, folderId) : getRootFolders(crateId)),
    enabled: !!crateId,
  });

  const {
    data: files = [],
    isLoading: isFilesLoading,
    error: filesError,
    refetch: refetchFiles,
  } = useQuery({
    queryKey: ["files", crateId, key],
    queryFn: () => getFiles(crateId, folderId),
    enabled: !!crateId,
  });

  return {
    folders,
    files,
    isLoading: isFoldersLoading || isFilesLoading,
    error: foldersError || filesError,
    refetchFolders,
    refetchFiles,
  };
};
