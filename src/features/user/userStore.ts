import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "./userTypes";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => {
        console.log("👤 User data set in memory (not persisted)");
        set({ user });
      },
      clearUser: () => {
        console.log("👤 User data cleared from memory");
        set({ user: null });
      },
    }),
    { name: "UserStore" }
  )
);
