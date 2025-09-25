import { useMemo, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import type { ColumnDef } from "@tanstack/react-table";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import BulkActionBar from "@/features/bulk/components/BulkActionToolbar";
import PaginationControls from "@/shared/components/PaginationControls";
import FolderContentsError from "@/features/folder-contents/components/FolderContentsError";
import FolderContentsPageHeader from "@/features/folder-contents/components/FoloderContentsPageHeader";
import FileUpload from "@/features/folder-contents/file/components/FileUpload";
import FileTable from "@/features/folder-contents/file/components/FileTable";
import CreateFolderModal from "@/features/folder-contents/folder/components/CreateFolderModal";
import FilePreviewPanel from "@/features/folder-contents/file/components/FilePreviewPanel";
import { folderSearchSchema } from "@/features/folder-contents/sharedSchema";

import folderContentsColumns from "@/features/folder-contents/components/folderContentsColumns";
import useFolderContentsActions, {
  type FolderPageSearchParams,
} from "@/features/folder-contents/hooks/useFolderContentsActions";
import ContentFilter from "@/shared/components/filter/ContentFilter";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import {
  allowedOrderByValues,
  orderByLabels,
  type FolderContentRowItem,
  type OrderBy,
} from "@/features/folder-contents/sharedTypes";

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

  const columns = useMemo(
    () => folderContentsColumns(flattenedContents, crate?.currentMember) as ColumnDef<FolderContentRowItem>[],
    [selectMode, flattenedContents]
  );

  return (
    <FolderPageLayout>
      {crate && <AvailableStorageIndicator crate={crate} />}
      {crate && <FileUpload crateId={crateId} folderId={folderId} />}

      <ContentFilter
        searchTerm={searchParams.searchTerm}
        onSearchTermChange={(val) => setSearchParams({ search: val, page: 1 })}
        searchPlaceholder="Search files & folders..."
        sort={{
          value: searchParams.orderBy,
          onChange: (val) => setSearchParams({ orderBy: val, page: 1 }),
          allowedValues: allowedOrderByValues,
          labels: orderByLabels,
          ascending: searchParams.ascending,
          onOrderChange: (val) => setSearchParams({ ascending: val, page: 1 }),
        }}
        actions={[
          <Button key="new-folder" onClick={handleOpenCreateFolder}>
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>,
        ]}
        layout={{ searchBreakpoint: "lg", mobileDialog: false }}
      />

      <FileTable
        crateId={crateId}
        data={folderData}
        columns={columns}
        breadcrumbs={folderData.breadcrumbs}
        onNavigate={handleNavigate}
        onDropItem={(item, targetFolderId) => handleDropItem(item, targetFolderId)}
        onPreviewFile={handlePreviewFile}
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
