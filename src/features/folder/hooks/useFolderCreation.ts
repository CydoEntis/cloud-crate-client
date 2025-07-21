import { useState } from "react";
import { useCreateFolder } from "./mutations/useCreateFolder";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { FolderContentsResponse } from "../types/response/FolderContentsResponse";
import type { CreateFolderRequest } from "../types/request/CreateFolderRequest";

export function useFolderCreation(
  crateId: string,
  folderId: string | null,
  refetch: () => Promise<QueryObserverResult<FolderContentsResponse>>
) {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const createFolderMutation = useCreateFolder();

  const handleCreateFolder = async (name: string, color: string) => {
    if (!name.trim()) return;

    const createFolderPayload: CreateFolderRequest = {
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
