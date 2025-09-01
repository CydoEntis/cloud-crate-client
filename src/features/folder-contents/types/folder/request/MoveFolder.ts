import type { MoveFolderSchema } from "@/features/folder-contents/schemas/folder/MoveFolderSchema";
import type z from "zod";

export type MoveFolder = z.infer<typeof MoveFolderSchema>;
