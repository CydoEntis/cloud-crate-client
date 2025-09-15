import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import type { Row } from "@tanstack/react-table";
import type { FolderContentRowItem } from "@/features/folder-contents/types/FolderContentRowItem";
import { Checkbox } from "@/shared/components/ui/checkbox";

function SelectCell({ row }: { row: Row<FolderContentRowItem> }) {
  const { toggleFile, toggleFolder, isFileSelected, isFolderSelected } = useSelectionStore();
  const item = row.original;

  const isSelected = item.isFolder ? isFolderSelected(item.id) : isFileSelected(item.id);

  const handleChange = () => {
    if (item.isFolder) toggleFolder(item.id);
    else toggleFile(item.id);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
      <Checkbox className="border-muted-foreground" checked={isSelected} onCheckedChange={handleChange} />
    </div>
  );
}

export default SelectCell;
