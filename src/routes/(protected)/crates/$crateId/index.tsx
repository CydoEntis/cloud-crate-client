import { useEffect } from "react";
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

const folderSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  search: z.string().optional(),
});

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  validateSearch: zodValidator(folderSearchSchema),
  component: RootFolderPage,
});

function RootFolderPage() {
  const { crateId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;
  const searchTerm = search.search ?? "";

  const setSearchParams = (params: Partial<typeof search>) => {
    navigate({
      search: (old) => ({
        ...old,
        ...params,
      }),
    });
  };

  useEffect(() => {
    const missingDefaults: Partial<typeof search> = {};
    if (!search.page) missingDefaults.page = 1;
    if (!search.pageSize) missingDefaults.pageSize = 10;

    if (Object.keys(missingDefaults).length > 0) {
      setSearchParams(missingDefaults);
    }
  }, []);

  // Fetch folder contents
  const { folderItemsWithBackRow, folderName, totalCount, isLoading, error, refetch } = useFolderContents(
    crateId,
    null,
    page,
    pageSize,
    searchTerm
  );

  // Hooks for folder actions
  const { isCreateFolderOpen, setIsCreateFolderOpen, handleCreateFolder, isCreating } = useFolderCreation(
    crateId,
    null,
    refetch
  );

  const { handleNavigate } = useFolderNavigation(crateId);
  const { handleDropItem } = useFolderDragAndDrop(crateId);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading contents.</p>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">{folderName}</h2>
      </div>

      <FileTableToolbar
        search={searchTerm}
        setSearch={(val) => setSearchParams({ search: val, page: 1 })}
        onOpenCreateFolder={() => setIsCreateFolderOpen(true)}
      />

      <FileTable
        data={folderItemsWithBackRow}
        columns={folderFileTableColumns()}
        onNavigate={handleNavigate}
        onDropItem={(itemId, itemType, targetFolderId) => handleDropItem(itemId, itemType, targetFolderId, refetch)}
        isLoading={isLoading}
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
    </div>
  );
}

export default RootFolderPage;
