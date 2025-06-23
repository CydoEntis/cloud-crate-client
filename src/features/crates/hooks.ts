import { useMutation, useQuery } from "@tanstack/react-query";
import { createCrate, getUserCrates } from "./api";
import api from "@/lib/api";
import type { ApiResponse } from "../auth/types";
import type { Crate } from "./types";

export const useCreateCrate = () =>
  useMutation({
    mutationFn: createCrate,
    onSuccess: (data) => {
      console.log(data)
      //Todo: Show toast
      // Todo: Refresh cache for crate list.
    },
    onError: (error) => {
      console.log(error);
    }
  });

export const useGetUserCrates = () =>
  useQuery<Crate[]>({
    queryKey: ["crates"],
    queryFn: getUserCrates,
  });
