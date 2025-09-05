import type { Member } from "./Member";

export type Crate = {
  id: string;
  name: string;
  color: string;
  owner: Member;
  usedStorageBytes: number;
  totalStorageBytes: number;
  joinedAt: Date;
};
