import { useState } from "react";
import { useCreateFolder } from "./mutations/useCreateFolder";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { CreateFolder } from "../../types/folder/request/CreateFolder";
import type { FolderContents } from "../../types/FolderContents";

export function useFolderCreation(
  crateId: string,
  folderId: string | null,
  refetch: () => Promise<QueryObserverResult<FolderContents>>
) {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const createFolderMutation = useCreateFolder();

  const handleCreateFolder = async (name: string, color: string) => {
    if (!name.trim()) return;

    const payload: CreateFolder = {
      name,
      crateId,
      parentFolderId: folderId === "root" ? null : folderId,
      color,
    };

    try {
      await createFolderMutation.mutateAsync(payload);
      await refetch(); // fetch updated folder contents first
      setIsCreateFolderOpen(false); // close modal after everything
    } catch (err) {
      console.error("Failed to create folder:", err);
    }
  };

  return {
    isCreateFolderOpen,
    setIsCreateFolderOpen,
    handleCreateFolder,
    isCreating: createFolderMutation.isPending,
  };
}
