import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FolderModalState {
  isOpen: boolean;
  crateId: string | null;
  parentFolderId: string | null;
}

interface FolderModalActions {
  open: (crateId: string, parentFolderId?: string | null) => void;
  close: () => void;
}

type FolderModalStore = FolderModalState & FolderModalActions;

export const useFolderModalStore = create<FolderModalStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      crateId: null,
      parentFolderId: null,

      open: (crateId, parentFolderId = null) =>
        set({
          isOpen: true,
          crateId,
          parentFolderId,
        }),

      close: () =>
        set({
          isOpen: false,
          crateId: null,
          parentFolderId: null,
        }),
    }),
    { name: "FolderModalStore" }
  )
);

export const useFolderModalData = () =>
  useFolderModalStore((state) => ({
    crateId: state.crateId,
    parentFolderId: state.parentFolderId,
  }));
