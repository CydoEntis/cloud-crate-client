import type { CrateRole } from "@/features/invites/types/CrateRole";
import type { Member } from "./Member";

export type Crate = {
  id: string;
  name: string;
  color: string;
  owner: Member;
  usedStorage: number;
  joinedAt: Date;
};
