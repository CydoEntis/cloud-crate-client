import { create } from "zustand";

interface AuthState {
  userId: string | null;
  accessToken: string | null;
  setAuth: (token: string, userId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  return {
    accessToken: token,
    userId: userId,
    setAuth: (token: string, userId: string) => {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", userId);
      set({ accessToken: token, userId });
    },
    clearAuth: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      set({ accessToken: null, userId: null });
    },
  };
});
