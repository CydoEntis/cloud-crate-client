import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImageUpload } from "@/components/ImageUpload";

import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import { FolderContentsView } from "@/features/files";

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId, folderId } = Route.useParams();

  const currentFolderId = folderId ?? null;

  const navigate = useNavigate();

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">Test Crate</h3>
      </div>

      <div className="mb-4">
        <AvailableStorageIndicator crateId={crateId} />
        <ImageUpload crateId={crateId} folderId={currentFolderId ?? undefined} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Root/</h3>
        <FolderContentsView crateId={crateId} folderId={currentFolderId} />
      </div>
    </section>
  );
}
