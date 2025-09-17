import * as z from "zod";
import { CrateRole } from "../crates/crateTypes";

export const crateInviteFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.nativeEnum(CrateRole),
  expiresAt: z.number(),
});
