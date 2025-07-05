import { useQuery } from "@tanstack/react-query";
import { getSubfolders } from "../api/getSubfolders";
import type { Folder } from "../types";

export const useSubfolders = (crateId: string, parentId: string | null) =>
  useQuery<Folder[]>({
    queryKey: ["folders", crateId, "subfolders", parentId],
    queryFn: () => (crateId && parentId ? getSubfolders(crateId, parentId) : Promise.resolve([])),
    enabled: !!crateId && !!parentId,
  });
