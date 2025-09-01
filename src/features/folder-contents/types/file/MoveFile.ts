import type z from "zod";
import type { MoveFileSchema } from "../../schemas/file/MoveFileSchema";

export type MoveFile = z.infer<typeof MoveFileSchema>;
