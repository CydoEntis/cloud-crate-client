import { create } from "zustand";

type InviteStore = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useInviteStore = create<InviteStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
