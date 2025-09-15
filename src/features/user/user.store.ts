import type { User } from "@/features/user/types/User";
import type { AuthUser } from "@/features/auth/auth.types";
import { create } from "zustand";

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
            // Keep existing user data, update with auth data
            ...state.user,
            id: authUser.id,
            email: authUser.email,
            displayName: authUser.displayName,
            profilePictureUrl: authUser.profilePictureUrl || state.user.profilePictureUrl,
          }
        : {
            // Create complete User object with all required fields
            id: authUser.id,
            email: authUser.email,
            displayName: authUser.displayName,
            profilePictureUrl: authUser.profilePictureUrl || "",

            // Storage-related fields with defaults (will be updated by /me endpoint)
            accountStorageLimitBytes: 0,
            allocatedStorageBytes: 0,
            remainingAllocationBytes: 0,
            remainingUsageBytes: 0,
            usedStorageBytes: 0,

            // Timestamps with defaults
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
    })),

  clearUser: () => set({ user: null }),
}));
