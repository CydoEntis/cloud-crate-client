import type z from "zod";
import type { UpdateCrateSchema } from "../schemas/UpdateCrateSchema";

export type UpdateCrateRequest = z.infer<typeof UpdateCrateSchema>;
