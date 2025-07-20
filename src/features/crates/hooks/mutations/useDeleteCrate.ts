import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCrate } from "../../api/deleteCrate";

export const useDeleteCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Failed to delete crate", error);
    },
  });
};
