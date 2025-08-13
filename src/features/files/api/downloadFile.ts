import api from "@/lib/api";

export const downloadFile = async (crateId: string, fileId: string) => {
  const response = await api.get(`/crates/${crateId}/files/${fileId}/download`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  return blob;
};
