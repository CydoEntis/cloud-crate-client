import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CrateModalStore = {
  isOpen: boolean;
  crateId: string | null;
  open: (crateId?: string) => void;
  close: () => void;
};

export const useCrateModalStore = create<CrateModalStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      crateId: null,
      open: (crateId?: string) => set({ isOpen: true, crateId: crateId || null }),
      close: () => set({ isOpen: false, crateId: null }),
    }),
    { name: "CrateModalStore" }
  )
);
