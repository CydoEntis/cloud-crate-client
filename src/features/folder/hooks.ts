import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFolder, getRootFolders, getSubfolders, renameFolder, deleteFolder, moveFolder } from "./api";
import type { Folder, CreateFolderRequest, CreateFolderArgs } from "./types";

export const useRootFolders = (crateId: string) =>
  useQuery<Folder[]>({
    queryKey: ["folders", "root", crateId],
    queryFn: () => getRootFolders(crateId),
    enabled: !!crateId,
  });

export const useSubfolders = (parentId: string | null) =>
  useQuery<Folder[]>({
    queryKey: ["folders", "subfolders", parentId],
    queryFn: () => (parentId ? getSubfolders(parentId) : Promise.resolve([])),
    enabled: !!parentId,
  });

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, data }: CreateFolderArgs) => createFolder(crateId, data),
    onSuccess: (_, { crateId, data }) => {
      queryClient.invalidateQueries({ queryKey: ["folders", "root", crateId] });

      if (data.parentFolderId) {
        queryClient.invalidateQueries({ queryKey: ["folders", "subfolders", data.parentFolderId] });
      }
    },
  });
};

// Rename a folder
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
