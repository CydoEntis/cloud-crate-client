import api from "@/lib/api";

export const deleteFolder = async (crateId: string, folderId: string): Promise<void> => {
  console.log(folderId);
  await api.delete(`/crates/${crateId}/folders/${folderId}`);
};
