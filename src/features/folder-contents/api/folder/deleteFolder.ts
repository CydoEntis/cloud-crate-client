import apiService from "@/shared/lib/api/ApiClient";

export const deleteFolder = async (crateId: string, folderId: string): Promise<void> => {
  console.log(folderId);
  await apiService.delete(`/crates/${crateId}/folders/${folderId}`);
};
