import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const token = localStorage.getItem("accessToken");

  return {
    accessToken: token,
    setAuth: (token: string) => {
      localStorage.setItem("accessToken", token);
      set({ accessToken: token });
    },
    clearAuth: () => {
      localStorage.removeItem("accessToken");
      set({ accessToken: null });
    },
    isAuthenticated: () => !!get().accessToken,
  };
});
