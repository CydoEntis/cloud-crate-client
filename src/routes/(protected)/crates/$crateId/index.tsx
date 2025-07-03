import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BucketStorage from "@/features/bucket/BucketStorage";
import { ImageUpload } from "@/components/ImageUpload";
import FileTable from "@/components/FileTable";
import { useCreateFolder, useRootFolders } from "@/features/folder/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderBreadcrumb } from "@/components/FolderBreadcrumb";
import FolderContentsView from "@/features/files/components/FolderContentsView";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId } = Route.useParams();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
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

  // Update navigation and state on folder click
  const handleNavigate = (folderId: string | null) => {
    setCurrentFolderId(folderId);

    if (folderId) {
      navigate({ to: `/crates/${crateId}/folders/${folderId}` });
    } else {
      // Navigate to root folder view
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
        <h3 className="text-lg font-semibold mb-2">Root/</h3>
        <FolderContentsView crateId={crateId} folderId={currentFolderId} onFolderClick={handleNavigate} />
      </div>
    </section>
  );
}
