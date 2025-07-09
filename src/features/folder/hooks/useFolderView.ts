// features/folder/hooks/useFolderView.ts
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { useFolderContents } from "./useFolderContents";
import { useCreateFolder } from "./useCreateFolder";
import { useMoveFolder } from "./useMoveFolder";
import { FolderItemType } from "../types";
import { getFolderPath } from "../utils/navigation";

export function useFolderView(crateId: string, folderId: string | null) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  const { data, isLoading, error, refetch } = useFolderContents(crateId, folderId, {
    page,
    pageSize,
    search,
  });

  const createFolderMutation = useCreateFolder();
  const moveFolderMutation = useMoveFolder();

  const handleNavigate = (toFolderId: string | null) => {
    const path = getFolderPath(crateId, toFolderId);
    navigate({ to: path });
  };

  const handleCreateFolder = async (name: string, color: string) => {
    if (!name.trim()) return;
    await createFolderMutation.mutateAsync({
      crateId,
      data: {
        name,
        crateId,
        parentFolderId: folderId === "root" ? null : folderId,
        color,
      },
    });
    setIsCreateFolderOpen(false);
    await refetch();
  };

  const handleDropFolder = async (sourceFolderId: string, targetFolderId: string | null) => {
    if (sourceFolderId === targetFolderId) return;
    await moveFolderMutation.mutateAsync({
      crateId,
      folderId: sourceFolderId,
      newParentId: targetFolderId,
    });
    await refetch();
  };

  const handleDropToParent = async (ids: string[]) => {
    const parentId = data?.parentFolderId ?? null;
    await Promise.all(ids.map((id) => handleDropFolder(id, parentId)));
  };

  const combinedData = useMemo(() => {
    if (!data) return [];
    const items = data.items.filter((item) => item.id !== "__back");

    if (folderId) {
      const backFolderId = data.parentFolderId ?? null;
      return [
        {
          id: "__back",
          name: "..",
          crateId,
          parentFolderId: backFolderId,
          type: FolderItemType.Folder,
          isBackRow: true,
          sizeInBytes: 0,
          mimeType: undefined,
        },
        ...items,
      ];
    }

    return items;
  }, [data, folderId, crateId]);

  useEffect(() => {
    setPage(1);
  }, [search, folderId]);

  return {
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    isCreateFolderOpen,
    setIsCreateFolderOpen,
    data,
    isLoading,
    error,
    refetch,
    combinedData,
    handleNavigate,
    handleCreateFolder,
    handleDropFolder,
    handleDropToParent,
  };
}
