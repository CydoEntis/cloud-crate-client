import type { CreateFolderSchema } from "@/features/folder-contents/schemas/folder/CreateFolderSchema";
import type z from "zod";

export type CreateFolder = z.infer<typeof CreateFolderSchema>;
