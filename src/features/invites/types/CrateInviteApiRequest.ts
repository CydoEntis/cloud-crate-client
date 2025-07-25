import type { CrateRole } from "./CrateRole";

export type CrateInviteApiRequest = {
  crateId: string;
  email: string;
  role: CrateRole;
  expiresAt: Date;
};
