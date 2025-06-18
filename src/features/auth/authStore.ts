import { create } from "zustand";

interface AuthState {
  userId: string | null;
  accessToken: string | null;
  setAuth: (token: string, userId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  accessToken: null,
  setAuth: (token: string, userId: string) => {
    set({ accessToken: token, userId });
  },
  clearAuth: () => {
    set({ accessToken: null, userId: null });
  },
}));
