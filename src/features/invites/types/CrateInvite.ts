export type CrateInvite = {
  crateId: string;
  crateName?: string;
  invitedUserEmail: string;
  role: string;
  token: string;
  status: string;
  expiresAt?: string;
};

export type CrateInviteDetails = {
  id: string;
  crateId: string;
  crateName: string;
  invitedUserEmail: string;
  role: string;
  expiresAt?: string;
};
