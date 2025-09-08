import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import { useCrateDetails } from "@/features/crates/hooks/queries/useCrateDetails";
import { useFolderContents } from "@/features/folder-contents/hooks/folder/useFolderContents";
import { useFolderCreation } from "@/features/folder-contents/hooks/folder/useFolderCreation";
import { useFolderDragAndDrop } from "@/features/folder-contents/hooks/folder/useFolderDragAndDrop";
import { useFolderNavigation } from "@/features/folder-contents/hooks/folder/useFolderNavigation";
import { useAvailableMoveTargets } from "@/features/folder-contents/hooks/folder/useAvailableMoveTargets";

import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import FileUpload from "@/features/folder-contents/components/file/FileUpload";
import FileTable from "@/features/folder-contents/components/file/FileTable";
import FileTableToolbar from "@/features/folder-contents/components/file/FileTableToolbar";
import PaginationControls from "@/components/PaginationControls";
import { CreateFolderModal } from "@/features/folder-contents/components/folder";
import FilePreviewPanel from "@/features/folder-contents/components/file/FilePreviewPanel";
import folderFileTableColumns from "@/features/folder-contents/components/file/table/columns/folderFileTableColumns";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import CrateSettingsPanel from "@/features/crates/components/CrateSettingsPanel";
import { CrateRole } from "@/features/invites/types/CrateRole";
import { useFolderModalStore } from "@/features/folder-contents/store/useFolderModalStore";
import type { CrateFile } from "@/features/folder-contents/types/file/CrateFile";
import type { CrateFolder } from "@/features/folder-contents/types/folder/CrateFolder";
import BulkActionBar from "@/features/bulk/components/BulkActionToolbar";

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
  component: CrateFolderPage,
});

function CrateFolderPage() {
  const { crateId, folderId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { isOpen, close } = useFolderModalStore();

  // Crate info
  const { data: crate, isLoading: isCrateLoading, isError: isCrateError } = useCrateDetails(crateId);

  // Folder contents
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
    navigate({
      search: (old: typeof search) => ({ ...old, ...params }),
    });
  };

  useEffect(() => {
    const missingDefaults: Partial<typeof search> = {};
    if (!("page" in search)) missingDefaults.page = 1;
    if (!("pageSize" in search)) missingDefaults.pageSize = 10;
    if (!("orderBy" in search)) missingDefaults.orderBy = "Name";
    if (!("ascending" in search)) missingDefaults.ascending = false;
    if (Object.keys(missingDefaults).length > 0) setSearchParams(missingDefaults);
  }, []);

  const { isCreateFolderOpen, setIsCreateFolderOpen, handleCreateFolder, isCreating } = useFolderCreation(
    crateId,
    folderId,
    refetch
  );

  const { handleNavigate } = useFolderNavigation(crateId);
  const { handleDropItem } = useFolderDragAndDrop(crateId);

  // Flatten contents for table columns
  const flattenedContents = useMemo<(CrateFile | CrateFolder)[]>(() => {
    return [...(folderContents.folders ?? []), ...(folderContents.files ?? [])];
  }, [folderContents]);

  // Memoized columns
  const columns = useMemo(() => folderFileTableColumns(selectMode, flattenedContents), [selectMode, flattenedContents]);

  if (isCrateLoading || isLoading) return <p>Loading...</p>;
  if (isCrateError || !crate || error) return <p>Failed to load crate or folder info</p>;

  return (
    <section className="space-y-6 p-4">
      {/* Crate Header */}
      <div className="flex justify-between items-center py-2">
        <h3 className="text-3xl font-bold text-foreground">{crate.name}</h3>
        {crate.role !== CrateRole.Viewer && (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/30 cursor-pointer hover:text-primary"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings /> Settings
          </Button>
        )}
      </div>

      {/* Storage + Upload */}
      <div className="mb-4 flex flex-col gap-4">
        <AvailableStorageIndicator crate={crate} />
        <FileUpload crateId={crateId} folderId={folderId} />
      </div>

      {/* Toolbar + Table */}
      <FileTableToolbar
        search={searchTerm}
        onSearchChange={(val) => setSearchParams({ search: val, page: 1 })}
        ascending={ascending}
        onAscendingChange={(val) => setSearchParams({ ascending: val, page: 1 })}
        orderBy={orderBy}
        onOrderByChange={(val) => setSearchParams({ orderBy: val, page: 1 })}
        onOpenCreateFolder={() => setIsCreateFolderOpen(true)}
        allowedOrderByValues={allowedOrderByValues}
        crateId={crateId}
        folderId={folderId}
        folderDestinations={availableFolders}
        refetch={refetch}
      />

      <FileTable
        crateId={crateId}
        data={folderContents}
        columns={columns}
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
        onDropItem={(item, targetFolderId) =>
          handleDropItem({ id: item.id, isFolder: item.isFolder }, targetFolderId, refetch)
        }
        onPreviewFile={setPreviewFile}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {totalFiles + totalFolders > 0 && (
        <PaginationControls
          page={page}
          pageSize={pageSize}
          totalCount={totalFiles + totalFolders}
          onPageChange={(newPage) => setSearchParams({ page: newPage })}
          onPageSizeChange={(newSize) => setSearchParams({ pageSize: newSize, page: 1 })}
        />
      )}

      {/* Modals */}
      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        crateId={crateId}
        parentFolderId={folderId}
      />
      {previewFile && (
        <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={() => setPreviewFile(null)} />
      )}
      <CrateSettingsPanel
        role={crate.role}
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        crateId={crateId}
        initialName={crate.name}
        initialColor={crate.color}
      />
      <BulkActionBar crateId={crateId} folderId={folderId} folderDestinations={availableFolders} refetch={refetch} />
    </section>
  );
}

export default CrateFolderPage;
