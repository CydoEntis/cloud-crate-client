import apiService from "@/shared/lib/api/ApiClient";

export const softDeleteFile = async (fileId: string, crateId: string): Promise<void> => {
  console.log("Soft deleting file: ", fileId);
  await apiService.put(`/crates/${crateId}/files/${fileId}/trash`);
};
