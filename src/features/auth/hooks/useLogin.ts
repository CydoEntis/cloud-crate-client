import { useMutation } from "@tanstack/react-query";
import { login } from "../api";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
