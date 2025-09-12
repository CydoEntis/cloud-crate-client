import api from "@/lib/api";

export const getMembers = async (crateId: string): Promise<number> => {
  const { data } = await api.get<{ value: number }>(`/crates/${crateId}/members`);
  return data.value;
};
