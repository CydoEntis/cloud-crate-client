import type { AuthUser } from "@/features/auth/authTypes";
import { create } from "zustand";
import type { User } from "./userTypes";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  setAuthUser: (authUser: AuthUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  setAuthUser: (authUser) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            id: authUser.id,
            email: authUser.email,
            displayName: authUser.displayName,
            profilePictureUrl: authUser.profilePictureUrl || state.user.profilePictureUrl,
          }
        : {
            id: authUser.id,
            email: authUser.email,
            displayName: authUser.displayName,
            profilePictureUrl: authUser.profilePictureUrl || "",

            accountStorageLimitBytes: 0,
            allocatedStorageBytes: 0,
            remainingAllocationBytes: 0,
            remainingUsageBytes: 0,
            usedStorageBytes: 0,

            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
    })),

  clearUser: () => set({ user: null }),
}));
