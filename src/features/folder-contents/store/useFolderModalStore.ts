import { create } from "zustand";

type FolderModalState = {
  isOpen: boolean;
  crateId: string | null;
  open: (crateId: string) => void;
  close: () => void;
};

export const useFolderModalStore = create<FolderModalState>((set) => ({
  isOpen: false,
  crateId: null,
  open: (crateId) => set({ isOpen: true, crateId }),
  close: () => set({ isOpen: false, crateId: null }),
}));
