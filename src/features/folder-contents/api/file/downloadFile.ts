import apiService from "@/shared/lib/api/ApiClient";

export const downloadFile = async (crateId: string, fileId: string) => {
  const response = await apiService.get(`/crates/${crateId}/files/${fileId}/download`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  return blob;
};
