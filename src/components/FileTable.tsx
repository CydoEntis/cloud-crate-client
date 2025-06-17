import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { bucketColumns, type StoredFile } from "@/features/bucket/bucket-columns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";


const mockData: StoredFile[] = Array.from({ length: 45 }, (_, i) => ({
  fileName: "file.png",
  owner: "Cydo Entis",
  size: ["32", "44", "55", "10", "100", "12"][i % 3],
  uploaded: new Date(Date.now() - i * 86400000).toISOString(),
}));

function FileTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof StoredFile>("fileName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalCount = mockData.length;

  const data = useMemo(() => {
    const sorted = [...mockData].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
    });

    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [page, pageSize, sortField, sortOrder]);

  const table = useReactTable({
    data,
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
    <div>
      <div className="border border-gray-300 rounded-4xl">
        <div className="p-4">
          <h3 className="text-3xl font-bold">Recent Files</h3>
        </div>
        <Table className="">
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
                    className="cursor-pointer px-4 font-bold text-md"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sortField === header.column.id && (sortOrder === "asc" ? " ↑" : " ↓")}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="p-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex gap-2 items-center px-4 pb-4">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil(totalCount / pageSize)}
          </span>
          <button
            onClick={() => setPage((p) => (p < Math.ceil(totalCount / pageSize) ? p + 1 : p))}
            disabled={page >= Math.ceil(totalCount / pageSize)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileTable;
