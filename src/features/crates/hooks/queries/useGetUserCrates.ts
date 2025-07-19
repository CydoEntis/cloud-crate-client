import { useQuery } from "@tanstack/react-query";
import { getUserCrates } from "../../api";
import type { Crate } from "../../types/crate";

export const useGetUserCrates = () =>
  useQuery<Crate[]>({
    queryKey: ["crates"],
    queryFn: getUserCrates,
  });
