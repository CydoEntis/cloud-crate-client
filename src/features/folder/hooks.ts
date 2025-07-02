import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFolder, getRootFolders, getSubfolders, renameFolder, deleteFolder, moveFolder } from "./api";
import type { Folder, CreateFolderRequest, CreateFolderArgs } from "./types";
import { getFiles } from "../files/api";

export const useRootFolders = (crateId: string) =>
  useQuery<Folder[]>({
    queryKey: ["folders", crateId, "root"],
    queryFn: () => getRootFolders(crateId),
    enabled: !!crateId,
  });

// Pass crateId and parentId here and enable only if both present
export const useSubfolders = (crateId: string, parentId: string | null) =>
  useQuery<Folder[]>({
    queryKey: ["folders", crateId, "subfolders", parentId],
    queryFn: () => (crateId && parentId ? getSubfolders(crateId, parentId) : Promise.resolve([])),
    enabled: !!crateId && !!parentId,
  });

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, data }: CreateFolderArgs) => createFolder(crateId, data),
    onSuccess: (_, { crateId, data }) => {
      queryClient.invalidateQueries({ queryKey: ["folders", crateId, "root"] });

      if (data.parentFolderId) {
        queryClient.invalidateQueries({ queryKey: ["folders", crateId, "subfolders", data.parentFolderId] });
      }
    },
  });
};

export const useRenameFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ folderId, newName }: { folderId: string; newName: string }) => renameFolder(folderId, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

export const useMoveFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ folderId, newParentId }: { folderId: string; newParentId: string | null }) =>
      moveFolder(folderId, newParentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

export const useFolderContents = (crateId: string, folderId: string | null) => {
  const {
    data: folders = [],
    isLoading: isFoldersLoading,
    error: foldersError,
  } = useQuery({
    queryKey: ["folders", crateId, folderId ?? "root"],
    queryFn: () => (folderId ? getSubfolders(crateId, folderId) : getRootFolders(crateId)),
    enabled: !!crateId,
  });

  const {
    data: files = [],
    isLoading: isFilesLoading,
    error: filesError,
  } = useQuery({
    queryKey: ["files", crateId, folderId ?? "root"],
    queryFn: () => getFiles(crateId, folderId),
    enabled: !!crateId,
  });

  return {
    folders,
    files,
    isLoading: isFoldersLoading || isFilesLoading,
    error: foldersError || filesError,
  };
};
