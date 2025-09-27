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
  onMoveItem?: (item: FolderContentRowItem) => void; // New prop for move functionality
}

function FolderContentsActionMenu({
  row,
  currentMember,
  onEditFolder,
  onEditFile,
  onMoveItem,
}: FolderContentsActionMenuProps) {
  if ((row as any).isBackRow) return null;

  const currentMemberUserId = currentMember?.userId;
  const currentMemberRole = currentMember?.role;

  const canManage = (() => {
    if (currentMemberRole === CrateRole.Owner || currentMemberRole === CrateRole.Manager) {
      return true;
    }

    if (currentMemberRole === CrateRole.Member) {
      if (row.isFolder) {
        return (row as any).createdByUserId === currentMemberUserId;
      } else {
        return (row as any).uploader?.id === currentMemberUserId;
      }
    }

    return false;
  })();

  // Existing mutations
  const softDeleteFolderMutation = useDeleteFolder();
  const softDeleteFileMutation = useSoftDeleteFile();
  const downloadFileMutation = useDownloadFile();
  const downloadFolderMutation = useDownloadFolder();

  // New move mutations
  const moveFolderMutation = useMoveFolder();
  const moveFileMutation = useMoveFile();

  const isFolder = (item: FolderContentRowItem): item is CrateFolder => {
    return item.isFolder === true;
  };

  const isFile = (item: FolderContentRowItem): item is CrateFile => {
    return item.isFolder === false;
  };

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

        {canManage && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-background cursor-pointer transition-all duration-300"
              onClick={handleEdit}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-background cursor-pointer transition-all duration-300"
              onClick={handleMove}
            >
              Move
            </DropdownMenuItem>
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
