import apiService from "@/shared/lib/api/ApiService";
import type { ApiResponse, PaginatedResult } from "@/shared/lib/sharedTypes";
import type { FolderContents } from "../../sharedTypes";
import type {
  CreateFolder,
  CrateFolder,
  GetFolderContentsParams,
  MoveFolder,
  UpdateFolderRequest,
  FolderResponse,
  GetAvailableMoveTargetsRequest,
} from "../folderTypes";
import { moveFolderSchema } from "../folderSchema";

export const folderService = {
  async createFolder(data: CreateFolder): Promise<CrateFolder> {
    if (!data.parentFolderId) {
      throw new Error("parentFolderId is required for folder creation");
    }

    const payload = {
      crateId: data.crateId,
      name: data.name,
      color: data.color,
      parentFolderId: data.parentFolderId,
    };

    const response = await apiService.post<ApiResponse<CrateFolder>>(`/crates/${data.crateId}/folders`, payload);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to create folder:", errors);
      throw new Error(message ?? "Failed to create folder");
    }

    return result;
  },

  async getFolderContents(
    crateId: string,
    folderId: string | null,
    params: GetFolderContentsParams = {}
  ): Promise<FolderContents> {
    const queryParams = new URLSearchParams();

    queryParams.append("Page", String(params.page ?? 1));
    queryParams.append("PageSize", String(params.pageSize ?? 20));

    if (params.sortBy) queryParams.append("OrderBy", params.sortBy);
    if (typeof params.ascending === "boolean") {
      queryParams.append("Ascending", params.ascending ? "true" : "false");
    }
    if (params.searchTerm) queryParams.append("SearchTerm", params.searchTerm);

    const url = folderId
      ? `/crates/${crateId}/folders/contents/${folderId}?${queryParams.toString()}`
      : `/crates/${crateId}/folders/contents?${queryParams.toString()}`;

    const response = await apiService.get<ApiResponse<FolderContents>>(url);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to get folder contents:", errors);
      throw new Error(message ?? "Failed to fetch folder contents");
    }

    return result;
  },

  async getAvailableMoveTargets(request: GetAvailableMoveTargetsRequest): Promise<PaginatedResult<FolderResponse>> {
    const params = new URLSearchParams();

    if (request.excludeFolderIds?.length) {
      request.excludeFolderIds.forEach((id) => params.append("excludeFolderIds", id));
    }

    if (request.currentFolderId) params.append("currentFolderId", request.currentFolderId);
    if (request.searchTerm) params.append("searchTerm", request.searchTerm);
    params.append("page", (request.page ?? 1).toString());
    params.append("pageSize", (request.pageSize ?? 50).toString());
    params.append("ascending", (request.ascending ?? true).toString());

    const url = `/crates/${request.crateId}/folders/available-move-targets?${params.toString()}`;
    const response = await apiService.get<ApiResponse<PaginatedResult<FolderResponse>>>(url);

    const { data: result, isSuccess, message, errors } = response.data;
    if (!isSuccess || !result) {
      console.error("Failed to get available move targets:", errors);
      throw new Error(message ?? "Failed to fetch available move targets");
    }
    return result;
  },

  async moveFolder(crateId: string, folderId: string, moveData: MoveFolder): Promise<void> {
    const validatedData = moveFolderSchema.parse(moveData);

    const response = await apiService.put<ApiResponse<void>>(
      `/crates/${crateId}/folders/${folderId}/move`,
      validatedData
    );
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to move folder:", errors);
      throw new Error(message ?? "Failed to move folder");
    }
  },

  async updateFolder(crateId: string, folderId: string, updateData: UpdateFolderRequest): Promise<void> {
    const payload = {
      folderId: folderId,
      newName: updateData.newName,
      newColor: updateData.newColor,
    };

    const response = await apiService.put<ApiResponse<void>>(`/crates/${crateId}/folders/${folderId}`, payload);

    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to update folder:", errors);
      throw new Error(message ?? "Failed to update folder");
    }
  },

  async deleteFolder(crateId: string, folderId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}/folders/${folderId}`);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to delete folder:", errors);
      throw new Error(message ?? "Failed to delete folder");
    }
  },

  async downloadFolder(crateId: string, folderId: string): Promise<{ blob: Blob; fileName: string }> {
    const response = await apiService.get(`/crates/${crateId}/folders/${folderId}/download`, {
      responseType: "blob",
    });

    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") : "folder.zip";

    return {
      blob: response.data,
      fileName,
    };
  },

  async emptyTrash(crateId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/crates/${crateId}/folders/trash`);
    const { isSuccess, message, errors } = response.data;

    if (!isSuccess) {
      console.error("Failed to empty trash:", errors);
      throw new Error(message ?? "Failed to empty trash");
    }
  },

  async bulkMoveItems(
    crateId: string,
    fileIds: string[],
    folderIds: string[],
    newParentId: string | null
  ): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/crates/${crateId}/folders/bulk-move`, {
      fileIds,
      folderIds,
      newParentId,
    });

    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to move items:", errors);
      throw new Error(message ?? "Failed to move items");
    }
  },

  async bulkSoftDeleteItems(crateId: string, fileIds: string[], folderIds: string[]): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/crates/${crateId}/folders/bulk-delete`, {
      fileIds,
      folderIds,
    });

    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to delete items:", errors);
      throw new Error(message ?? "Failed to delete items");
    }
  },
};
