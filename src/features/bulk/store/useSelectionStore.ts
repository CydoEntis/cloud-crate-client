import { create } from "zustand";

interface FolderContentRowItem {
  id: string;
  isFolder: boolean;
}

interface SelectionState {
  fileIds: Set<string>;
  folderIds: Set<string>;

  toggleFile: (id: string) => void;
  toggleFolder: (id: string) => void;
  clearSelection: () => void;

  selectAll: (items: FolderContentRowItem[]) => void;
  deselectAll: () => void;

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

  selectAll: (items: FolderContentRowItem[]) =>
    set(() => {
      const fileIds = new Set(items.filter((i) => !i.isFolder).map((i) => i.id));
      const folderIds = new Set(items.filter((i) => i.isFolder).map((i) => i.id));
      return { fileIds, folderIds };
    }),

  deselectAll: () => set({ fileIds: new Set(), folderIds: new Set() }),

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
