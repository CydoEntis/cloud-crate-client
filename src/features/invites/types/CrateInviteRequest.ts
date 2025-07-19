import type z from "zod";
import type { CrateInviteRequestSchema } from "../schemas/CrateInviteRequestSchema";

export type CrateInviteRequest = z.infer<typeof CrateInviteRequestSchema>;
