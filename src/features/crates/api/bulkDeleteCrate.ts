import api from "@/lib/api";

export const bulkDeleteCrates = async (crateIds: string[]): Promise<number> => {
  const { data } = await api.post<{ value: number }>("/crates/bulk-delete", { crateIds });
  return data.value;
};
