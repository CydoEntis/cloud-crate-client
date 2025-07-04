import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { Folder } from "../../../dashboard";
import BucketStorage from "@/features/storage/components/AvailableStorageIndicator";
import { ImageUpload } from "@/components/ImageUpload";
import FileTable from "@/components/FileTable";
import { useCreateFolder, useRootFolders } from "@/features/folder/hooks";

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId, folderId } = Route.useParams(); // folderId may be undefined

  const currentFolderId = folderId ?? null; // normalize undefined to null

  const [newFolderName, setNewFolderName] = useState("");
  const navigate = useNavigate();
  const { data: rootFolders = [], refetch } = useRootFolders(crateId);
  const createFolderMutation = useCreateFolder();

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    await createFolderMutation.mutateAsync({
      crateId,
      data: {
        name: newFolderName.trim(),
        crateId,
        parentFolderId: currentFolderId,
      },
    });

    setNewFolderName("");
    refetch();
  };

  // Navigate by updating the route param folderId, no full page reload
  const handleNavigate = (folderId: string | null) => {
    if (folderId) {
      navigate({ to: `/crates/${crateId}/folders/${folderId}` });
    } else {
      navigate({ to: `/crates/${crateId}` });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">Test Crate</h3>
      </div>

      <div className="mb-4">
        <BucketStorage />
        <ImageUpload crateId={crateId} folderId={currentFolderId ?? undefined} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Files</h3>
        <FileTable crateId={crateId} folderId={currentFolderId} onFolderClick={handleNavigate} />
      </div>
    </section>
  );
}
