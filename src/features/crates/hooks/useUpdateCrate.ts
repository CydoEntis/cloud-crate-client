import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCrate } from "../api/updateCrate";

export const useUpdateCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCrate,
    onSuccess: (updatedCrate) => {
      queryClient.invalidateQueries({ queryKey: ["crateDetails", updatedCrate.id] });
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Failed to update crate", error);
    },
  });
};
