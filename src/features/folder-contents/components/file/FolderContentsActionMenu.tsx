import type { FolderContentRowItem } from "@/features/folder-contents/types/FolderContentRowItem";
import { MoreVertical } from "lucide-react";
import { useDeleteFolder } from "../../hooks/folder/mutations/useDeleteFolder";
import { useSoftDeleteFile } from "../../hooks/file/mutations/useSoftDeleteFile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";

function FolderContentsActionMenu({ row }: { row: FolderContentRowItem }) {
  if ((row as any).isBackRow) return null;

  const softDeleteFolderMutation = useDeleteFolder();
  const softDeleteFileMutation = useSoftDeleteFile();

  const handleSoftDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (row.isFolder) {
      softDeleteFolderMutation.mutate({ crateId: row.crateId, folderId: row.id });
    } else {
      softDeleteFileMutation.mutate({ fileId: row.id, crateId: row.crateId });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-secondary border-none" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          className="hover:bg-background cursor-pointer transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Rename
        </DropdownMenuItem>
        {row.isFolder && (
          <DropdownMenuItem
            className="hover:bg-background cursor-pointer transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            Change Color
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="hover:bg-background cursor-pointer transition-all duration-300 text-destructive"
          onClick={handleSoftDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FolderContentsActionMenu;
