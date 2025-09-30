import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TrashQueryParams } from "../trashTypes";
import { trashService } from "./trashService";
import { SHARED_KEYS } from "@/features/shared/queryKeys";

export const trashKeys = {
  all: ["trash"] as const,
  items: (params?: Partial<TrashQueryParams>) => [...trashKeys.all, "items", params] as const,
};

export const useGetTrashItems = (params: TrashQueryParams) => {
  return useQuery({
    queryKey: trashKeys.items(params),
    queryFn: () => trashService.getTrashItems(params),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
  });
};

export const useRestoreItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ crateId, itemId, isFolder }: { crateId: string; itemId: string; isFolder: boolean }) => {
      if (isFolder) {
        await trashService.restoreFolder(crateId, itemId);
      } else {
        await trashService.restoreFile(crateId, itemId);
      }
    },
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({
        queryKey: trashKeys.all,
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });
      queryClient.invalidateQueries({
        queryKey: SHARED_KEYS.crateDetails(crateId),
      });
    },
    onError: (error: Error) => {
      console.error("Failed to restore item:", error);
      toast.error(error.message || "Failed to restore item");
    },
  });
};

export const usePermanentlyDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ crateId, itemId, isFolder }: { crateId: string; itemId: string; isFolder: boolean }) => {
      if (isFolder) {
        await trashService.permanentlyDeleteFolder(crateId, itemId);
      } else {
        await trashService.permanentlyDeleteFile(crateId, itemId);
      }
    },
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({
        queryKey: trashKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: SHARED_KEYS.crateDetails(crateId),
      });
    },
    onError: (error: Error) => {
      console.error("Failed to permanently delete item:", error);
      toast.error(error.message || "Failed to permanently delete item");
    },
  });
};

export const useBulkRestoreItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items }: { items: Array<{ crateId: string; itemId: string; isFolder: boolean }> }) => {
      const restorePromises = items.map(({ crateId, itemId, isFolder }) =>
        isFolder ? trashService.restoreFolder(crateId, itemId) : trashService.restoreFile(crateId, itemId)
      );
      await Promise.all(restorePromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trashKeys.all,
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents");
        },
      });
      toast.success("Items restored successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to restore items:", error);
      toast.error(error.message || "Failed to restore items");
    },
  });
};

export const useBulkDeleteItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items }: { items: Array<{ crateId: string; itemId: string; isFolder: boolean }> }) => {
      const deletePromises = items.map(({ crateId, itemId, isFolder }) =>
        isFolder
          ? trashService.permanentlyDeleteFolder(crateId, itemId)
          : trashService.permanentlyDeleteFile(crateId, itemId)
      );
      await Promise.all(deletePromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trashKeys.all,
      });
      toast.success("Items permanently deleted");
    },
    onError: (error: Error) => {
      console.error("Failed to permanently delete items:", error);
      toast.error(error.message || "Failed to permanently delete items");
    },
  });
};
