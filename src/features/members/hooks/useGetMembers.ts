import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/getMembers";

export const useGetMembers = (crateId: string) => {
  return useQuery({
    queryKey: ["members", crateId],
    queryFn: () => getMembers(crateId),
    staleTime: 1000 * 60 * 5,
    enabled: !!crateId,
  });
};
