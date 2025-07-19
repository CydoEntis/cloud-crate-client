import z from "zod";
import { StoredFileSchema } from "./storedFileSchema";

export const StoredFileListSchema = z.array(StoredFileSchema);
