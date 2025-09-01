import FileIndicator from "@/components/FileIndicator";
import type { FolderContentRowItem } from "@/features/folder-contents/types/FolderContentRowItem";

type NameCellProps = {
  row: FolderContentRowItem;
};

function NameCell({ row }: NameCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <FileIndicator
        filename={row.name}
        isFolder={row.isFolder}
        folderColor={row.isFolder && "color" in row ? row.color : "#9CA3AF"}
      />
      <h3 className="font-semibold truncate max-w-[120px] sm:max-w-none">{row.name}</h3>
    </div>
  );
}

export default NameCell;
