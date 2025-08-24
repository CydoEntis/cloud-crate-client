import { Checkbox } from "@/components/ui/checkbox";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { FolderItemType } from "@/features/folder/types/FolderItemType";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";
import type { Row } from "@tanstack/react-table";

function SelectCell({ row }: { row: Row<FolderOrFileItem> }) {
  const { toggleFile, toggleFolder, isFileSelected, isFolderSelected } = useSelectionStore();
  const item = row.original;

  if (item.isBackRow) return null;

  const isSelected = item.type === FolderItemType.Folder ? isFolderSelected(item.id) : isFileSelected(item.id);

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={() => (item.type === FolderItemType.Folder ? toggleFolder(item.id) : toggleFile(item.id))}
    />
  );
};

export default SelectCell;