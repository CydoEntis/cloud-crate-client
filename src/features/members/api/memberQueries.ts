import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memberService } from "./memberServices";
import type { Member, MemberQueryParameters } from "../memberTypes";
import type { PaginatedResult } from "@/shared/lib/sharedTypes";
import type { CrateRole } from "@/features/crates/crateTypes";
import { toast } from "sonner";
import { SHARED_KEYS } from "../../shared/queryKeys";
import { crateKeys } from "@/features/crates/api/crateQueries";

export const memberKeys = {
  all: ["members"] as const,
  crate: (crateId: string) => [...memberKeys.all, "crate", crateId] as const,
  list: (crateId: string, params?: MemberQueryParameters) => [...memberKeys.crate(crateId), "list", params] as const,
};

export const useGetMembers = (crateId: string, params?: MemberQueryParameters) => {
  return useQuery<PaginatedResult<Member>, Error>({
    queryKey: memberKeys.list(crateId, params),
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

export const usePaginatedMembers = (crateId: string, page: number = 1, pageSize: number = 1) => {
  const result = useGetMembers(crateId, {
    page,
    pageSize,
  });

  return result;
};

export const useAssignRole = (crateId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: CrateRole }) =>
      memberService.assignRole(crateId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberKeys.crate(crateId),
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateMembers(crateId) });
      toast.success("Role updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to assign role:", error);
      toast.error(error.message || "Failed to update role");
    },
  });
};

export const useRemoveMember = (crateId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => memberService.removeMember(crateId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberKeys.crate(crateId),
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateMembers(crateId) });
      toast.success("Member removed successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to remove member:", error);
      toast.error(error.message || "Failed to remove member");
    },
  });
};

export const useLeaveCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: { crateId: string; userId: string }) =>
      memberService.removeMember(args.crateId, args.userId),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.crate(crateId) });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateMembers(crateId) });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      toast.success("Left crate successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to leave crate:", error);
      toast.error(error.message || "Failed to leave crate");
    },
  });
};
