import { create } from "zustand";

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true, 
  setUser: (user) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
