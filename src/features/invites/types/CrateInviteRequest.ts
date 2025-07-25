import type z from "zod";
import type { crateInviteFormSchema } from "../schemas/crateInviteFormSchema";

export type CrateInviteFormValues = z.infer<typeof crateInviteFormSchema>;
