import apiService from "@/shared/lib/api/ApiService";
import type { ApiResponse } from "@/shared/lib/sharedTypes";
import type { CrateFile, SingleUploadFile, MultiUploadFile, MoveFile, UpdateFileRequest } from "../fileTypes";

export const fileService = {
  async getFile(crateId: string, fileId: string): Promise<CrateFile> {
    const response = await apiService.get<ApiResponse<CrateFile>>(`/crates/${crateId}/files/${fileId}`);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to get file:", errors);
      throw new Error(message ?? `Failed to fetch file with id ${fileId}`);
    }

    return result;
  },

  async getFiles(crateId: string, folderId?: string | null): Promise<CrateFile[]> {
    const params = new URLSearchParams();
    if (folderId) params.append("folderId", folderId);

    const response = await apiService.get<ApiResponse<CrateFile[]>>(
      `/crates/${crateId}/files${params.toString() ? `?${params.toString()}` : ""}`
    );
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to get files:", errors);
      throw new Error(message ?? "Failed to fetch files");
    }

    return result;
  },

  async uploadFile({ crateId, folderId, file, onProgress }: SingleUploadFile): Promise<CrateFile> {
    const formData = new FormData();
    formData.append("file", file);
    if (folderId) formData.append("folderId", folderId);

    const response = await apiService.post<ApiResponse<CrateFile>>(`/crates/${crateId}/files`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress?.(percent);
      },
    });

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to upload file:", errors);
      throw new Error(message ?? "Failed to upload file");
    }

    return result;
  },

  async uploadFiles({ crateId, folderId, files, onProgress }: MultiUploadFile): Promise<CrateFile[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (folderId) formData.append("folderId", folderId);

    const response = await apiService.post<ApiResponse<CrateFile[]>>(
      `/crates/${crateId}/files/upload-multiple`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress?.(percent);
        },
      }
    );

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to upload files:", errors);
      throw new Error(message ?? "Failed to upload files");
    }

    return result;
  },

  async updateFile(crateId: string, fileId: string, updateData: UpdateFileRequest): Promise<void> {
    const payload = {
      fileId: fileId,
      newName: updateData.newName,
    };

    const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/files/${fileId}`, payload);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to update file:", errors);
      throw new Error(message ?? "Failed to update file");
    }
  },

  async moveFile(crateId: string, fileId: string, moveData: MoveFile): Promise<void> {
    const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/files/${fileId}/move`, moveData);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to move file:", errors);
      throw new Error(message ?? "Failed to move file");
    }
  },

  async deleteFile(crateId: string, fileId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}/files/${fileId}`);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to delete file:", errors);
      throw new Error(message ?? "Failed to delete file");
    }
  },

  async softDeleteFile(crateId: string, fileId: string): Promise<void> {
    const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/files/${fileId}/trash`);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to soft delete file:", errors);
      throw new Error(message ?? "Failed to move file to trash");
    }
  },

  async downloadFile(crateId: string, fileId: string): Promise<Blob> {
    try {
      const response = await apiService.get(`/crates/${crateId}/files/${fileId}/download`, {
        responseType: "blob",
      });

      return new Blob([response.data]);
    } catch (error) {
      console.error("Failed to download file:", error);
      throw new Error("Failed to download file");
    }
  },
};

