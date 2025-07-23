import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvite } from "../../api/acceptInvite";

export const useAcceptInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["crates"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
