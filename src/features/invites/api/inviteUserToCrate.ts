import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { CrateInviteRequest } from "../types/CrateInviteRequest";
import type { CrateRole } from "../types/CrateRole";

export type InviteRequest = {
  crateId: string;
  email: string;
  role: CrateRole;
  expiresAt: Date;
};

export const inviteUserToCrate = async (data: InviteRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/invite`, data);
};
