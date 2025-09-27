import type { z } from "zod";
import type { crateFileSchema, moveFileSchema, uploadFileSchema } from "../file/fileSchema";

export type CrateFile = z.infer<typeof crateFileSchema>;
export type MoveFile = z.infer<typeof moveFileSchema>;
export type UploadFile = z.infer<typeof uploadFileSchema>;

export type SingleUploadFile = {
  crateId: string;
  folderId?: string;
  file: File;
  onProgress?: (percent: number) => void;
};

export type MultiUploadFile = {
  crateId: string;
  folderId?: string;
  files: File[];
  onProgress?: (percent: number) => void;
};

export type FileItem = {
  name: string;
  size: string;
  extension: string;
  icon: React.ReactNode;
};

export type FileTypeBreakdown = {
  type: string;
  sizeMb: number;
};

export type UpdateFileRequest = {
  fileId: string;
  newName?: string;
};
