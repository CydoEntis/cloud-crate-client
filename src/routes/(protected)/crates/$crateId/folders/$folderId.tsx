import { useMemo, useCallback, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import type { ColumnDef } from "@tanstack/react-table";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import FolderContentsError from "@/features/folder-contents/components/FolderContentsError";
import FolderContentsPageHeader from "@/features/folder-contents/components/FoloderContentsPageHeader";
import FileUpload from "@/features/folder-contents/file/components/FileUpload";
import FileTable from "@/features/folder-contents/file/components/FileTable";
import UpsertFolderModal from "@/features/folder-contents/folder/components/UpsertFolderModal";
import RenameFileModal from "@/features/folder-contents/file/components/RenameFileModal";
import FilePreviewPanel from "@/features/folder-contents/file/components/FilePreviewPanel";
import MoveDialog from "@/features/folder-contents/components/MoveDialog";
import { folderSearchSchema } from "@/features/folder-contents/sharedSchema";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { folderService } from "@/features/folder-contents/folder/api/folderService";
import { toast } from "sonner";

import useFolderContentsActions, {
  type FolderPageSearchParams,
} from "@/features/folder-contents/hooks/useFolderContentsActions";
import { type FolderContentRowItem, type OrderBy } from "@/features/folder-contents/sharedTypes";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import { CrateRole } from "@/features/crates/crateTypes";
import FolderFilters from "@/features/folder-contents/folder/components/FolderFilters";
import { useFolderFilters } from "@/features/folder-contents/folder/hooks/useFolderFilters";
import type { CrateFolder } from "@/features/folder-contents/folder/folderTypes";
import type { CrateFile } from "@/features/folder-contents/file/fileTypes";
import { folderContentsColumns } from "@/features/folder-contents/components/folderContentsColumns";

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  validateSearch: zodValidator(folderSearchSchema),
  errorComponent: FolderContentsError,
  component: CrateFolderPage,
});

function FolderPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-6 p-4">
      <FolderContentsPageHeader />
      {children}
    </section>
  );
}

export default function CrateFolderPage() {
  const { crateId, folderId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [editingFolder, setEditingFolder] = useState<CrateFolder | null>(null);
  const [editingFile, setEditingFile] = useState<CrateFile | null>(null);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [bulkMoveDialogOpen, setBulkMoveDialogOpen] = useState(false);
  const [itemToMove, setItemToMove] = useState<FolderContentRowItem | null>(null);

  const { getFinalMoveSelection, clearSelection } = useSelectionStore();

  useEffect(() => {
    clearSelection();
  }, [folderId, clearSelection]);

  const currentFilters = useMemo(
    () => ({
      searchTerm: search.search ?? "",
      orderBy: (search.orderBy ?? "Name") as OrderBy,
      ascending: search.ascending ?? false,
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
    }),
    [search]
  );

  const filterControls = useFolderFilters(currentFilters, navigate);

  const searchParams = useMemo<FolderPageSearchParams>(
    () => ({
      page: currentFilters.page,
      pageSize: currentFilters.pageSize,
      searchTerm: currentFilters.searchTerm,
      orderBy: currentFilters.orderBy,
      ascending: currentFilters.ascending,
    }),
    [currentFilters]
  );

  const {
    crate,
    folderData,
    flattenedContents,
    isLoading,
    totalItems,
    previewFile,
    isCreateFolderOpen,
    handlePreviewFile,
    handleClosePreview,
    handleOpenCreateFolder,
    handleCloseCreateFolder,
    handleNavigate,
    handleDropItem,
    refetch,
  } = useFolderContentsActions({ crateId, folderId, searchParams });

  const canManage = crate?.currentMember.role === CrateRole.Owner || crate?.currentMember.role === CrateRole.Manager;

  console.log("Logged in users ROLE: ", crate?.currentMember.role);
  console.log("User Id: ", crate?.currentMember.userId);

  const handleEditFolder = useCallback((folder: CrateFolder) => {
    setEditingFolder(folder);
  }, []);

  const handleEditFile = useCallback((file: CrateFile) => {
    setEditingFile(file);
  }, []);

  const handleMoveItem = useCallback((item: FolderContentRowItem) => {
    setItemToMove(item);
    setMoveDialogOpen(true);
  }, []);

  const handleBulkMove = useCallback(() => {
    setBulkMoveDialogOpen(true);
  }, []);

  const handleBulkDelete = useCallback(async () => {
    const { fileIds, folderIds } = getFinalMoveSelection();
    if (fileIds.length === 0 && folderIds.length === 0) return;

    try {
      await folderService.bulkSoftDeleteItems(crateId, fileIds, folderIds);
      clearSelection();
      refetch();
      toast.success("Items deleted successfully");
    } catch (error) {
      console.error("Failed to delete items:", error);
      toast.error("Failed to delete items");
    }
  }, [crateId, getFinalMoveSelection, clearSelection, refetch]);


  const handleCloseEditFolder = useCallback(() => {
    setEditingFolder(null);
  }, []);

  const handleCloseEditFile = useCallback(() => {
    setEditingFile(null);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (old) => ({ ...old, page: newPage }),
      });
    },
    [navigate]
  );

  const handleMoveDialogSuccess = useCallback(() => {
    clearSelection();
    refetch();
  }, [clearSelection, refetch]);

  const columns = folderContentsColumns(
    flattenedContents,
    crate?.currentMember,
    handleEditFolder,
    handleEditFile,
    handleMoveItem
  ) as ColumnDef<FolderContentRowItem>[];

  return (
    <FolderPageLayout>
      {crate && <AvailableStorageIndicator crate={crate} />}
      {crate && <FileUpload crateId={crateId} folderId={folderId} />}

      <FolderFilters filterControls={filterControls} />

      <FileTable
        crateId={crateId}
        data={folderData}
        columns={columns}
        breadcrumbs={folderData.breadcrumbs}
        canManage={canManage}
        onNavigate={handleNavigate}
        onDropItem={(item, targetFolderId) => handleDropItem(item, targetFolderId)}
        onPreviewFile={handlePreviewFile}
        onCreateFolder={handleOpenCreateFolder}
        onBulkMove={handleBulkMove}
        onBulkDelete={handleBulkDelete}
        isLoading={isLoading}
      />

      {totalItems > 0 && (
        <PaginationControls
          page={currentFilters.page}
          pageSize={currentFilters.pageSize}
          totalCount={totalItems}
          onPageChange={handlePageChange}
        />
      )}

      <UpsertFolderModal
        isOpen={isCreateFolderOpen || !!editingFolder}
        onClose={() => {
          handleCloseCreateFolder();
          handleCloseEditFolder();
        }}
        crateId={crateId}
        parentFolderId={folderId}
        folder={editingFolder || undefined}
      />

      <RenameFileModal isOpen={!!editingFile} onClose={handleCloseEditFile} crateId={crateId} file={editingFile} />

      <MoveDialog
        isOpen={moveDialogOpen || bulkMoveDialogOpen}
        onClose={() => {
          setMoveDialogOpen(false);
          setBulkMoveDialogOpen(false);
          setItemToMove(null);
        }}
        item={itemToMove}
        currentFolderId={folderId}
        crateId={crateId}
        isBulkOperation={bulkMoveDialogOpen}
        onSuccess={handleMoveDialogSuccess}
      />

      {previewFile && <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={handleClosePreview} />}
    </FolderPageLayout>
  );
}