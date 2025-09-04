import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { User } from "../types/User";

export const getUser = async (): Promise<User> => {
  const { value: result, isSuccess, errors } = (await api.get<ApiResponse<User>>("/user")).data;
  console.log(result);
  return result!;
};
