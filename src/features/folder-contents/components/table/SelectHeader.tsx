import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { Checkbox } from "@radix-ui/react-checkbox";

function SelectHeader() {
  const { fileIds, folderIds, clearSelection } = useSelectionStore();
  return <Checkbox />;
}

export default SelectHeader;
