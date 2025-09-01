import PaginationControls from "@/components/PaginationControls";
import { FileTable } from "@/features/folder-contents/components/file";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const allowedSortByValues = ["Name", "CreatedAt", "Size"] as const;
type SortByType = (typeof allowedSortByValues)[number];

const allowedOrderByValues = ["Asc", "Desc"] as const;
type OrderByType = (typeof allowedOrderByValues)[number];

const trashSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(allowedSortByValues).optional().default("Name"),
  orderBy: z.enum(allowedOrderByValues).optional().default("Asc"),
});

export const Route = createFileRoute("/(protected)/trash")({
  validateSearch: zodValidator(trashSearchSchema),
  component: TrashPage,
});

function TrashPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;
  const searchTerm = search.search ?? "";
  const sortBy = search.sortBy ?? "Name";
  const orderBy = search.orderBy ?? "Asc";

  // const { data, isLoading, error } = useTrashContents(crateId, page, pageSize, searchTerm, sortBy, orderBy);

  if (isLoading) return <p>Loading trash...</p>;
  if (error) return <p>Failed to load trash</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Trash</h2>

      <FileTable
        crateId={crateId}
        breadcrumbs={[]} // probably not needed in trash
        data={data.items}
        columns={trashTableColumns()}
        isLoading={isLoading}
      />

      <PaginationControls
        page={page}
        pageSize={pageSize}
        totalCount={data.totalCount}
        onPageChange={(newPage) => navigate({ search: { ...search, page: newPage } })}
        onPageSizeChange={(newSize) => navigate({ search: { ...search, page: 1, pageSize: newSize } })}
      />
    </div>
  );
}
