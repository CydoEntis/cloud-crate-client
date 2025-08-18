import FileIndicator from "@/components/FileIndicator";
import { FolderItemType } from "@/features/folder/types/FolderItemType";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";

type NameCellProps = {
  row: FolderOrFileItem;
};

function NameCell({ row }: NameCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <FileIndicator
        filename={row.name}
        isFolder={row.type === FolderItemType.Folder}
        folderColor={row.color ?? "#9CA3AF"}
      />
      <h3
        className="font-semibold truncate max-w-[120px] sm:max-w-none" >
        {row.name}
      </h3>
    </div>
  );
}

export default NameCell;
