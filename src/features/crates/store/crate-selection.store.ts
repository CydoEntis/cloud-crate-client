import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CrateSelectionState = {
  selectedIds: Set<string>;
  allIds: Set<string>;
};

type CrateSelectionActions = {
  setAllIds: (ids: string[]) => void;
  toggle: (id: string) => void;
  toggleAll: () => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isAllSelected: () => boolean;
  getSelectedCount: () => number;
};

export const useCrateSelectionStore = create<CrateSelectionState & CrateSelectionActions>()(
  devtools(
    (set, get) => ({
      selectedIds: new Set(),
      allIds: new Set(),

      setAllIds: (ids: string[]) => {
        set({
          allIds: new Set(ids),
          selectedIds: new Set(),
        });
      },

      toggle: (id: string) => {
        const state = get();
        const newSelected = new Set(state.selectedIds);

        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }

        set({ selectedIds: newSelected });
      },

      toggleAll: () => {
        const state = get();
        const allSelected =
          state.selectedIds.size === state.allIds.size &&
          state.allIds.size > 0 &&
          [...state.allIds].every((id) => state.selectedIds.has(id));

        set({
          selectedIds: allSelected ? new Set() : new Set(state.allIds),
        });
      },

      clear: () => set({ selectedIds: new Set() }),

      isSelected: (id: string) => get().selectedIds.has(id),
      isAllSelected: () => {
        const state = get();
        return state.allIds.size > 0 && state.selectedIds.size === state.allIds.size;
      },
      getSelectedCount: () => get().selectedIds.size,
    }),
    { name: "CrateSelectionStore" }
  )
);
