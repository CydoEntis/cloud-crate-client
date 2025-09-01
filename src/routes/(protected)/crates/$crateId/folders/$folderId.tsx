import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import { useFolderContents } from "@/features/folder-contents/hooks/folder/useFolderContents";
import { useFolderCreation } from "@/features/folder-contents/hooks/folder/useFolderCreation";
import { useFolderDragAndDrop } from "@/features/folder-contents/hooks/folder/useFolderDragAndDrop";
import { useFolderNavigation } from "@/features/folder-contents/hooks/folder/useFolderNavigation";
import { useAvailableMoveTargets } from "@/features/folder-contents/hooks/folder/useAvailableMoveTargets";

import FileTable from "@/features/folder-contents/components/file/FileTable";
import FileTableToolbar from "@/features/folder-contents/components/file/FileTableToolbar";
import PaginationControls from "@/components/PaginationControls";
import { CreateFolderModal } from "@/features/folder-contents/components/folder";
import type { CrateFile } from "@/features/folder-contents/types/file/CrateFile";
import folderFileTableColumns from "@/features/folder-contents/components/file/table/columns/folderFileTableColumns";
import FilePreviewPanel from "@/features/folder-contents/components/file/FilePreviewPanel";

const allowedOrderByValues = ["Name", "CreatedAt", "Size"] as const;
type OrderByType = (typeof allowedOrderByValues)[number];

const folderSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  orderBy: z.enum(allowedOrderByValues).optional().default("Name"),
  ascending: z.boolean().default(false),
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
  const orderBy = (search.orderBy ?? "Name") as OrderByType;
  const ascending = search.ascending;

  const { folderContents, breadcrumbs, totalFiles, totalFolders, isLoading, error, refetch } = useFolderContents(
    crateId,
    folderId,
    page,
    pageSize,
    searchTerm,
    orderBy,
    ascending
  );

  const { data: availableFolders } = useAvailableMoveTargets(crateId);
  const [selectMode, setSelectMode] = useState(false);
  const [previewFile, setPreviewFile] = useState<CrateFile | null>(null);

  const setSearchParams = (params: Partial<typeof search>) => {
    navigate({ search: (old) => ({ ...old, ...params }) });
  };

  useEffect(() => {
    const missingDefaults: Partial<typeof search> = {};
    if (!("page" in search)) missingDefaults.page = 1;
    if (!("pageSize" in search)) missingDefaults.pageSize = 10;
    if (!("orderBy" in search)) missingDefaults.orderBy = "Name";
    if (Object.keys(missingDefaults).length > 0) setSearchParams(missingDefaults);
    if (!("ascneding" in search)) missingDefaults.ascending = false;
  }, []);

  const { isCreateFolderOpen, setIsCreateFolderOpen, handleCreateFolder, isCreating } = useFolderCreation(
    crateId,
    folderId,
    refetch
  );

  const { handleNavigate } = useFolderNavigation(crateId);
  const { handleDropItem } = useFolderDragAndDrop(crateId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="space-y-6">
      <FileTableToolbar
        search={searchTerm}
        onSearchChange={(val) => setSearchParams({ search: val, page: 1 })}
        ascending={ascending}
        onAscendingChange={(val) => setSearchParams({ ascending: val, page: 1 })}
        orderBy={orderBy}
        onOrderByChange={(val) => setSearchParams({ orderBy: val, page: 1 })}
        onOpenCreateFolder={() => setIsCreateFolderOpen(true)}
        allowedOrderByValues={allowedOrderByValues}
        selectMode={selectMode}
        onToggleSelectMode={setSelectMode}
        crateId={crateId}
        folderId={folderId ?? null}
        folderDestinations={availableFolders}
        refetch={refetch}
      />

      <FileTable
        crateId={crateId}
        data={folderContents}
        columns={folderFileTableColumns(selectMode)}
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
        onDropItem={(item, targetFolderId) =>
          handleDropItem({ id: item.id, isFolder: item.isFolder }, targetFolderId, refetch)
        }
        onPreviewFile={setPreviewFile}
        isLoading={isLoading}
      />

      {totalFiles + totalFolders > 0 && (
        <PaginationControls
          page={page}
          pageSize={pageSize}
          totalCount={totalFiles + totalFolders}
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
