import { useQuery } from "@tanstack/react-query";
import { getUserCrates } from "../../api";
import type { Crate } from "../../types/Crate";

export const useGetUserCrates = () =>
  useQuery<Crate[]>({
    queryKey: ["crates"],
    queryFn: getUserCrates,
  });
