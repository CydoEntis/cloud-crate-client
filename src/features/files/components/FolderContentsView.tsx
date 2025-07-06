import { useState, useMemo, useEffect } from "react";
import { useFolderContents, useCreateFolder, useMoveFolder } from "@/features/folder/hooks";
import type { StoredFile } from "@/features/files/types";
import FileTable from "./FileTable";
import FilePagination from "./FilePagination";
import FileTableToolbar from "./FileTableToolbar";
import CreateFolderModal from "@/features/folder/components/CreateFolderModal";
import crateColumns from "@/features/crates/components/crate-columns";

type FileContentsViewProps = {
  crateId: string;
  folderId: string | null;
  onFolderClick?: (folderId: string | null) => void;
};

function FolderContentsView({ crateId, folderId, onFolderClick }: FileContentsViewProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const pageSize = 10;

  const { folders, files, isLoading, error, refetchFolders } = useFolderContents(crateId, folderId);
  const createFolderMutation = useCreateFolder();
  const moveFolderMutation = useMoveFolder();

  const combinedData = useMemo<StoredFile[]>(() => {
    const folderItems = folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      crateId: folder.crateId,
      folderId: folder.parentFolderId ?? null,
      size: 0,
      mimeType: "folder",
      uploadDate: folder.createdAt ?? "",
      uploadedBy: "",
      isFolder: true,
      folderColor: folder.color,
    }));

    const fileItems = files.map((file: StoredFile) => ({
      id: file.id,
      name: file.name,
      crateId: file.crateId,
      folderId: file.folderId ?? null,
      size: Math.round((file.size ?? 0) / 1024 / 1024),
      mimeType: file.mimeType,
      uploadDate: file.uploadDate ?? file.uploadedBy ?? "",
      uploadedBy: file.uploadedBy ?? "",
      isFolder: false,
    }));

    return [...folderItems, ...fileItems];
  }, [folders, files]);

  const paginated = useMemo(
    () => combinedData.slice((page - 1) * pageSize, page * pageSize),
    [combinedData, page, pageSize]
  );

  const handleCreateFolder = async (name: string, color: string) => {
    if (!name.trim()) return;

    try {
      await createFolderMutation.mutateAsync({
        crateId,
        data: {
          name,
          crateId,
          parentFolderId: folderId ?? "root",
          color,
        },
      });

      setIsCreateFolderOpen(false);

      await refetchFolders();
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  };

  const handleDropFolder = async (sourceFolderId: string, targetFolderId: string) => {
    if (sourceFolderId === targetFolderId) return;

    try {
      await moveFolderMutation.mutateAsync({
        crateId,
        folderId: sourceFolderId,
        newParentId: targetFolderId,
      });
    } catch (err) {
      console.error("Failed to move folder", err);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      <FileTableToolbar search={search} setSearch={setSearch} onOpenCreateFolder={() => setIsCreateFolderOpen(true)} />
      <FileTable
        data={paginated}
        columns={crateColumns}
        onRowClick={(file: StoredFile) => {
          if (file.isFolder) onFolderClick?.(file.id);
        }}
        onDropFolder={handleDropFolder} // 🧩 Pass drop handler
      />
      <FilePagination page={page} pageSize={pageSize} totalCount={combinedData.length} onPageChange={setPage} />

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}

export default FolderContentsView;
