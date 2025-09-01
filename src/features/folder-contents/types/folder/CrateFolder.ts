import type z from "zod";
import type { crateFolderSchema } from "../../schemas/folder/CrateFolderSchema";

export type CrateFolder = z.infer<typeof crateFolderSchema>;