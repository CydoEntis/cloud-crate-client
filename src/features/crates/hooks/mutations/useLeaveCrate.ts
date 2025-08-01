import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveCrate } from "../../api/leaveCrate";

export const useLeaveCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Failed to leave crate", error);
    },
  });
};
