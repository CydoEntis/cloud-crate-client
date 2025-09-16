import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CrateModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCrateModalStore = create<CrateModalStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: "CrateModalStore" }
  )
);
