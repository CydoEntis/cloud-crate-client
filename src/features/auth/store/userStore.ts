import { create } from "zustand";
import type { UserResponse } from "@/features/auth/types";
import type { UserProfileResponse } from "@/features/user/types/UserProfileResponse";

interface UserStore {
  user: UserProfileResponse | null;
  setUser: (user: UserProfileResponse) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
