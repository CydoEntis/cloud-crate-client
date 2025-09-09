import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCrateSelectionStore } from "../store/useCrateSelectionStore";

type SelectAllCratesProps = {
  allIds: string[];
};

const SelectAllCrates = ({ allIds }: SelectAllCratesProps) => {
  const toggleAll = useCrateSelectionStore((s) => s.toggleAll);
  const allSelected = useCrateSelectionStore((s) => allIds.length > 0 && allIds.every((id) => s.selectedIds.has(id)));

  return <Checkbox checked={allSelected} onCheckedChange={toggleAll} onClick={(e) => e.stopPropagation()} />;
};

export default SelectAllCrates;
