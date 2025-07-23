import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { CrateInviteRequest } from "../types/CrateInviteRequest";

type InviteUserParams = {
  crateId: string;
  data: CrateInviteRequest;
};

export const inviteUserToCrate = async ({ crateId, data }: InviteUserParams): Promise<void> => {
  await api.post<ApiResponse<void>>(`/crates/${crateId}/invites`, data);
};
