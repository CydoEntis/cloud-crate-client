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
import {
  allowedOrderByValues,
  orderByLabels,
  type FolderContentRowItem,
  type OrderBy,
} from "@/features/folder-contents/sharedTypes";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import { CrateRole } from "@/features/crates/crateTypes";
import { SearchInput } from "@/shared/components/search/SearchInput";
import { SortControls } from "@/shared/components/sort/SortControls";

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

  const searchParams = useMemo<FolderPageSearchParams>(
    () => ({
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
      searchTerm: search.search ?? "",
      orderBy: (search.orderBy ?? "Name") as OrderBy,
      ascending: search.ascending ?? false,
    }),
    [search.page, search.pageSize, search.search, search.orderBy, search.ascending]
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

  const setSearchParams = useCallback(
    (params: Partial<typeof search>) => {
      navigate({
        search: (old: typeof search) => ({ ...old, ...params }),
      });
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: newPage });
    },
    [setSearchParams]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      if (allowedOrderByValues.includes(value as OrderBy)) {
        setSearchParams({ orderBy: value as OrderBy, page: 1 });
      } else {
        console.warn(`Invalid sort value received: ${value}`);
      }
    },
    [setSearchParams]
  );

  const columns = useMemo(
    () => folderContentsColumns(flattenedContents, crate?.currentMember) as ColumnDef<FolderContentRowItem>[],
    [selectMode, flattenedContents, crate?.currentMember]
  );

  const sortByOptions = useMemo(
    () =>
      allowedOrderByValues.map((val) => ({
        value: val,
        label: orderByLabels[val],
      })),
    []
  );

  return (
    <FolderPageLayout>
      {crate && <AvailableStorageIndicator crate={crate} />}
      {crate && <FileUpload crateId={crateId} folderId={folderId} />}

      <div className="flex justify-between space-y-4">
        <SearchInput
          label="Search Files & Folders"
          value={searchParams.searchTerm}
          onChange={(val) => setSearchParams({ search: val, page: 1 })}
          placeholder="Search files & folders..."
        />

        <div className="flex gap-2">
          <SortControls
            label="Sort By"
            value={searchParams.orderBy}
            ascending={searchParams.ascending}
            options={sortByOptions}
            onValueChange={handleSortChange}
            onOrderChange={(asc) => setSearchParams({ ascending: asc, page: 1 })}
          />
        </div>
      </div>

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
          page={searchParams.page}
          pageSize={searchParams.pageSize}
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
