export type CrateInvite = {
  crateId: string;
  crateName?: string;
  invitedUserEmail: string;
  role: string;
  token: string;
  status: string;
  expiresAt?: string;
};
