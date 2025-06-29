import api from "@/lib/api";

export const uploadFile = async ({ crateId, file, folderId }: { crateId: string; file: File; folderId?: string }) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) formData.append("folderId", folderId);

  const { data } = await api.post(`/crates/${crateId}/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
