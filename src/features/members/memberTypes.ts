import type { CrateRole } from "../crates/crateTypes";

export type Member = {
  userId: string;
  email: string;
  displayName: string;
  profilePicture: string;
  role: CrateRole;
  joinedAt: string | Date;
};
