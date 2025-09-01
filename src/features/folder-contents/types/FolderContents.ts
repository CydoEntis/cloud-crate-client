import type z from "zod";
import type { folderContentsSchema } from "../schemas/FolderContentsSchema";

export type FolderContents = z.infer<typeof folderContentsSchema>;