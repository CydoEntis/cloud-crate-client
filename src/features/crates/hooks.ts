import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCrate, getUserCrates } from "./api";
import type { Crate } from "./types";

export const useCreateCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crates"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetUserCrates = () =>
  useQuery<Crate[]>({
    queryKey: ["crates"],
    queryFn: getUserCrates,
  });
