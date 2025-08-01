import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";

export const leaveCrate = async (crateId: string): Promise<string> => {
  const response = await api.delete<ApiResponse<string>>(`/crates/${crateId}/leave`);
  return response.data.value!;
};
