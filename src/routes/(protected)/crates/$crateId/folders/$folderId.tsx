import { useMemo, useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import type { ColumnDef } from "@tanstack/react-table";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import BulkActionBar from "@/features/bulk/components/BulkActionToolbar";
import FolderContentsError from "@/features/folder-contents/components/FolderContentsError";
import FolderContentsPageHeader from "@/features/folder-contents/components/FoloderContentsPageHeader";
import FileUpload from "@/features/folder-contents/file/components/FileUpload";
import FileTable from "@/features/folder-contents/file/components/FileTable";
import UpsertFolderModal from "@/features/folder-contents/folder/components/UpsertFolderModal";
import RenameFileModal from "@/features/folder-contents/file/components/RenameFileModal";
import FilePreviewPanel from "@/features/folder-contents/file/components/FilePreviewPanel";
import MoveDialog from "@/features/folder-contents/components/MoveDialog"; // Add this import
import { folderSearchSchema } from "@/features/folder-contents/sharedSchema";

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
  const [itemToMove, setItemToMove] = useState<FolderContentRowItem | null>(null);

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
    availableFolders,
    flattenedContents,
    isLoading,
    totalItems,
    previewFile,
    isCreateFolderOpen,
    selectMode,
    handlePreviewFile,
    handleClosePreview,
    handleOpenCreateFolder,
    handleCloseCreateFolder,
    handleNavigate,
    handleDropItem,
    refetch,
  } = useFolderContentsActions({ crateId, folderId, searchParams });

  const canManage = crate?.currentMember.role === CrateRole.Owner || crate?.currentMember.role === CrateRole.Manager;

  const handleEditFolder = useCallback((folder: CrateFolder) => {
    setEditingFolder(folder);
  }, []);

  const handleEditFile = useCallback((file: CrateFile) => {
    setEditingFile(file);
  }, []);

  // Add move handlers
  const handleMoveItem = useCallback((item: FolderContentRowItem) => {
    setItemToMove(item);
    setMoveDialogOpen(true);
  }, []);

  const handleCloseMoveDialog = useCallback(() => {
    setMoveDialogOpen(false);
    setItemToMove(null);
  }, []);

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

  // Pass the move handler to columns
  const columns = folderContentsColumns(
    flattenedContents,
    crate?.currentMember,
    handleEditFolder,
    handleEditFile,
    handleMoveItem // Add this parameter
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
        isOpen={moveDialogOpen}
        onClose={handleCloseMoveDialog}
        item={itemToMove}
        currentFolderId={folderId}
        crateId={crateId}
      />

      {previewFile && <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={handleClosePreview} />}

      <BulkActionBar crateId={crateId} folderId={folderId} folderDestinations={availableFolders} refetch={refetch} />
    </FolderPageLayout>
  );
}
