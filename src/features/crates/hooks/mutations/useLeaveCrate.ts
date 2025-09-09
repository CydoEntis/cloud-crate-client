import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveCrate } from "../../api/leaveCrate";
import { toast } from "sonner";

export const useLeaveCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Successfully left crate");
    },
    onError: (error) => {
      console.error("Failed to leave crate", error);
      toast.error("Failed to leave crate. Please try again.");
    },
  });
};
