import type { CrateRole } from "@/features/invites/types/CrateRole";

export type Member = {
  userId: string;
  email: string;
  role: CrateRole;
}