import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { useAuthStore } from "../store";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
