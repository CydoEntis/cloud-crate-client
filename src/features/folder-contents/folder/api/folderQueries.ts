import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  CreateFolder,
  GetFolderContentsParams,
  MoveFolder,
  FolderResponse,
  GetAvailableMoveTargetsRequest,
} from "../folderTypes";
import { folderService } from "./folderService";
import { SHARED_KEYS } from "@/features/shared/queryKeys";
import type { FolderContents } from "../../sharedTypes";
import type { PaginatedResult } from "@/shared/lib/sharedTypes";

export const folderKeys = {
  all: ["folders"] as const,
  contents: (crateId: string, folderId?: string | null) => SHARED_KEYS.folderContents(crateId, folderId),
  moveTargets: (
    crateId: string,
    excludeIds?: string[],
    searchTerm?: string,
    page?: number,
    ascending?: boolean,
    currentFolderId?: string | null
  ) => [...folderKeys.all, "move-targets", crateId, excludeIds, searchTerm, page, ascending, currentFolderId] as const,
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

export const useGetAvailableMoveTargets = (request: GetAvailableMoveTargetsRequest) => {
  return useQuery<PaginatedResult<FolderResponse>, Error>({
    queryKey: folderKeys.moveTargets(
      request.crateId,
      request.excludeFolderIds,
      request.searchTerm,
      request.page,
      request.ascending,
      request.currentFolderId
    ),
    queryFn: () => folderService.getAvailableMoveTargets(request),
    enabled: !!request.crateId,
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

      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("move-targets") && queryKey.includes(crateId);
        },
      });

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
    mutationFn: ({
      crateId,
      folderId,
      moveData,
      sourceParentId,
    }: {
      crateId: string;
      folderId: string;
      moveData: MoveFolder;
      sourceParentId?: string | null;
    }) => folderService.moveFolder(crateId, folderId, moveData),
    onSuccess: (_, { crateId, moveData, sourceParentId }) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });

      if (sourceParentId !== undefined) {
        queryClient.invalidateQueries({
          queryKey: folderKeys.contents(crateId, sourceParentId),
        });
      }
      if (moveData.newParentId) {
        queryClient.invalidateQueries({
          queryKey: folderKeys.contents(crateId, moveData.newParentId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: folderKeys.contents(crateId, null),
        });
      }

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
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      queryClient.invalidateQueries({ queryKey: ["trash"] });

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
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
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
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });
      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      toast.success("Folder updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update folder:", error);
      toast.error(error.message || "Failed to update folder");
    },
  });
};

export const useBulkMoveItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      crateId,
      fileIds,
      folderIds,
      newParentId,
      sourceParentId,
    }: {
      crateId: string;
      fileIds: string[];
      folderIds: string[];
      newParentId: string | null;
      sourceParentId?: string | null;
    }) => folderService.bulkMoveItems(crateId, fileIds, folderIds, newParentId),

    onSuccess: (_, { crateId, newParentId, sourceParentId }) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });

      if (sourceParentId !== undefined) {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, sourceParentId),
        });
      }
      if (newParentId) {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, newParentId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, null),
        });
      }

      queryClient.invalidateQueries({ queryKey: folderKeys.moveTargets(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });

      toast.success("Items moved successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to move items:", error);
      toast.error(error.message || "Failed to move items");
    },
  });
};

export const useBulkSoftDeleteItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, fileIds, folderIds }: { crateId: string; fileIds: string[]; folderIds: string[] }) =>
      folderService.bulkSoftDeleteItems(crateId, fileIds, folderIds),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          if (!Array.isArray(key)) return false;
          if (key[0] !== "trash") return false;

          const params = key[2];
          if (!params) return true;
          return params.crateId === crateId;
        },
      });

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey.includes("folder-contents") &&
          query.queryKey.includes(crateId),
      });

      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });

      toast.success("Items moved to trash");
    },
    onError: (error: Error) => {
      console.error("Failed to delete items:", error);
      toast.error(error.message || "Failed to delete items");
    },
  });
};
