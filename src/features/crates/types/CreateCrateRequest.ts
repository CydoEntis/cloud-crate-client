import type z from "zod";
import type { StorageDetails, createCreateCrateSchema } from "../schemas/CreateCrateSchema";

export type CreateCrateRequest<T extends StorageDetails> = z.infer<ReturnType<typeof createCreateCrateSchema>>;
