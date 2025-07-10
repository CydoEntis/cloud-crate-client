import FileTable from "./FileTable";
import FilePagination from "./FilePagination";
import FileTableToolbar from "./FileTableToolbar";
import CreateFolderModal from "@/features/folder/components/CreateFolderModal";
import folderFileTableColumns from "@/features/files/components/table/columns/folderFileTableColumns";
import { FolderItemType } from "@/features/folder/types";
import { useFolderView } from "@/features/folder/hooks/useFolderView";

export type FileContentsViewProps = {
  crateId: string;
  folderId: string | null;
};

function FolderContentsView({ crateId, folderId }: FileContentsViewProps) {
  const {
    isLoading,
    error,
    page,
    pageSize,
    search,
    setSearch,
    setPage,
    folderItemsWithBackRow,
    isCreateFolderOpen,
    setIsCreateFolderOpen,
    handleCreateFolder,
    handleDropItem,
    handleNavigate,
    data,
  } = useFolderView(crateId, folderId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      <FileTableToolbar search={search} setSearch={setSearch} onOpenCreateFolder={() => setIsCreateFolderOpen(true)} />
      <FileTable
        data={folderItemsWithBackRow}
        columns={folderFileTableColumns()}
        onNavigate={handleNavigate}
        onDropItem={handleDropItem}
      />

      <FilePagination page={page} pageSize={pageSize} totalCount={data?.totalCount ?? 0} onPageChange={setPage} />

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}

export default FolderContentsView;
