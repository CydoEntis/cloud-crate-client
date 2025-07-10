import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { useFolderContents } from "./useFolderContents";
import { useCreateFolder } from "./useCreateFolder";
import { useMoveFolder } from "./useMoveFolder";
import { injectBackRow } from "../utils/folderItemTransformer";
import { navigateToFolder } from "../utils/navigateToFolder";
import { useMoveFile } from "@/features/files/hooks/useMoveFile";

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
  const moveFileMutation = useMoveFile();

  const handleNavigate = (toFolderId: string | null) => {
    navigateToFolder(navigate, crateId, toFolderId);
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

  const handleDropItem = async (itemId: string, itemType: "file" | "folder", targetFolderId: string | null) => {
    if (itemType === "folder") {
      await moveFolderMutation.mutateAsync({
        crateId,
        folderId: itemId,
        newParentId: targetFolderId,
      });
    } else if (itemType === "file") {
      await moveFileMutation.mutateAsync({
        crateId,
        fileId: itemId,
        newParentId: targetFolderId,
      });
    }
    await refetch();
  };

  const handleDropToParent = async (items: { id: string; type: "file" | "folder" }[]) => {
    const parentId = data?.parentFolderId ?? null;
    await Promise.all(items.map((item) => handleDropItem(item.id, item.type, parentId)));
  };

  const folderItemsWithBackRow = useMemo(() => {
    if (!data) return [];
    return injectBackRow(data.items, folderId, data.parentFolderId ?? null, crateId);
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
    folderItemsWithBackRow,
    handleNavigate,
    handleCreateFolder,
    handleDropItem,
    handleDropToParent,
  };
}
