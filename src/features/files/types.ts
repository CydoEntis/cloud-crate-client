import type z from "zod";
import type { StoredFileSchema, uploadFileSchema } from "./schemas";

export type UploadFileInput = z.infer<typeof uploadFileSchema>;
export type StoredFile = z.infer<typeof StoredFileSchema>;

export type FileTypeBreakdown = {
  type: string;
  sizeMb: number;
};
