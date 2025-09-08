import type { CrateRole } from "@/features/invites/types/CrateRole";

export type Member = {
  userId: string;
  email: string;
  displayName: string;
  profilePicture: string;
  role: CrateRole;
  joinedAt: string | Date;
}