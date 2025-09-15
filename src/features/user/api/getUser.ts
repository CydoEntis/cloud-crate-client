import type { ApiResponse } from "@/features/auth";
import type { User } from "../types/User";
import apiService from "@/shared/lib/api/ApiClient";

export const getUser = async (): Promise<User> => {
  const { data: result, isSuccess, errors } = (await apiService.get<ApiResponse<User>>("/user")).data;
  console.log(result);
  return result!;
};
