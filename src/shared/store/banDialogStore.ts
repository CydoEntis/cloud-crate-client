import { create } from "zustand";

type BanDialogState = {
  isOpen: boolean;
  message: string;
  showBanDialog: (message: string) => void;
  hideBanDialog: () => void;
};

export const useBanDialogStore = create<BanDialogState>((set) => ({
  isOpen: false,
  message: "",
  showBanDialog: (message: string) => set({ isOpen: true, message }),
  hideBanDialog: () => set({ isOpen: false, message: "" }),
}));
