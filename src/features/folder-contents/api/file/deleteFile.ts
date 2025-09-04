import api from "@/lib/api";

export const deleteFile = async (fileId: string, crateId: string): Promise<void> => {
  console.log("Deleting file: ", fileId);
  await api.delete(`/crates/${crateId}/files/${fileId}`);
};
