import { useQuery } from "@tanstack/react-query";
import { getFile } from "../../api/getFile";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";

export const useGetFile = (crateId: string, fileId: string | null) => {
  return useQuery<FolderOrFileItem, Error>({
    queryKey: ["file", crateId, fileId],
    queryFn: () => {
      if (!fileId) throw new Error("No file ID provided");
      return getFile(crateId, fileId);
    },
    enabled: !!fileId,
  });
};
