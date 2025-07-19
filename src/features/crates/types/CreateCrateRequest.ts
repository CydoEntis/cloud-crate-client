import type z from "zod";
import type { CreateCrateSchema } from "../schemas/CreateCrateSchema";

export type CreateCrateRequest = z.infer<typeof CreateCrateSchema>;