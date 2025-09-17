import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CrateFile, SingleUploadFile, MultiUploadFile, MoveFile } from "../fileTypes";
import { fileService } from "./fileService";

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
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetFiles = (crateId: string, folderId?: string | null) => {
  return useQuery<CrateFile[], Error>({
    queryKey: fileKeys.list(crateId, folderId),
    queryFn: () => fileService.getFiles(crateId, folderId),
    enabled: !!crateId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uploadData: SingleUploadFile) => fileService.uploadFile(uploadData),
    onSuccess: (_, { crateId, folderId }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.list(crateId, folderId) });
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId, folderId] });
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
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId, folderId] });
      toast.success("Files uploaded successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to upload files:", error);
      toast.error(error.message || "Failed to upload files");
    },
  });
};

export const useMoveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, fileId, moveData }: { crateId: string; fileId: string; moveData: MoveFile }) =>
      fileService.moveFile(crateId, fileId, moveData),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId] });
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
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId] });
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
      queryClient.invalidateQueries({ queryKey: ["folder-contents", crateId] });
      toast.success("File moved to trash");
    },
    onError: (error: Error) => {
      console.error("Failed to move file to trash:", error);
      toast.error(error.message || "Failed to move file to trash");
    },
  });
};

export const useDownloadFile = () => {
  return useMutation<Blob, Error, { crateId: string; fileId: string }>({
    mutationFn: async ({ crateId, fileId }) => {
      const response = await fetch(`/api/crates/${crateId}/files/${fileId}/download`);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      return response.blob();
    },
  });
};
