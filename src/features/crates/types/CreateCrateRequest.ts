import z from "zod";
import { createCreateCrateSchema } from "../schemas/CreateCrateSchema";

const baseSchema = createCreateCrateSchema({
  usedStorageBytes: 0,
  accountStorageLimitBytes: 100 * 1024 * 1024 * 1024 
});

export type CreateCrateRequest = z.infer<typeof baseSchema>;