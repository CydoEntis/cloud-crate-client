import type z from "zod";
import type { CreateFolderRequestSchema } from "../../schemas/CreateFolderRequestSchema";

export type CreateFolderRequest = z.infer<typeof CreateFolderRequestSchema>;
