import api from "@/lib/api";

export const deleteFolder = async (folderId: string): Promise<void> => {
  await api.delete(`/folders/${folderId}`);
};
