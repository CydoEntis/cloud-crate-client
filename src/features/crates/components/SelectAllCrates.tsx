import React from "react";
import { useCrateSelectionStore } from "../store/crate-selection.store";
import { Checkbox } from "@/shared/components/ui/checkbox";

function SelectAllCrates({ allIds }: { allIds: string[] }) {
  const toggleAll = useCrateSelectionStore((s) => s.toggleAll);
  const setAllIds = useCrateSelectionStore((s) => s.setAllIds);

  const allSelected = useCrateSelectionStore((s) => allIds.length > 0 && allIds.every((id) => s.selectedIds.has(id)));

  React.useEffect(() => {
    setAllIds(allIds);
  }, [allIds, setAllIds]);

  return <Checkbox checked={allSelected} onCheckedChange={() => toggleAll()} onClick={(e) => e.stopPropagation()} />;
}

export default SelectAllCrates;
