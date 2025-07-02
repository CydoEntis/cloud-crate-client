import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "./ui/button";
import type { StoredFile } from "@/features/files/types";
import { useFolderContents } from "@/features/folder/hooks";
import { crateColumns } from "@/features/bucket/crate-columns";

type FileTableProps = {
  crateId: string;
  folderId: string | null;
  onFolderClick?: (folderId: string | null) => void; // callback to notify folder click
};

// Extend column meta typing for width
type BucketColumnMeta = {
  width?: string;
};

function FileTable({ crateId, folderId, onFolderClick }: FileTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // fixed page size, adjust as needed
  const [sortField, setSortField] = useState<keyof StoredFile>("size");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { folders, files, isLoading, error } = useFolderContents(crateId, folderId);

  const combinedData: StoredFile[] = useMemo(() => {
    const folderItems: StoredFile[] = folders.map((f) => ({
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

    const fileItems: StoredFile[] = files.map((file) => ({
      ...file,
      isFolder: false,
    }));

    return [...folderItems, ...fileItems];
  }, [folders, files]);

  const filteredData = useMemo(() => {
    const sorted = [...combinedData].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";

      if (sortField === "size") {
        return sortOrder === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      }
      return sortOrder === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });

    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [combinedData, page, pageSize, sortField, sortOrder]);

  const totalCount = combinedData.length;

  const table = useReactTable({
    data: filteredData,
    columns: crateColumns,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
  });

  if (isLoading) return <p>Loading files...</p>;
  if (error) return <p>Error loading files</p>;

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={() => {
                    const isDesc = sortOrder === "desc" && sortField === header.column.id;
                    setSortField(header.column.id as keyof StoredFile);
                    setSortOrder(isDesc ? "asc" : "desc");
                  }}
                  className={`cursor-pointer px-4 font-bold text-md ${
                    (header.column.columnDef.meta as BucketColumnMeta)?.width || ""
                  }`}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortField === header.column.id && (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const rowData = row.original as StoredFile;
            return (
              <TableRow
                key={row.id}
                onClick={(event) => {
                  if (rowData.isFolder && !(event.target as HTMLElement).closest(".actions-cell")) {
                    onFolderClick?.(rowData.id ?? null);
                  }
                }}
                className={rowData.isFolder ? "cursor-pointer hover:bg-muted/30" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`p-4 ${(cell.column.columnDef.meta as BucketColumnMeta)?.width || ""} ${
                      cell.column.id === "controls" ? "actions-cell justify-end flex" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between gap-2 items-center px-4 pb-4">
        <span>
          Page {page} of {Math.ceil(totalCount / pageSize)}
        </span>
        <div className="space-x-2">
          <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button
            onClick={() => setPage((p) => (p < Math.ceil(totalCount / pageSize) ? p + 1 : p))}
            disabled={page >= Math.ceil(totalCount / pageSize)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FileTable;
