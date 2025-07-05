import api from "@/lib/api";

export const renameFolder = async (folderId: string, newName: string): Promise<void> => {
  await api.put(`/folders/${folderId}/rename`, { newName });
};
