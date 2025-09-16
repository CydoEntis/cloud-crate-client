import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { folderService } from "./folder.service";
import type { CrateFolder, CreateFolder, GetFolderContentsParams, MoveFolder } from "../types/folder.types";
import type { FolderContents } from "../types/shared.types";

export const folderKeys = {
  all: ["folders"] as const,
  contents: (crateId: string, folderId?: string | null) => ["folder-contents", crateId, folderId] as const,
  moveTargets: (crateId: string, excludeId?: string) =>
    [...folderKeys.all, "move-targets", crateId, excludeId] as const,
};

export const useGetFolderContents = (
  crateId: string,
  folderId: string | null,
  params: GetFolderContentsParams = {}
) => {
  return useQuery<FolderContents, Error>({
    queryKey: [...folderKeys.contents(crateId, folderId), params],
    queryFn: () => folderService.getFolderContents(crateId, folderId, params),
    enabled: !!crateId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetAvailableMoveTargets = (crateId: string, excludeFolderId?: string) => {
  return useQuery<CrateFolder[], Error>({
    queryKey: folderKeys.moveTargets(crateId, excludeFolderId),
    queryFn: () => folderService.getAvailableMoveTargets(crateId, excludeFolderId),
    enabled: !!crateId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData: CreateFolder) => folderService.createFolder(folderData),
    onSuccess: (_, { crateId, parentFolderId }) => {
      queryClient.invalidateQueries({ queryKey: folderKeys.contents(crateId, parentFolderId) });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      toast.success("Folder created successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to create folder:", error);
      toast.error(error.message || "Failed to create folder");
    },
  });
};

export const useMoveFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, folderId, moveData }: { crateId: string; folderId: string; moveData: MoveFolder }) =>
      folderService.moveFolder(crateId, folderId, moveData),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId] });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      toast.success("Folder moved successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to move folder:", error);
      toast.error(error.message || "Failed to move folder");
    },
  });
};

export const useRenameFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ folderId, newName }: { folderId: string; newName: string }) =>
      folderService.renameFolder(folderId, newName),
    onSuccess: (_, { folderId }) => {
      queryClient.invalidateQueries({ queryKey: ["folder-contents"] });
      toast.success("Folder renamed successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to rename folder:", error);
      toast.error(error.message || "Failed to rename folder");
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, folderId }: { crateId: string; folderId: string }) =>
      folderService.deleteFolder(crateId, folderId),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId] });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      toast.success("Folder deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete folder:", error);
      toast.error(error.message || "Failed to delete folder");
    },
  });
};
