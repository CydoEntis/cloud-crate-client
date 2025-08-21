import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import { useFolderContents } from "@/features/folder/hooks/useFolderContents";
import { useFolderCreation } from "@/features/folder/hooks/useFolderCreation";
import { useFolderDragAndDrop } from "@/features/folder/hooks/useFolderDragAndDrop";
import { useFolderNavigation } from "@/features/folder/hooks/useFolderNavigation";

import PaginationControls from "@/components/PaginationControls";
import FileTable from "@/features/files/components/FileTable";
import folderFileTableColumns from "@/features/files/components/table/columns/folderFileTableColumns";
import CreateFolderModal from "@/features/folder/components/CreateFolderModal";
import FileTableToolbar from "@/features/files/components/FileTableToolbar";
import FilePreviewPanel from "@/features/files/components/FilePreviewPanel";

import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";

const allowedSortByValues = ["Name", "CreatedAt", "Size"] as const;
type SortByType = (typeof allowedSortByValues)[number];

const allowedOrderByValues = ["Asc", "Desc"] as const;
type OrderByType = (typeof allowedOrderByValues)[number];

const folderSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(allowedSortByValues).optional().default("Name"),
  orderBy: z.enum(allowedOrderByValues).optional().default("Asc"),
});

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  validateSearch: zodValidator(folderSearchSchema),
  component: FolderPage,
});

function FolderPage() {
  const { crateId, folderId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;
  const searchTerm = search.search ?? "";
  const sortBy = (search.sortBy ?? "Name") as SortByType;
  const orderBy = (search.orderBy ?? "Asc") as OrderByType;

  const setSearchParams = (params: Partial<typeof search>) => {
    navigate({
      search: (old) => ({ ...old, ...params }),
    });
  };

  useEffect(() => {
    const missingDefaults: Partial<typeof search> = {};
    if (!("page" in search)) missingDefaults.page = 1;
    if (!("pageSize" in search)) missingDefaults.pageSize = 10;
    if (!("sortBy" in search)) missingDefaults.sortBy = "Name";
    if (!("orderBy" in search)) missingDefaults.orderBy = "Asc";

    if (Object.keys(missingDefaults).length > 0) {
      setSearchParams(missingDefaults);
    }
  }, []);

  const { folderItemsWithBackRow, breadcrumbs, folderName, parentFolderId, totalCount, isLoading, error, refetch } =
    useFolderContents(crateId, folderId, page, pageSize, searchTerm, sortBy, orderBy);

  const { isCreateFolderOpen, setIsCreateFolderOpen, handleCreateFolder, isCreating } = useFolderCreation(
    crateId,
    folderId,
    refetch
  );

  const { handleNavigate } = useFolderNavigation(crateId);
  const { handleDropItem } = useFolderDragAndDrop(crateId);
  const [previewFile, setPreviewFile] = useState<FolderOrFileItem | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="space-y-6">
      <FileTableToolbar
        search={searchTerm}
        onSearchChange={(val) => setSearchParams({ search: val, page: 1 })}
        sortBy={sortBy}
        onSortByChange={(val) => setSearchParams({ sortBy: val, page: 1 })}
        orderBy={orderBy}
        onOrderByChange={(val) => setSearchParams({ orderBy: val, page: 1 })}
        onOpenCreateFolder={() => setIsCreateFolderOpen(true)}
        allowedSortByValues={allowedSortByValues}
      />

      <FileTable
        breadcrumbs={breadcrumbs}
        data={folderItemsWithBackRow}
        columns={folderFileTableColumns()}
        onNavigate={handleNavigate}
        onDropItem={(itemId, itemType, targetFolderId) => handleDropItem(itemId, itemType, targetFolderId, refetch)}
        onPreviewFile={setPreviewFile}
        isLoading={isLoading}
        crateId={crateId}
      />

      {totalCount > 0 && (
        <PaginationControls
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={(newPage) => setSearchParams({ page: newPage })}
          onPageSizeChange={(newSize) => setSearchParams({ pageSize: newSize, page: 1 })}
        />
      )}

      {isCreateFolderOpen && (
        <CreateFolderModal
          isOpen={isCreateFolderOpen}
          onClose={() => setIsCreateFolderOpen(false)}
          onCreate={handleCreateFolder}
          isLoading={isCreating}
        />
      )}

      {previewFile && (
        <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  );
}

export default FolderPage;
