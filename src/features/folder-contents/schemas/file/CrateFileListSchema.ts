import z from "zod";
import { crateFileSchema } from "./CrateFileSchema";

export const CrateFileListSchema = z.array(crateFileSchema);
