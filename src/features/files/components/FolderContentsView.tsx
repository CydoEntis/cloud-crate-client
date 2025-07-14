import { useGetFolderContentsQuery, CreateFolderModal } from "@/features/folder";
import { useFolderSearch } from "@/features/folder/hooks/useFolderSearch";
import FilePagination from "./FilePagination";
import FileTable from "./FileTable";
import FileTableToolbar from "./FileTableToolbar";
import folderFileTableColumns from "./table/columns/folderFileTableColumns";
import { useFolderCreation } from "@/features/folder/hooks/useFolderCreation";

export type FileContentsViewProps = {
  crateId: string;
  folderId: string | null;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
};

function FolderContentsView({
  crateId,
  folderId,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: FileContentsViewProps) {
  const { inputValue: search, debouncedValue: searchQuery, setSearch } = useFolderSearch();
  const { isCreateFolderOpen, setIsCreateFolderOpen, handleCreateFolder, isCreating } = useFolderCreation(
    crateId,
    folderId,
    () => refetchFolderContents()
  );
  const {
    data: folderContents,
    isLoading,
    error,
    refetch: refetchFolderContents,
  } = useGetFolderContentsQuery(crateId, folderId, {
    page,
    pageSize,
    search: searchQuery,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      <h3>{folderContents?.folderName}</h3>

      <FileTableToolbar search={search} setSearch={setSearch} onOpenCreateFolder={() => setIsCreateFolderOpen(true)} />

      <FileTable
        data={folderContents?.items || []}
        columns={folderFileTableColumns()}
        onNavigate={() => {}}
        onDropItem={() => {}}
      />

      <FilePagination
        page={page}
        pageSize={pageSize}
        totalCount={folderContents?.totalCount ?? 0}
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
