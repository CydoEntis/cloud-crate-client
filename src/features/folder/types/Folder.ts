import type z from "zod";
import type { FolderSchema } from "../schemas/FolderSchema";

export type Folder = z.infer<typeof FolderSchema>;
