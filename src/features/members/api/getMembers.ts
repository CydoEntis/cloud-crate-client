import apiService from "@/shared/lib/api/ApiClient";

export const getMembers = async (crateId: string): Promise<number> => {
  const { data } = await apiService.get<{ value: number }>(`/crates/${crateId}/members`);
  return data.value;
};
