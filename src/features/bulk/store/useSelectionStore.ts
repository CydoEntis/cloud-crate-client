// src/features/folder/store/useSelectionStore.ts
import { create } from "zustand";

interface SelectionState {
  fileIds: Set<string>;
  folderIds: Set<string>;

  toggleFile: (id: string) => void;
  toggleFolder: (id: string) => void;
  clearSelection: () => void;

  isFileSelected: (id: string) => boolean;
  isFolderSelected: (id: string) => boolean;

  getFinalMoveSelection: () => {
    fileIds: string[];
    folderIds: string[];
  };
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  fileIds: new Set(),
  folderIds: new Set(),

  toggleFile: (id) =>
    set((state) => {
      const updated = new Set(state.fileIds);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return { fileIds: updated };
    }),

  toggleFolder: (id) =>
    set((state) => {
      const updated = new Set(state.folderIds);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return { folderIds: updated };
    }),

  clearSelection: () => set({ fileIds: new Set(), folderIds: new Set() }),

  isFileSelected: (id) => get().fileIds.has(id),
  isFolderSelected: (id) => get().folderIds.has(id),

  getFinalMoveSelection: () => {
    const { fileIds, folderIds } = get();
    return {
      fileIds: Array.from(fileIds),
      folderIds: Array.from(folderIds),
    };
  },
}));
