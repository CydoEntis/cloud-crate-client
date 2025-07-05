import { useMutation } from "@tanstack/react-query";
import { register } from "../api";

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Redurect User possible or potentially call login here
    },
  });
