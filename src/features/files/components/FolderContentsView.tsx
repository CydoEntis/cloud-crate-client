import { useEffect, useState } from "react";
import FilePagination from "./FilePagination";
import FileTable from "./FileTable";
import FileTableToolbar from "./FileTableToolbar";
import folderFileTableColumns from "./table/columns/folderFileTableColumns";
import { useFolderCreation } from "@/features/folder/hooks/useFolderCreation";
import { useFolderDragAndDrop } from "@/features/folder/hooks/useFolderDragAndDrop";
import { useFolderNavigation } from "@/features/folder/hooks/useFolderNavigation";
import { useFolderContents } from "@/features/folder/hooks/useFolderContents"; // <-- your new hook
import CreateFolderModal from "@/features/folder/components/CreateFolderModal";

type FolderContentsViewProps = {
  crateId: string;
  folderId: string | null;
  page: number;
  pageSize: number;
  search: string;
  onSearchChange: (val: string) => void;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
};

function FolderContentsView({
  crateId,
  folderId,
  page,
  pageSize,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
}: FolderContentsViewProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { folderItemsWithBackRow, folderName, totalCount, isLoading, error, refetch } = useFolderContents(
    crateId,
    folderId,
    page,
    pageSize,
    debouncedSearch
  );

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
    <div className="p-4 bg-white rounded-xl mt-8">
      <h3>{folderName}</h3>

      <FileTableToolbar
        search={search}
        setSearch={onSearchChange}
        onOpenCreateFolder={() => setIsCreateFolderOpen(true)}
      />

      <FileTable
        data={folderItemsWithBackRow}
        columns={folderFileTableColumns()}
        onNavigate={handleNavigate}
        onDropItem={(itemId, itemType, targetFolderId) => handleDropItem(itemId, itemType, targetFolderId, refetch)}
      />

      <FilePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={handleCreateFolder}
        isLoading={isCreating}
      />
    </div>
  );
}

export default FolderContentsView;
