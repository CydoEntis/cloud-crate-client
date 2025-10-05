import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CrateFile, SingleUploadFile, MultiUploadFile, MoveFile, UpdateFileRequest } from "../fileTypes";
import { fileService } from "./fileService";
import { SHARED_KEYS } from "@/features/shared/queryKeys";

export const fileKeys = {
  all: ["files"] as const,
  lists: () => [...fileKeys.all, "list"] as const,
  list: (crateId: string, folderId?: string | null) => [...fileKeys.lists(), crateId, folderId] as const,
  details: () => [...fileKeys.all, "detail"] as const,
  detail: (crateId: string, fileId: string) => [...fileKeys.details(), crateId, fileId] as const,
};

export const useGetFile = (crateId: string, fileId: string) => {
  return useQuery<CrateFile, Error>({
    queryKey: fileKeys.detail(crateId, fileId),
    queryFn: () => fileService.getFile(crateId, fileId),
    enabled: !!crateId && !!fileId,
    staleTime: 1000 * 15,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
};

export const useGetFiles = (crateId: string, folderId?: string | null) => {
  return useQuery<CrateFile[], Error>({
    queryKey: fileKeys.list(crateId, folderId),
    queryFn: () => fileService.getFiles(crateId, folderId),
    enabled: !!crateId,
    staleTime: 1000 * 15,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uploadData: SingleUploadFile) => fileService.uploadFile(uploadData),
    onSuccess: (_, { crateId, folderId }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.list(crateId, folderId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.folderContents(crateId, folderId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.user() });
      toast.success("File uploaded successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to upload file:", error);
      toast.error(error.message || "Failed to upload file");
    },
  });
};

export const useUploadFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uploadData: MultiUploadFile) => fileService.uploadFiles(uploadData),
    onSuccess: (_, { crateId, folderId }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.list(crateId, folderId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.folderContents(crateId, folderId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.user() });
      toast.success("Files uploaded successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to upload files:", error);
      toast.error(error.message || "Failed to upload files");
    },
  });
};

export const useUpdateFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, fileId, updateData }: { crateId: string; fileId: string; updateData: UpdateFileRequest }) =>
      fileService.updateFile(crateId, fileId, updateData),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      toast.success("File updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update file:", error);
      toast.error(error.message || "Failed to update file");
    },
  });
};

export const useMoveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      crateId,
      fileId,
      moveData,
      sourceParentId,
    }: {
      crateId: string;
      fileId: string;
      moveData: MoveFile;
      sourceParentId?: string | null;
    }) => fileService.moveFile(crateId, fileId, moveData),
    onSuccess: (_, { crateId, moveData, sourceParentId }) => {
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
      if (moveData.newParentId) {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, moveData.newParentId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, null),
        });
      }

      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });

      toast.success("File moved successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to move file:", error);
      toast.error(error.message || "Failed to move file");
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, fileId }: { crateId: string; fileId: string }) => fileService.deleteFile(crateId, fileId),
    onSuccess: (_, { crateId, fileId }) => {
      queryClient.removeQueries({ queryKey: fileKeys.detail(crateId, fileId) });
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.user() });
      toast.success("File deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete file:", error);
      toast.error(error.message || "Failed to delete file");
    },
  });
};

export const useSoftDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, fileId }: { crateId: string; fileId: string }) =>
      fileService.softDeleteFile(crateId, fileId),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });

      queryClient.invalidateQueries({ queryKey: ["trash"] });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });

      toast.success("File moved to trash");
    },
    onError: (error: Error) => {
      console.error("Failed to move file to trash:", error);
      toast.error(error.message || "Failed to move file to trash");
    },
  });
};

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: async ({ crateId, fileId, fileName }: { crateId: string; fileId: string; fileName: string }) => {
      const blob = await fileService.downloadFile(crateId, fileId);
      return { blob, fileName };
    },
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
      console.error("Failed to download file:", error);
      toast.error(error.message || "Failed to download file");
    },
  });
};

export const useBulkDownloadFiles = () => {
  return useMutation({
    mutationFn: async ({
      crateId,
      fileIds,
      archiveName,
    }: {
      crateId: string;
      fileIds: string[];
      archiveName?: string;
    }) => {
      const blob = await fileService.bulkDownloadFiles(crateId, fileIds, archiveName);
      return { blob, archiveName: archiveName || "files.zip" };
    },
    onSuccess: ({ blob, archiveName }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = archiveName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Files downloaded successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to bulk download files:", error);
      toast.error(error.message || "Failed to download files");
    },
  });
};
