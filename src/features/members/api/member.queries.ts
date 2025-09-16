import { useQuery } from "@tanstack/react-query";
import { memberService } from "./member.service";
import type { Member } from "../member.types";

export const crateKeys = {
  all: ["crates"] as const,
  members: (crateId: string) => [...crateKeys.all, "members", crateId] as const,
};

export const useGetMembers = (crateId: string) => {
  return useQuery<Member[], Error>({
    queryKey: crateKeys.members(crateId),
    queryFn: () => memberService.getMembers(crateId),
    enabled: !!crateId,
    staleTime: 1000 * 60 * 5,
  });
};
