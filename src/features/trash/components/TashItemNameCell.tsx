import { File, Folder } from "lucide-react";
import type { TrashItem } from "../trashTypes";

type TrashItemNameCellProps = {
  item: TrashItem;
};

function TrashItemNameCell({ item }: TrashItemNameCellProps) {
  const isFolder = item.type === "Folder";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        {isFolder ? <Folder className="h-5 w-5 text-yellow-500" /> : <File className="h-5 w-5 text-blue-500" />}
      </div>
      <span className="font-medium truncate">{item.name}</span>
    </div>
  );
}

export default TrashItemNameCell;
