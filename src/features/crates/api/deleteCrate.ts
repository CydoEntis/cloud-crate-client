import type { ApiResponse } from "@/features/auth/types";
import apiService from "@/shared/lib/api/ApiClient";

export const deleteCrate = async (crateId: string): Promise<string> => {
  const response = await apiService.delete<ApiResponse<string>>(`/crates/${crateId}`);
  return response.data.data!;
};
