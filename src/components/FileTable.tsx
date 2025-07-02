import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { bucketColumns, type StoredFile } from "@/features/bucket/bucket-columns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "./ui/button";

// Updated mock data with folders and files
const mockData: StoredFile[] = [
  { name: "Photos", uploadedBy: "Cydo", size: "-", uploadDate: "", isFolder: true },
  { name: "Invoices", uploadedBy: "Cydo", size: "-", uploadDate: "", isFolder: true },
  { name: "notes.txt", uploadedBy: "Cydo", size: "12", uploadDate: new Date().toISOString() },
  { name: "receipt.pdf", uploadedBy: "Cydo", size: "44", uploadDate: new Date().toISOString() },
  { name: "rs-bot.java", uploadedBy: "Cydo", size: "12", uploadDate: new Date().toISOString() },
  { name: "mike-blackmail.docx", uploadedBy: "Cydo", size: "12", uploadDate: new Date().toISOString() },
  { name: "tax-evasion.xlsx", uploadedBy: "Cydo", size: "12", uploadDate: new Date().toISOString() },
  { name: "image1.png", uploadedBy: "Cydo", size: "55", uploadDate: new Date().toISOString(), folder: "Photos" },

  {
    name: "invoice-march.pdf",
    uploadedBy: "Cydo",
    size: "32",
    uploadDate: new Date().toISOString(),
    folder: "Invoices",
  },
];

// Define width classes per column ID
const columnWidths: Record<string, string> = {
  fileName: "w-1/2",
  owner: "w-1/5",
  size: "w-1/12",
  uploaded: "w-1/5",
  actions: "w-[160px]",
};

type FileTableProps = {
  crateId: string;
  folderId: string | null;
};

function FileTable({ crateId, folderId }: FileTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof StoredFile>("size");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    let filtered = mockData.filter((file) => {
      if (currentFolder) {
        return file.folder === currentFolder && !file.isFolder;
      } else {
        return !file.folder || file.isFolder;
      }
    });

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";

      // Convert to string for comparison and handle numeric strings
      if (sortField === "size") {
        return sortOrder === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      }

      return sortOrder === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });

    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [page, pageSize, sortField, sortOrder, currentFolder]);

  const totalCount = filteredData.length;

  const table = useReactTable({
    data: filteredData,
    columns: bucketColumns,
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

  return (
    <div className="p-4 bg-white rounded-xl mt-8">
      {currentFolder && (
        <button
          className="mb-4 px-4 text-blue-500 underline"
          onClick={() => {
            setCurrentFolder(null);
            setPage(1);
          }}
        >
          ← Back to all files
        </button>
      )}
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
                  className={`cursor-pointer px-4 font-bold text-md ${columnWidths[header.column.id] || ""}`}
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
                onClick={() => {
                  if (rowData.isFolder) {
                    setCurrentFolder(rowData.name);
                    setPage(1);
                  }
                }}
                className={rowData.isFolder ? "cursor-pointer hover:bg-muted/30" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`p-4 ${columnWidths[cell.column.id] || ""} ${cell.column.id === "controls" ? "justify-end flex" : ""}`}
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
