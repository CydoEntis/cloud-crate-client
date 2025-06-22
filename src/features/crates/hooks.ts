import { useMutation, useQuery } from "@tanstack/react-query";
import { createCrate } from "./api";
import api from "@/lib/api";
import type { ApiResponse } from "../auth/types";
import type { Crate } from "./types";

export const useCreateCrate = () =>
  useMutation({
    mutationFn: createCrate,
    onSuccess: () => {
      //Todo: Show toast
      // Todo: Refresh cache for crate list.
    },
  });


