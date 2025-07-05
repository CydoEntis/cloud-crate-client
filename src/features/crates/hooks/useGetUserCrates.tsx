import { useQuery } from "@tanstack/react-query";
import type { Crate } from "../types";
import { getUserCrates } from "../api";

export const useGetUserCrates = () =>
  useQuery<Crate[]>({
    queryKey: ["crates"],
    queryFn: getUserCrates,
  });
