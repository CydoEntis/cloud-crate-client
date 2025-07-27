import type { Crate } from "./Crate";

export type UserCratesResponse = {
  Owned: Crate[];
  Joined: Crate[];
};
