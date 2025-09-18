import { useState, useMemo, useCallback } from "react";
import { useCrateDetails } from "@/features/crates/api/crateQueries";
import { useGetMembers } from "@/features/members/api/memberQueries";
import {
  useCreateFolder,
  useGetAvailableMoveTargets,
  useGetFolderContents,
} from "@/features/folder-contents/folder/api/folderQueries";
import { useFolderDragAndDrop } from "@/features/folder-contents/folder/hooks/useFolderDragAndDrop";
import { useFolderNavigation } from "@/features/folder-contents/folder/hooks/useFolderNavigation";
import { CrateRole } from "@/features/crates/crateTypes";
import type { CrateFile } from "@/features/folder-contents/file/fileTypes";
import type { FolderContentRowItem, OrderByType } from "../sharedTypes";

export type FolderPageSearchParams = {
  page: number;
  pageSize: number;
  searchTerm: string;
  orderBy: OrderByType;
  ascending: boolean;
};

type UseFolderPageParams = {
  crateId: string;
  folderId: string;
  searchParams: FolderPageSearchParams;
};

function useFolderContentsActions({ crateId, folderId, searchParams }: UseFolderPageParams) {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [previewFile, setPreviewFile] = useState<CrateFile | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  const crateQuery = useCrateDetails(crateId);
  // const membersQuery = useGetMembers(crateId);
  const availableFoldersQuery = useGetAvailableMoveTargets(crateId);

  const folderContentsQuery = useGetFolderContents(crateId, folderId, {
    page: searchParams.page,
    pageSize: searchParams.pageSize,
    searchTerm: searchParams.searchTerm,
    sortBy: searchParams.orderBy,
    ascending: searchParams.ascending,
  });

  const createFolderMutation = useCreateFolder();
  const dragAndDrop = useFolderDragAndDrop(crateId);
  const navigation = useFolderNavigation(crateId);

  if (crateQuery.error) throw crateQuery.error;
  if (folderContentsQuery.error) throw folderContentsQuery.error;

  const flattenedContents = useMemo<FolderContentRowItem[]>(() => {
    if (!folderContentsQuery.data) return [];
    return [...(folderContentsQuery.data.folders ?? []), ...(folderContentsQuery.data.files ?? [])];
  }, [folderContentsQuery.data]);

  const totalItems = useMemo(() => {
    const data = folderContentsQuery.data;
    return (data?.totalFiles ?? 0) + (data?.totalFolders ?? 0);
  }, [folderContentsQuery.data]);

  const defaultFolderData = useMemo(
    () => ({
      folders: [],
      files: [],
      breadcrumbs: [],
      folderName: "",
      parentFolderId: null,
      totalFiles: 0,
      totalFolders: 0,
    }),
    []
  );

  const isLoading = crateQuery.isLoading || folderContentsQuery.isLoading;
  const canManage = crateQuery.data?.role !== CrateRole.Viewer;
  const folderData = folderContentsQuery.data || defaultFolderData;

  const handlePreviewFile = useCallback((file: CrateFile) => {
    setPreviewFile(file);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewFile(null);
  }, []);

  const handleOpenCreateFolder = useCallback(() => {
    setIsCreateFolderOpen(true);
  }, []);

  const handleCloseCreateFolder = useCallback(() => {
    setIsCreateFolderOpen(false);
  }, []);

  const handleDropItem = useCallback(
    (item: any, targetFolderId: string | null) => {
      dragAndDrop.handleDropItem(item, targetFolderId, folderContentsQuery.refetch);
    },
    [dragAndDrop.handleDropItem, folderContentsQuery.refetch]
  );

  return {
    crate: crateQuery.data,
    // members: membersQuery.data,
    availableFolders: availableFoldersQuery.data,
    folderData,
    flattenedContents,

    isLoading,
    isCrateLoading: crateQuery.isLoading,
    isFolderLoading: folderContentsQuery.isLoading,
    isMoving: dragAndDrop.isMoving,

    canManage,
    totalItems,

    isSettingsOpen,
    setSettingsOpen,
    selectMode,
    setSelectMode,
    previewFile,
    isCreateFolderOpen,

    handlePreviewFile,
    handleClosePreview,
    handleOpenCreateFolder,
    handleCloseCreateFolder,
    handleNavigate: navigation.handleNavigate,
    handleDropItem,

    createFolderMutation,
    refetch: folderContentsQuery.refetch,
  };
}

export default useFolderContentsActions;