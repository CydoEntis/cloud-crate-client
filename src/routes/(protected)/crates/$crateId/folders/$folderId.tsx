import { useMemo, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import type { ColumnDef } from "@tanstack/react-table";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import BulkActionBar from "@/features/bulk/components/BulkActionToolbar";
import FolderContentsError from "@/features/folder-contents/components/FolderContentsError";
import FolderContentsPageHeader from "@/features/folder-contents/components/FoloderContentsPageHeader";
import FileUpload from "@/features/folder-contents/file/components/FileUpload";
import FileTable from "@/features/folder-contents/file/components/FileTable";
import CreateFolderModal from "@/features/folder-contents/folder/components/UpsertFolderModal";
import FilePreviewPanel from "@/features/folder-contents/file/components/FilePreviewPanel";
import { folderSearchSchema } from "@/features/folder-contents/sharedSchema";

import folderContentsColumns from "@/features/folder-contents/components/folderContentsColumns";
import useFolderContentsActions, {
  type FolderPageSearchParams,
} from "@/features/folder-contents/hooks/useFolderContentsActions";
import { type FolderContentRowItem, type OrderBy } from "@/features/folder-contents/sharedTypes";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import { CrateRole } from "@/features/crates/crateTypes";
import FolderFilters from "@/features/folder-contents/folder/components/FolderFilters";
import { useFolderFilters } from "@/features/folder-contents/folder/hooks/useFolderFilters";

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

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (old) => ({ ...old, page: newPage }),
      });
    },
    [navigate]
  );

  const columns = useMemo(
    () => folderContentsColumns(flattenedContents, crate?.currentMember) as ColumnDef<FolderContentRowItem>[],
    [selectMode, flattenedContents, crate?.currentMember]
  );

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

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={handleCloseCreateFolder}
        crateId={crateId}
        parentFolderId={folderId}
      />

      {previewFile && <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={handleClosePreview} />}

      <BulkActionBar crateId={crateId} folderId={folderId} folderDestinations={availableFolders} refetch={refetch} />
    </FolderPageLayout>
  );
}
