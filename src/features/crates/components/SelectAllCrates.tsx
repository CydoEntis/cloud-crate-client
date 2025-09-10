import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCrateSelectionStore } from "../store/useCrateSelectionStore";

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
