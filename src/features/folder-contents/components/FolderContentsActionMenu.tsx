import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import type { FolderContentRowItem } from "../sharedTypes";
import { useDeleteFolder } from "../folder/api/folderQueries";
import { useSoftDeleteFile } from "../file/api/fileQueries";
import { CrateRole } from "@/features/crates/crateTypes";
import type { Member } from "@/features/members/memberTypes";

function FolderContentsActionMenu({ row, currentMember }: { row: FolderContentRowItem; currentMember?: Member }) {
  if ((row as any).isBackRow) return null;

  const currentMemberUserId = currentMember?.userId;
  const currentMemberRole = currentMember?.role;
  const canManage =
    currentMemberRole === CrateRole.Owner ||
    currentMemberRole === CrateRole.Manager ||
    (currentMemberRole === CrateRole.Member && row.uploader?.id === currentMemberUserId);

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

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-accent" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          className="hover:bg-background cursor-pointer transition-all duration-300"
          onClick={handleDownload}
        >
          Download
        </DropdownMenuItem>

        {canManage && (
          <>
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
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FolderContentsActionMenu;
