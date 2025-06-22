import type z from "zod";
import type { createCrateSchema } from "./schemas";

export type CreateCrateRequest = z.infer<typeof createCrateSchema>;

export type Crate = {
  id: string;
  name: string;
  color: string;
};
