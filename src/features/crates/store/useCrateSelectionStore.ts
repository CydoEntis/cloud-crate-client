import { create } from "zustand";

type CrateSelectionState = {
  selectedIds: Set<string>;
  allIds: Set<string>;
  setAllIds: (ids: string[]) => void;
  toggle: (id: string) => void;
  toggleAll: () => void;
  clear: () => void;
};

export const useCrateSelectionStore = create<CrateSelectionState>((set, get) => ({
  selectedIds: new Set(),
  allIds: new Set(),

  setAllIds: (ids: string[]) => set({ allIds: new Set(ids) }),

  toggle: (id) =>
    set((state) => {
      const selectedIds = new Set(state.selectedIds);
      if (selectedIds.has(id)) selectedIds.delete(id);
      else selectedIds.add(id);
      return { selectedIds };
    }),

  toggleAll: () =>
    set((state) => {
      const allSelected = state.selectedIds.size === state.allIds.size;
      return { selectedIds: allSelected ? new Set() : new Set(state.allIds) };
    }),

  clear: () => set({ selectedIds: new Set() }),
}));
