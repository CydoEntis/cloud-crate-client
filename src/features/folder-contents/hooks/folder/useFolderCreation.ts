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

    const createFolderPayload: CreateFolder = {
      name,
      crateId,
      parentFolderId: folderId === "root" ? null : folderId,
      color,
    };

    await createFolderMutation.mutateAsync(createFolderPayload);

    setIsCreateFolderOpen(false);
    await refetch();
  };

  return {
    isCreateFolderOpen,
    setIsCreateFolderOpen,
    handleCreateFolder,
    isCreating: createFolderMutation.isPending,
  };
}
