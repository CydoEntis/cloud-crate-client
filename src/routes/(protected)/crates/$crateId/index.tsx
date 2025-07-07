// src/features/crates/CrateDetailPage.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import { ImageUpload } from "@/components/ImageUpload";
import FolderContentsView from "@/features/files/components/FolderContentsView";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId } = Route.useParams();
  const navigate = useNavigate();

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  const handleNavigate = (folderId: string | null) => {
    if (folderId) {
      navigate({ to: `/crates/${crateId}/folders/${folderId}` });
    } else {
      setCurrentFolderId(null);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">Crate {crateId}</h3>
      </div>

      <div className="mb-4">
        <AvailableStorageIndicator crateId={crateId} />
        <ImageUpload crateId={crateId} folderId={undefined} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Root/</h3>
        <FolderContentsView crateId={crateId} folderId={null} onFolderClick={handleNavigate} />
      </div>
    </section>
  );
}

export default CrateDetailPage;
