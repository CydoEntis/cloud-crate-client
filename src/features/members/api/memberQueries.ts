import { useQuery } from "@tanstack/react-query";
import { memberService } from "./memberServices";
import type { Member, MemberQueryParameters } from "../memberTypes";
import type { PaginatedResult } from "@/shared/lib/sharedTypes";

export const crateKeys = {
  all: ["crates"] as const,
  members: (crateId: string) => [...crateKeys.all, "members", crateId] as const,
  memberList: (crateId: string, params?: MemberQueryParameters) => [...crateKeys.members(crateId), params] as const,
};

export const useGetMembers = (crateId: string, params?: MemberQueryParameters) => {
  return useQuery<PaginatedResult<Member>, Error>({
    queryKey: crateKeys.memberList(crateId, params),
    queryFn: () => memberService.getMembers(crateId, params),
    enabled: !!crateId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMemberPreview = (crateId: string) => {
  return useGetMembers(crateId, {
    limit: 5,
    sortBy: "JoinedAt",
    ascending: false,
  });
};

export const useRecentMembers = (crateId: string) => {
  return useGetMembers(crateId, {
    recentOnly: true,
    limit: 10,
  });
};

export const usePaginatedMembers = (crateId: string, page: number = 1, pageSize: number = 20) => {
  const result = useGetMembers(crateId, {
    page,
    pageSize,
  });

  return result;
};
