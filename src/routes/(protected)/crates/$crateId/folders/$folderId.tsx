// routes/(protected)/crates/$crateId/folders/$folderId.tsx
import { createFileRoute } from "@tanstack/react-router";
import { FolderContentsView } from "@/features/files";

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  component: FolderPage,
});

function FolderPage() {
  const { crateId, folderId } = Route.useParams();
  const currentFolderId = folderId ?? null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Folder: {currentFolderId ?? "Root"}</h3>
      <FolderContentsView crateId={crateId} folderId={currentFolderId} />
    </div>
  );
}
