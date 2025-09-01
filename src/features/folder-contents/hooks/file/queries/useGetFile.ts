import { getFile } from "@/features/folder-contents/api/file/getFile";
import type { CrateFile } from "@/features/folder-contents/types/file/CrateFile";
import { useQuery } from "@tanstack/react-query";


export const useGetFile = (crateId: string, fileId: string | null) => {
  return useQuery<CrateFile, Error>({
    queryKey: ["file", crateId, fileId],
    queryFn: () => {
      if (!fileId) throw new Error("No file ID provided");
      return getFile(crateId, fileId);
    },
    enabled: !!fileId,
  });
};
