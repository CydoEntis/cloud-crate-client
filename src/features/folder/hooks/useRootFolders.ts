import { useQuery } from "@tanstack/react-query";
import { getRootFolders } from "../api/getRootFolders";
import type { Folder } from "../types";

export const useRootFolders = (crateId: string) =>
  useQuery<Folder[]>({
    queryKey: ["folders", crateId, "root"],
    queryFn: () => getRootFolders(crateId),
    enabled: !!crateId,
  });
