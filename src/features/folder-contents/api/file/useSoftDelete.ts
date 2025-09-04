import api from "@/lib/api";

export const softDeleteFile = async (fileId: string, crateId: string): Promise<void> => {
  console.log("Soft deleting file: ", fileId);
  await api.put(`/crates/${crateId}/files/${fileId}/trash`);
};
