import { create } from "zustand";

type CrateModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCrateModalStore = create<CrateModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
