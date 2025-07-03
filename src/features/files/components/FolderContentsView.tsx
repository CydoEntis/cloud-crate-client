import { useState, useMemo } from "react";
import { useFolderContents } from "@/features/folder/hooks";
import type { StoredFile } from "@/features/files/types";
import FileTable from "./FileTable";
import FilePagination from "./FilePagination";
import { crateColumns } from "@/features/bucket/crate-columns";

type Props = {
  crateId: string;
  folderId: string | null;
  onFolderClick?: (folderId: string | null) => void;
};

export default function FolderContentsView({ crateId, folderId, onFolderClick }: Props) {
  const { folders, files, isLoading, error } = useFolderContents(crateId, folderId);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const combinedData = useMemo<StoredFile[]>(() => {
    const folderItems = folders.map((f) => ({
      id: f.id,
      name: f.name,
      crateId: f.crateId,
      folderId: f.parentFolderId ?? null,
      size: 0,
      mimeType: "folder",
      uploadDate: f.createdAt ?? "",
      uploadedBy: "",
      isFolder: true,
    }));

    const fileItems = files.map((file) => ({
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contents.</p>;

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      <FileTable
        data={paginated}
        columns={crateColumns}
        onRowClick={(file) => {
          if (file.isFolder) onFolderClick?.(file.id);
        }}
      />
      <FilePagination page={page} pageSize={pageSize} totalCount={combinedData.length} onPageChange={setPage} />
    </div>
  );
}
