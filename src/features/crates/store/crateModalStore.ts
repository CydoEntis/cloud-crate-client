import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CrateModalStore = {
  isOpen: boolean;
  open: (crateId?: string) => void;
  crateId: string | null;
  close: () => void;
};

export const useCrateModalStore = create<CrateModalStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      open: (crateId?: string) => set({ isOpen: true, crateId }),
      close: () => set({ isOpen: false }),
    }),
    { name: "CrateModalStore" }
  )
);
