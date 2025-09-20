import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { inviteService } from "./inviteService";
import type { CrateInvite, CrateInviteRequest } from "../inviteTypes";

export const inviteKeys = {
  all: ["invites"] as const,
  byToken: (token: string) => [...inviteKeys.all, "token", token] as const,
};

export const useGetInviteByToken = (token: string) => {
  return useQuery<CrateInvite, Error>({
    queryKey: inviteKeys.byToken(token),
    queryFn: () => inviteService.getInviteByToken(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useInviteToCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CrateInviteRequest) => inviteService.inviteUserToCrate(request),
    onSuccess: (_, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: ["members", "crate", crateId] });
      queryClient.invalidateQueries({ queryKey: ["crate-members"] });
      toast.success("User invited successfully");
    },
    onError: (error: Error) => {
      console.error("Invite failed:", error);
      toast.error(error.message || "Failed to send invite");
    },
  });
};

export const useAcceptInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => inviteService.acceptInvite(token),
    onSuccess: (_, token) => {
      queryClient.removeQueries({ queryKey: inviteKeys.byToken(token) });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      toast.success("Invite accepted successfully");
    },
    onError: (error: any) => {
      console.error("Failed to accept invite:", error);
      const errorMessage = error?.response?.data?.message || error.message || "Failed to accept invite";
      toast.error(errorMessage);
    },
  });
};

export const useDeclineInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => inviteService.declineInvite(token),
    onSuccess: (_, token) => {
      queryClient.removeQueries({ queryKey: inviteKeys.byToken(token) });
      toast.success("Invite declined");
    },
    onError: (error: Error) => {
      console.error("Failed to decline invite:", error);
      toast.error(error.message || "Failed to decline invite");
    },
  });
};
