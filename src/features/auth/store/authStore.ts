import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  setAuth: (token: string) => {
    console.log("TOKEN: ", token)
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  clearAuth: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
  isAuthenticated: () => !!get().accessToken,
}));
