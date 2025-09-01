import type z from "zod";
import type { CrateFile } from "./CrateFile";
import type { UploadFileSchema } from "../../schemas/file/UploadFileSchema";


export type UploadFileInput = z.infer<typeof UploadFileSchema>;

export type UploadFileRequest = {
  crateId: string;
  file: CrateFile;
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