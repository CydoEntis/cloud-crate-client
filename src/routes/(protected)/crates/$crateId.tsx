import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BucketStorage from "@/features/bucket/BucketStorage";
import { ImageUpload } from "@/components/ImageUpload";
import FileTable from "@/components/FileTable";

import { FolderBreadcrumb } from "@/components/FolderBreadcrumb";
import { getFolderPath, getSiblingFolders, type Folder } from "@/features/folder/api";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId } = Route.useParams();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<Folder[]>([]);

  useEffect(() => {
    const loadPath = async () => {
      const path = await getFolderPath(crateId, currentFolderId);
      setFolderPath(path);
    };
    loadPath();
  }, [crateId, currentFolderId]);

  const handleNavigate = (folderId: string | null) => {
    setCurrentFolderId(folderId);
    // You may want to fetch files, update route, etc.
  };

  const getSiblings = (parentId: string | null) => {
    return getSiblingFolders(crateId, parentId); // Returns array of Folder[]
  };

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <FolderBreadcrumb folderPath={folderPath} onNavigate={handleNavigate} getSiblings={getSiblings} />
        <Button variant="outline" className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>

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
