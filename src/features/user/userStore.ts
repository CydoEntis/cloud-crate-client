import { create } from "zustand";
import type { User } from "./userTypes";

interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
