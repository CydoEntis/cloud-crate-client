import type { CrateRole } from "../crates/crateTypes";

export type CrateInviteRequest = {
  crateId: string;
  invitedEmail: string;
  role: CrateRole;
};

export type CrateInvite = {
  id: string;
  crateId: string;
  crateName?: string;
  crateColor: string;
  invitedUserEmail: string;
  role: string;
  token: string;
  expiresAt?: string;
  status: string;
};
