import type { Crate } from "./Crate";

export type UserCratesResponse = {
  owned: Crate[];
  joined: Crate[];
};
