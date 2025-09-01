import type z from "zod";
import type { crateFileSchema } from "../../schemas/file/CrateFileSchema";

export type CrateFile = z.infer<typeof crateFileSchema>;
