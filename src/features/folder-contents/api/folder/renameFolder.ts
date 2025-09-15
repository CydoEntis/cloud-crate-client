import apiService from "@/shared/lib/api/ApiClient";

export const renameFolder = async (folderId: string, newName: string): Promise<void> => {
  await apiService.put(`/folders/${folderId}/rename`, { newName });
};
