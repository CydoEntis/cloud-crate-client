import FileIndicator from "@/components/FileIndicator";
import { FolderItemType } from "@/features/folder/types/FolderItemType";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";

type NameCellProps = {
  row: FolderOrFileItem;
};

function NameCell({ row }: NameCellProps) {
  return (
    <div className="flex gap-2 items-center w-full px-2 py-1 rounded">
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
