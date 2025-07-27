import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";
import type { Crate } from "../types/Crate";

export const getUserCrates = async (): Promise<Crate[]> => {
  const { value: result } = (await api.get<ApiResponse<Crate[]>>("/crates")).data;
  return result!;
};
