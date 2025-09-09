import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkLeaveCrates } from "../../api/bulkLeaveCrate";

export const useBulkLeaveCrates = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkLeaveCrates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
    },
  });
};
