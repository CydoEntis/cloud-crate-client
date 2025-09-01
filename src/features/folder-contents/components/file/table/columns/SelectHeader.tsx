import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { FolderItemType } from "@/features/folder-contents/types/folder/FolderItemType";
import type { FolderOrFileItem } from "@/features/folder-contents/types/folder/FolderOrFileItem";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { Row } from "@tanstack/react-table";

function SelectHeader() {
  const { fileIds, folderIds, clearSelection } = useSelectionStore();
  return <Checkbox /* you can add checked state here if needed */ />;
}

export default SelectHeader;
