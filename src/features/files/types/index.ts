import type z from "zod";
import type { UploadFileSchema } from "../schemas/UploadFileSchema";
import type { StoredFileSchema } from "../schemas/StoredFileSchema";

export type UploadFileInput = z.infer<typeof UploadFileSchema>;
export type StoredFile = z.infer<typeof StoredFileSchema>;

export type UploadFileRequest = {
  crateId: string;
  file: File;
  folderId?: string;
  onProgress?: (percent: number) => void;
};

export type FileTypeBreakdown = {
  type: string;
  sizeMb: number;
};

export type FileItem = {
  name: string;
  size: string;
  extension: string;
  icon: React.ReactNode;
};

export type RecentFilesProps = {
  files: FileItem[];
};

export type MoveFileRequest = {
  newParentId: string | null;
};