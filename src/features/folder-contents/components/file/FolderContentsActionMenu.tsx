import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FolderContentRowItem } from "@/features/folder-contents/types/FolderContentRowItem";
import { MoreVertical } from "lucide-react";
import { useDeleteFolder } from "../../hooks/folder/mutations/useDeleteFolder";
import { useDeleteFile } from "../../hooks/file/mutations/useDeleteFile";

function FolderContentsActionMenu({ row }: { row: FolderContentRowItem }) {
  if ((row as any).isBackRow) return null;

  const deleteFolderMutation = useDeleteFolder();
  const deleteFileMutation = useDeleteFile();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (row.isFolder) {
      deleteFolderMutation.mutate(row.id);
    } else {
      deleteFileMutation.mutate({ fileId: row.id, crateId: row.crateId });
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
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FolderContentsActionMenu;
