import type z from "zod";
import type { FolderOrFileItemSchema } from "../schemas/FolderOrFileItemSchema";

export type FolderOrFileItem = z.infer<typeof FolderOrFileItemSchema>;
