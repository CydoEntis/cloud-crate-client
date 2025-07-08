import { useState, useMemo, useEffect } from "react";
import { useFolderContents, useCreateFolder, useMoveFolder } from "@/features/folder/hooks";
import FileTable from "./FileTable";
import FilePagination from "./FilePagination";
import FileTableToolbar from "./FileTableToolbar";
import CreateFolderModal from "@/features/folder/components/CreateFolderModal";
import crateColumns from "@/features/crates/components/crate-columns";
import { FolderItemType } from "@/features/folder/types";

export type FileContentsViewProps = {
  crateId: string;
  folderId: string | null;
  onFolderClick?: (folderId: string | null) => void;
};

function FolderContentsView({ crateId, folderId, onFolderClick }: FileContentsViewProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useFolderContents(crateId, folderId, {
    page,
    pageSize,
    search,
  });

  const createFolderMutation = useCreateFolder();
  const moveFolderMutation = useMoveFolder();

  const combinedData = useMemo(() => {
    if (!data) return [];

    const items = data.items.filter((item) => item.id !== "__back");

    if (folderId) {
      const backFolderId = data.parentFolderId ?? null;
      return [
        {
          id: "__back",
          name: "..",
          crateId,
          parentFolderId: backFolderId,
          type: FolderItemType.Folder,
          isBackRow: true,
          sizeInBytes: 0,
          mimeType: undefined,
        },
        ...items,
      ];
    }

    return items;
  }, [data, folderId, crateId]);

  const handleCreateFolder = async (name: string, color: string) => {
    if (!name.trim()) return;

    try {
      await createFolderMutation.mutateAsync({
        crateId,
        data: {
          name,
          crateId,
          parentFolderId: folderId === "root" ? null : folderId,
          color,
        },
      });

      setIsCreateFolderOpen(false);
      await refetch();
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  };

  const handleDropFolder = async (sourceFolderId: string, targetFolderId: string | null) => {
    if (sourceFolderId === targetFolderId) return;

    try {
      await moveFolderMutation.mutateAsync({
        crateId,
        folderId: sourceFolderId,
        newParentId: targetFolderId,
      });

      await refetch();
    } catch (err) {
      console.error("Failed to move folder", err);
    }
  };

  const handleDropToParent = async (ids: string[]) => {
    const parentId = data?.parentFolderId ?? null;
    await Promise.all(ids.map((id) => handleDropFolder(id, parentId)));
  };

  useEffect(() => {
    setPage(1);
  }, [search, folderId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      <FileTableToolbar search={search} setSearch={setSearch} onOpenCreateFolder={() => setIsCreateFolderOpen(true)} />

      <FileTable
        data={combinedData}
        columns={crateColumns({
          onDropToParent: handleDropToParent,
          onBackClick: (id) => {
            console.log("Back clicked, navigating to:", id);
            onFolderClick?.(id);
          },
          onFolderClick: (id) => {
            console.log("Folder clicked, navigating to:", id);
            onFolderClick?.(id);
          },
        })}
        onRowClick={(row) => {
          if ((row as any).isBackRow) {
            onFolderClick?.(row.parentFolderId ?? null);
          } else if (row.type === FolderItemType.Folder) {
            onFolderClick?.(row.id);
          }
        }}
        onDropFolder={handleDropFolder}
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
