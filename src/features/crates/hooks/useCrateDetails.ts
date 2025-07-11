import { useQuery } from "@tanstack/react-query";
import { getCrateDetails } from "../api";

export const useCrateDetails = (crateId: string) => {
  return useQuery({
    queryKey: ["crate-details", crateId],
    queryFn: () => getCrateDetails(crateId),
    staleTime: 1000 * 60 * 5,
    enabled: !!crateId,
  });
};
