import FileIndicator from "@/components/FileIndicator";
import { FolderItemType, type FolderOrFileItem } from "@/features/folder/types";

type NameCellProps = {
  row: FolderOrFileItem & { isBackRow?: boolean };
  onBackClick?: (parentId: string | null) => void;
  onFolderClick?: (folderId: string) => void;
  onDropToParent?: (itemIds: string[]) => void;
};

function NameCell({ row, onBackClick, onFolderClick, onDropToParent }: NameCellProps) {
  const isBackRow = row.isBackRow === true;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBackRow) {
      onBackClick?.(row.parentFolderId ?? null);
    } else if (row.type === FolderItemType.Folder) {
      onFolderClick?.(row.id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isBackRow) return;
    try {
      const ids = JSON.parse(e.dataTransfer.getData("application/json")) as string[];
      onDropToParent?.(ids);
    } catch {}
  };

  return (
    <div
      className={`flex gap-2 items-center w-full px-2 py-1 rounded cursor-pointer ${
        isBackRow ? "text-muted-foreground italic hover:bg-muted" : "hover:bg-accent"
      }`}
      onClick={handleClick}
      onDragOver={(e) => isBackRow && e.preventDefault()}
      onDrop={handleDrop}
    >
      <FileIndicator
        filename={row.name}
        isFolder={row.type === FolderItemType.Folder}
        folderColor={row.color ?? "#9CA3AF"}
      />
      <h4 className="font-bold">{row.name}</h4>
    </div>
  );
}

export default NameCell;
