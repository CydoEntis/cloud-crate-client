import z from "zod";
import { FolderSchema } from "./FolderSchema";

export const FolderListSchema = z.array(FolderSchema);
