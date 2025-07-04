import { useQuery } from "@tanstack/react-query";
import { getCrateUsage } from "./api";

export const useCrateUsage = (crateId: string) => {
  return useQuery({
    queryKey: ["crate-usage", crateId],
    queryFn: () => getCrateUsage(crateId),
    staleTime: 1000 * 60 * 5,
    enabled: !!crateId,
  });
};
