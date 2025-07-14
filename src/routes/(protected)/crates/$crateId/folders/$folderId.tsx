import { createFileRoute } from "@tanstack/react-router";
import { FolderContentsView } from "@/features/files";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

// Same schema as CrateIndex
const folderSearchSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
});

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  validateSearch: zodValidator(folderSearchSchema),
  component: FolderPage,
});

function FolderPage() {
  const { crateId, folderId } = Route.useParams();
  const { page, pageSize } = Route.useSearch();
  const navigate = Route.useNavigate();

  const currentFolderId = folderId ?? null;

  return (
    <div>
      <FolderContentsView
        crateId={crateId}
        folderId={currentFolderId}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => navigate({ search: (prev) => ({ ...prev, page: newPage }) })}
        onPageSizeChange={(newSize) => navigate({ search: (prev) => ({ ...prev, pageSize: newSize, page: 1 }) })}
      />
    </div>
  );
}
