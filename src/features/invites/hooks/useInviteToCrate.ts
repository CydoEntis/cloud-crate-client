import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteUserToCrate } from "../api/inviteUserToCrate";

export const useInviteToCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteUserToCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crate-members"] });
    },
    onError: (error) => {
      console.error("Invite failed:", error);
    },
  });
};
