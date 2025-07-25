import * as z from "zod";
import { CrateRole } from "../types/CrateRole";

export const crateInviteFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.nativeEnum(CrateRole),
  expiresAt: z.number(), // Minutes
});
