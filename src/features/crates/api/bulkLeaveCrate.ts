import api from "@/lib/api";

export const bulkLeaveCrates = async (crateIds: string[]): Promise<number> => {
  const { data } = await api.post<{ value: number }>("/crates/bulk-leave", { crateIds });
  return data.value;
};
