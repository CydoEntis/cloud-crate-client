import { MoreVertical, FolderOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import type { FolderContentRowItem } from "../sharedTypes";
import { useDeleteFolder, useDownloadFolder, useMoveFolder } from "../folder/api/folderQueries";
import { useDownloadFile, useSoftDeleteFile, useMoveFile } from "../file/api/fileQueries";
import { CrateRole } from "@/features/crates/crateTypes";
import type { Member } from "@/features/members/memberTypes";
import type { CrateFolder } from "../folder/folderTypes";
import type { CrateFile } from "../file/fileTypes";

interface FolderContentsActionMenuProps {
  row: FolderContentRowItem;
  currentMember?: Member;
  onEditFolder?: (folder: CrateFolder) => void;
  onEditFile?: (file: CrateFile) => void;
  onMoveItem?: (item: FolderContentRowItem) => void;
}

function FolderContentsActionMenu({
  row,
  currentMember,
  onEditFolder,
  onEditFile,
  onMoveItem,
}: FolderContentsActionMenuProps) {
  if ((row as any).isBackRow) return null;

  const currentMemberRole = currentMember?.role;
  const currentMemberId = currentMember?.userId;

  const softDeleteFolderMutation = useDeleteFolder();
  const softDeleteFileMutation = useSoftDeleteFile();
  const downloadFileMutation = useDownloadFile();
  const downloadFolderMutation = useDownloadFolder();

  const isFolder = (item: FolderContentRowItem): item is CrateFolder => {
    return item.isFolder === true;
  };

  const isFile = (item: FolderContentRowItem): item is CrateFile => {
    return item.isFolder === false;
  };

  const canManage = currentMemberRole === CrateRole.Owner || currentMemberRole === CrateRole.Manager;

  const isOwner =
    currentMemberId &&
    ((isFile(row) && row.uploader.userId === currentMemberId) ||
      (isFolder(row) && row.createdByUserId === currentMemberId));

  const canDelete = canManage || isOwner;
  const canEdit = canManage || isOwner;
  const canMove = canManage || isOwner;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFolder(row)) {
      onEditFolder?.(row);
    } else if (isFile(row)) {
      onEditFile?.(row);
    }
  };

  const handleMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveItem?.(row);
  };

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
    if (row.isFolder) {
      downloadFolderMutation.mutate({
        crateId: row.crateId,
        folderId: row.id,
      });
    } else {
      downloadFileMutation.mutate({
        crateId: row.crateId,
        fileId: row.id,
        fileName: row.name,
      });
    }
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

        {(canEdit || canMove) && <DropdownMenuSeparator />}

        {canEdit && (
          <DropdownMenuItem
            className="hover:bg-background cursor-pointer transition-all duration-300"
            onClick={handleEdit}
          >
            Edit
          </DropdownMenuItem>
        )}

        {canMove && (
          <DropdownMenuItem
            className="hover:bg-background cursor-pointer transition-all duration-300"
            onClick={handleMove}
          >
            Move
          </DropdownMenuItem>
        )}
        {canDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-background cursor-pointer transition-all duration-300 text-destructive"
              onClick={handleSoftDelete}
            >
              Trash
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FolderContentsActionMenu;
