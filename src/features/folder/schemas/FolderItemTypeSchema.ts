import z from "zod";

export const FolderItemTypeSchema = z.enum(["Folder", "File"]);
