import type { CrateRole } from "../crates/crate.types";

export type CrateInviteRequest = {
  crateId: string;
  email: string;
  role: CrateRole;
  expiresAt: Date;
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
