import { downloadFile } from "@/features/folder-contents/api/file/downloadFile";
import { useMutation } from "@tanstack/react-query";

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: ({ crateId, fileId }: { crateId: string; fileId: string }) => downloadFile(crateId, fileId),
  });
};
