import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";
import type { UserCratesResponse } from "../types/UserCratesResponse";

export const getUserCrates = async (): Promise<UserCratesResponse> => {
  const { value: result } = (await api.get<ApiResponse<UserCratesResponse>>("/crates")).data;
  return result!;
};
