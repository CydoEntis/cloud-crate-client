import type { CrateRole } from "../crates/crate.types";

export type Member = {
  userId: string;
  email: string;
  displayName: string;
  profilePicture: string;
  role: CrateRole;
  joinedAt: string | Date;
};
