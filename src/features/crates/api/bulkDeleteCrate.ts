import apiService from "@/shared/lib/api/ApiClient";

export const bulkDeleteCrates = async (crateIds: string[]): Promise<number> => {
  const { data } = await apiService.post<{ value: number }>("/crates/bulk-delete", { crateIds });
  return data.value;
};
