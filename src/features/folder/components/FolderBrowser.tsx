import FileTable from "@/components/FileTable";
import { useState } from "react";

function FolderBrowser({ crateId }: { crateId: string }) {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  return (
    <div>
      {currentFolderId && (
        <button onClick={() => setCurrentFolderId(null)} className="mb-4 text-blue-600 underline">
          ← Back to root folder
        </button>
      )}

      <FileTable
        crateId={crateId}
        folderId={currentFolderId}
        onFolderClick={(folderId) => setCurrentFolderId(folderId)}
      />
    </div>
  );
}
