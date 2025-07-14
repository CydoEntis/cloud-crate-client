import { createFileRoute } from "@tanstack/react-router";
import { FolderContentsView } from "@/features/files";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const folderSearchSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  search: z.string().optional(),
});

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  validateSearch: zodValidator(folderSearchSchema),
  component: CrateIndex,
});

function CrateIndex() {
  const { crateId } = Route.useParams();
  const { page, pageSize, search } = Route.useSearch();
  const navigate = Route.useNavigate();

  const handleSearchChange = (newSearch: string) => {
    navigate({
      search: (prev) => {
        const next = { ...prev };

        if (newSearch && newSearch.trim() !== "") {
          next.search = newSearch;
          next.page = 1;
        } else {
          delete (next as any).search;
          next.page = 1;
        }

        return next;
      },
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({ search: (prev) => ({ ...prev, page: newPage }) });
  };

  const handlePageSizeChange = (newSize: number) => {
    navigate({ search: (prev) => ({ ...prev, pageSize: newSize, page: 1 }) });
  };

  return (
    <FolderContentsView
      crateId={crateId}
      folderId={null}
      page={page}
      pageSize={pageSize}
      search={search || ""}
      onSearchChange={handleSearchChange}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
}
