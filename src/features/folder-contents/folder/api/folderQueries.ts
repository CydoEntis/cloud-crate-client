import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CrateFolder, CreateFolder, GetFolderContentsParams, MoveFolder } from "../folderTypes";
import type { FolderContents } from "../../sharedTypes";
import { folderService } from "./folderService";
import { SHARED_KEYS } from "@/features/shared/queryKeys";

export const folderKeys = {
  all: ["folders"] as const,
  contents: (crateId: string, folderId?: string | null) => SHARED_KEYS.folderContents(crateId, folderId),
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
    staleTime: 1000 * 15,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
};

export const useGetAvailableMoveTargets = (crateId: string, excludeFolderId?: string) => {
  return useQuery<CrateFolder[], Error>({
    queryKey: folderKeys.moveTargets(crateId, excludeFolderId),
    queryFn: () => folderService.getAvailableMoveTargets(crateId, excludeFolderId),
    enabled: !!crateId,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData: CreateFolder) => folderService.createFolder(folderData),
    onSuccess: (_, { crateId, parentFolderId }) => {
      queryClient.invalidateQueries({ queryKey: folderKeys.contents(crateId, parentFolderId) });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
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
      queryClient.invalidateQueries({
        queryKey: ["folder-contents", crateId],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      toast.success("Folder moved successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to move folder:", error);
      toast.error(error.message || "Failed to move folder");
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, folderId }: { crateId: string; folderId: string }) =>
      folderService.deleteFolder(crateId, folderId),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({
        queryKey: ["folder-contents", crateId],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      toast.success("Folder deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete folder:", error);
      toast.error(error.message || "Failed to delete folder");
    },
  });
};

export const useDownloadFolder = () => {
  return useMutation({
    mutationFn: ({ crateId, folderId }: { crateId: string; folderId: string }) =>
      folderService.downloadFolder(crateId, folderId),
    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error: Error) => {
      console.error("Failed to download folder:", error);
      toast.error(error.message || "Failed to download folder");
    },
  });
};

export const useEmptyTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crateId: string) => folderService.emptyTrash(crateId),
    onSuccess: (_, crateId) => {
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      queryClient.invalidateQueries({
        queryKey: ["folder-contents", crateId],
        exact: false,
      });
      toast.success("Trash emptied successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to empty trash:", error);
      toast.error(error.message || "Failed to empty trash");
    },
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      crateId,
      folderId,
      updateData,
    }: {
      crateId: string;
      folderId: string;
      updateData: { newName?: string; newColor?: string };
    }) =>
      folderService.updateFolder(crateId, folderId, {
        folderId,
        ...updateData,
      }),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({
        queryKey: ["folder-contents", crateId],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      toast.success("Folder updated successfully"); // Fixed toast message
    },
    onError: (error: Error) => {
      console.error("Failed to update folder:", error);
      toast.error(error.message || "Failed to update folder");
    },
  });
};
