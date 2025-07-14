import { createFileRoute } from "@tanstack/react-router";
import { FolderContentsView } from "@/features/files";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const folderSearchSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(1),
});

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  validateSearch: zodValidator(folderSearchSchema),
  component: CrateIndex,
});

function CrateIndex() {
  const { crateId } = Route.useParams();
  const { page, pageSize } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <FolderContentsView
      crateId={crateId}
      folderId={null}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => navigate({ search: (prev) => ({ ...prev, page: newPage }) })}
      onPageSizeChange={(newSize) => navigate({ search: (prev) => ({ ...prev, pageSize: newSize, page: 1 }) })}
    />
  );
}
