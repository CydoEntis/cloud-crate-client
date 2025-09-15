import apiService from "@/shared/lib/api/ApiClient";

export const bulkLeaveCrates = async (crateIds: string[]): Promise<number> => {
  const { data } = await apiService.post<{ value: number }>("/crates/bulk-leave", { crateIds });
  return data.value;
};
