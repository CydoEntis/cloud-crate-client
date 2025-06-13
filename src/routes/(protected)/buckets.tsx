import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bucketColumns } from "@/features/bucket/bucket-columns";
import type { Bucket } from "@/features/bucket/bucket-columns";
import { createFileRoute } from "@tanstack/react-router";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

export const Route = createFileRoute("/(protected)/buckets")({
  component: RouteComponent,
});

const mockData: Bucket[] = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `Bucket ${i + 1}`,
  storage: ["32", "44", "55", "10", "100", "12"][i % 3],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

function RouteComponent() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof Bucket>("name");
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={() => {
                    const isDesc = sortOrder === "desc" && sortField === header.column.id;
                    setSortField(header.column.id as keyof Bucket);
                    setSortOrder(isDesc ? "asc" : "desc");
                  }}
                  className="cursor-pointer"
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
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex gap-2 items-center">
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
  );
}
