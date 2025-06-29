import type z from "zod";
import type { uploadFileSchema } from "./schemas";

export type UploadFileInput = z.infer<typeof uploadFileSchema>;
