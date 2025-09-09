import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCrate } from "../../api/deleteCrate";
import { toast } from "sonner";

export const useDeleteCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Crate deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete crate", error);
      toast.error("Failed to delete crate. Please try again.");
    },
  });
};
