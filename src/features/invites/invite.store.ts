import { create } from "zustand";
import { devtools } from "zustand/middleware";

type InviteState = {
  token: string | null;
  isProcessing: boolean;
};

type InviteActions = {
  setToken: (token: string) => void;
  clearToken: () => void;
  setProcessing: (processing: boolean) => void;
};

type InviteStore = InviteState & InviteActions;

export const useInviteStore = create<InviteStore>()(
  devtools(
    (set) => ({
      token: null,
      isProcessing: false,

      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null, isProcessing: false }),
      setProcessing: (processing) => set({ isProcessing: processing }),
    }),
    { name: "InviteStore" }
  )
);

export const useInviteToken = () => useInviteStore((state) => state.token);
export const useIsProcessingInvite = () => useInviteStore((state) => state.isProcessing);
