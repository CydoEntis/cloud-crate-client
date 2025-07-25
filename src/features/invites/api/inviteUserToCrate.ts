import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { CrateRole } from "../types/CrateRole";
import type { CrateInviteApiRequest } from "../types/CrateInviteApiRequest";

export const inviteUserToCrate = async (data: CrateInviteApiRequest): Promise<void> => {
  await api.post<ApiResponse<void>>(`/invite`, data);
};
