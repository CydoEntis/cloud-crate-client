import type z from "zod";
import type { MoveFolderRequestSchema } from "../../schemas/MoveFolderSchema";

export type MoveFolderRequest = z.infer<typeof MoveFolderRequestSchema>;
