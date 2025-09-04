export type MultiUploadFile = {
  crateId: string;
  folderId?: string;
  files: File[];
  onProgress?: (percent: number) => void;
};
