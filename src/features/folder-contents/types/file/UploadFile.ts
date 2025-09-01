import type z from "zod";
import type { UploadFileSchema } from "../../schemas/file/UploadFileSchema";

export type UploadFile = z.infer<typeof UploadFileSchema>;
