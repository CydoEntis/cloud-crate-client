import api from "@/lib/api";
import type { ApiResponse } from "../types";

// TODO: Added Refresh Request Type
export const refresh = async (): Promise<{ accessToken: string }> => {
  const { data: result } = (await api.post<ApiResponse<{ accessToken: string }>>("/auth/refresh")).data;
  return result!;
};
