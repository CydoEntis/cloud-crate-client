import { useQuery } from "@tanstack/react-query";
import { getAvailableMoveTargets } from "../../api/folder/getAvailableMoveTargets";

export const useAvailableMoveTargets = (crateId: string, folderId?: string | null) => {
  return useQuery({
    queryKey: ["availableMoveTargets", crateId, folderId],
    queryFn: () => getAvailableMoveTargets(crateId, folderId ?? undefined),
    enabled: !!crateId,
  });
};
