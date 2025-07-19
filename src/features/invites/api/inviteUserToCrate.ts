import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";
import type { CrateInviteRequest } from "../types";

// Define a type to hold both parameters
type InviteUserParams = {
  crateId: string;
  data: CrateInviteRequest;
};

export const inviteUserToCrate = async ({ crateId, data }: InviteUserParams): Promise<void> => {
  const { value: result } = (await api.post<ApiResponse<void>>(`/crates/${crateId}/invites`, data)).data;
  return result!;
};
