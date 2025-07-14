// // hooks/useFolderView.ts
// import { useNavigate } from "@tanstack/react-router";
// import { useState, useEffect, useMemo } from "react";
// import { useGetFolderContentsQuery } from "./queries/useGetFolderContentsQuery";
// import { useCreateFolder } from "./mutations/useCreateFolderMutation";
// import { useMoveFolder } from "./mutations/useMoveFolderMutation";
// import { injectBackRow } from "../utils/folderItemTransformer";
// import { navigateToFolder } from "../utils/navigateToFolder";
// import { useMoveFile } from "@/features/files/hooks/useMoveFile";
// import { FolderItemType, type DragItemType } from "../types";

// export function useFolderView(crateId: string, folderId: string | null, searchQuery: string) {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const pageSize = 10;
//   const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

//   // Only this hook depends on searchQuery, so only this will re-render when search changes
//   const { data, isLoading, error, refetch } = useGetFolderContentsQuery(crateId, folderId, {
//     page,
//     pageSize,
//     search: searchQuery,
//   });

//   const createFolderMutation = useCreateFolder();
//   const moveFolderMutation = useMoveFolder();
//   const moveFileMutation = useMoveFile();

//   const handleNavigate = (toFolderId: string | null) => {
//     navigateToFolder(navigate, crateId, toFolderId);
//   };

//   const handleCreateFolder = async (name: string, color: string) => {
//     if (!name.trim()) return;
//     await createFolderMutation.mutateAsync({
//       crateId,
//       data: {
//         name,
//         crateId,
//         parentFolderId: folderId === "root" ? null : folderId,
//         color,
//       },
//     });
//     setIsCreateFolderOpen(false);
//     await refetch();
//   };

//   const handleDropItem = async (itemId: string, itemType: DragItemType, targetFolderId: string | null) => {
//     if (itemType === "Folder") {
//       await moveFolderMutation.mutateAsync({
//         crateId,
//         folderId: itemId,
//         newParentId: targetFolderId,
//       });
//     } else if (itemType === "File") {
//       await moveFileMutation.mutateAsync({
//         crateId,
//         fileId: itemId,
//         newParentId: targetFolderId,
//       });
//     }
//     await refetch();
//   };

//   const folderItemsWithBackRow = useMemo(() => {
//     if (!data) return [];
//     return injectBackRow(data.items, folderId, data.parentFolderId ?? null, crateId);
//   }, [data, folderId, crateId]);

//   useEffect(() => {
//     setPage(1);
//   }, [folderId]);

//   return {
//     page,
//     setPage,
//     pageSize,
//     isCreateFolderOpen,
//     setIsCreateFolderOpen,
//     data,
//     isLoading,
//     error,
//     refetch,
//     folderItemsWithBackRow,
//     handleNavigate,
//     handleCreateFolder,
//     handleDropItem,
//   };
// }

import { useMemo } from "react";
import { useGetFolderContentsQuery } from "./queries/useGetFolderContentsQuery";
import { injectBackRow } from "../utils/folderItemTransformer";

export function useFolderContents(
  crateId: string,
  folderId: string | null,
  page: number,
  pageSize: number,
  search: string
) {
  const { data, isLoading, error, refetch } = useGetFolderContentsQuery(crateId, folderId, {
    page,
    pageSize,
    search,
  });

  const folderItemsWithBackRow = useMemo(() => {
    if (!data) return [];
    return injectBackRow(data.items, folderId, data.parentFolderId ?? null, crateId);
  }, [data, folderId, crateId]);

  return {
    folderItemsWithBackRow,
    folderName: data?.folderName ?? "",
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
    refetch,
  };
}
