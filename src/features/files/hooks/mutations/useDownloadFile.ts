import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "../../api/downloadFile";

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: ({ crateId, fileId }: { crateId: string; fileId: string }) => downloadFile(crateId, fileId),
  });
};
