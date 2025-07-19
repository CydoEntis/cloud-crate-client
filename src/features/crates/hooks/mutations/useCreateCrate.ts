import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCrate } from "../../api";

export const useCreateCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
