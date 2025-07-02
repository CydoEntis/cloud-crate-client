import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BucketStorage from "@/features/bucket/BucketStorage";
import { ImageUpload } from "@/components/ImageUpload";
import FileTable from "@/components/FileTable";
import { useCreateFolder, useRootFolders } from "@/features/folder/hooks";

import { FolderBreadcrumb } from "@/components/FolderBreadcrumb";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId } = Route.useParams();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");

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

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">Test Crate</h3>

        <div>
          <input
            type="text"
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <Button onClick={handleCreateFolder} disabled={createFolderMutation.isPending}>
            Create Folder
          </Button>
        </div>
      </div>

      {/* Other components */}
      <div className="mb-4">
        <BucketStorage />
        <ImageUpload crateId={crateId} folderId={currentFolderId ?? undefined} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Files</h3>
        <FileTable crateId={crateId} folderId={currentFolderId} />
      </div>
    </section>
  );
}
