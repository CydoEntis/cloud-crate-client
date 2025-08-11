import { useQuery } from "@tanstack/react-query";
import type { StoredFile } from "../../types";
import { getFile } from "../../api/getFile";

export const useGetFile = (crateId: string, fileId: string | null) => {
  return useQuery<StoredFile, Error>({
    queryKey: ["file", crateId, fileId],
    queryFn: () => {
      if (!fileId) throw new Error("No file ID provided");
      return getFile(crateId, fileId);
    },
    enabled: !!fileId,
  });
};
