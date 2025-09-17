import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { Checkbox } from "@radix-ui/react-checkbox";

function SelectHeader() {
  const { fileIds, folderIds, clearSelection } = useSelectionStore();
  return <Checkbox /* you can add checked state here if needed */ />;
}

export default SelectHeader;
