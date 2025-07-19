import type z from "zod";
import type { FolderContentsResponseSchema } from "../../schemas/FolderContentsResponseSchema";

export type FolderContentsResponse = z.infer<typeof FolderContentsResponseSchema>;
