import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Crate } from "../types/Crate";
import { useCrateSelectionStore } from "../store/useCrateSelectionStore";

type CrateSelectCellProps = {
  crate: Crate;
};

const CrateSelectCell = React.memo(({ crate }: CrateSelectCellProps) => {
  const isSelected = useCrateSelectionStore((state) => state.selectedIds.has(crate.id));
  const toggle = useCrateSelectionStore((state) => state.toggle);

  return (
    <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
      <Checkbox checked={isSelected} onCheckedChange={() => toggle(crate.id)} />
    </div>
  );
});

export default CrateSelectCell;
