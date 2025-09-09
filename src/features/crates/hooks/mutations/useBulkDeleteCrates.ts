import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteCrates } from "../../api/bulkDeleteCrate";

export const useBulkDeleteCrates = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteCrates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] }); // only invalidate the crates list
    },
  });
};
