import type z from "zod";
import type { uploadFileSchema } from "./schemas";

export type UploadFileRequest = z.infer<typeof uploadFileSchema>;
