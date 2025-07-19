import type z from "zod";
import type { UploadFileSchema } from "../../schemas/uploadFileSchema";

export type UploadFileRequest = z.infer<typeof UploadFileSchema>;
