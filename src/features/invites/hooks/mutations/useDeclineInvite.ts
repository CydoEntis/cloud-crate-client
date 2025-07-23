import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineInvite } from "../../api/declineInvite";

export const useDeclineInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declineInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
