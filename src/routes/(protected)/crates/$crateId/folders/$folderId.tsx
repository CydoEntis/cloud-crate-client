import { useState, useEffect, useMemo, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { Settings } from "lucide-react";

import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import FileUpload from "@/features/folder-contents/components/file/FileUpload";
import FileTable from "@/features/folder-contents/components/file/FileTable";
import FileTableToolbar from "@/features/folder-contents/components/file/FileTableToolbar";
import { CreateFolderModal } from "@/features/folder-contents/components/folder";
import FilePreviewPanel from "@/features/folder-contents/components/file/FilePreviewPanel";
import folderFileTableColumns, {
  type FolderContentRowItem,
} from "@/features/folder-contents/components/file/table/columns/folderFileTableColumns";
import BulkActionBar from "@/features/bulk/components/BulkActionToolbar";
import { Button } from "@/shared/components/ui/button";
import PaginationControls from "@/shared/components/PaginationControls";
import { useCrateDetails } from "@/features/crates/api/crate.queries";
import { useGetMembers } from "@/features/members/api/member.queries";
import {
  useGetFolderContents,
  useGetAvailableMoveTargets,
  useCreateFolder,
} from "@/features/folder-contents/api/folder.queries";
import type { CrateFile } from "@/features/folder-contents/types/file.types";
import { CrateRole } from "@/features/crates/crate.types";
import type { ColumnDef } from "@tanstack/react-table";
import { useFolderDragAndDrop } from "@/features/folder-contents/hooks/useFolderDragAndDrop";
import { useFolderNavigation } from "@/features/folder-contents/hooks/useFolderNavigation";

const allowedOrderByValues = ["Name", "CreatedAt", "Size"] as const;
type OrderByType = (typeof allowedOrderByValues)[number];

const folderSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  orderBy: z.enum(allowedOrderByValues).optional().default("Name"),
  ascending: z.boolean().default(false),
});

// Create a simple error component inline since FolderError doesn't exist
function FolderError({ error }: { error: Error | unknown }) {
  return (
    <section className="space-y-6 p-4">
      <div className="rounded-md bg-card p-4 border border-accent">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-300">Failed to load folder</h3>
            <p className="mt-1 text-sm text-red-300">
              {error instanceof Error ? error.message : "Something went wrong. Please try again."}
            </p>
            <div className="mt-3">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  validateSearch: zodValidator(folderSearchSchema),
  errorComponent: FolderError,
  component: CrateFolderPage,
});

// Layout components
function FolderPageHeader({
  crateName,
  canManage,
  onOpenSettings,
}: {
  crateName: string;
  canManage: boolean;
  onOpenSettings: () => void;
}) {
  return (
    <div className="flex justify-between items-center py-2">
      <h1 className="text-3xl font-bold text-foreground">{crateName}</h1>
      {canManage && (
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/30 cursor-pointer hover:text-primary"
          onClick={onOpenSettings}
        >
          <Settings /> Settings
        </Button>
      )}
    </div>
  );
}

function FolderPageLayout({ children }: { children: React.ReactNode }) {
  return <section className="space-y-6 p-4">{children}</section>;
}

export default function CrateFolderPage() {
  const { crateId, folderId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [previewFile, setPreviewFile] = useState<CrateFile | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  // Memoize search params to prevent unnecessary re-renders
  const searchParams = useMemo(
    () => ({
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
      searchTerm: search.search ?? "",
      orderBy: (search.orderBy ?? "Name") as OrderByType,
      ascending: search.ascending ?? false,
    }),
    [search.page, search.pageSize, search.search, search.orderBy, search.ascending]
  );

  // Data fetching using your actual hooks
  const { data: crate, isLoading: isCrateLoading, error: crateError } = useCrateDetails(crateId);
  const { data: members } = useGetMembers(crateId);
  const { data: availableFolders } = useGetAvailableMoveTargets(crateId);

  const {
    data: folderData,
    isLoading: isFolderLoading,
    error: folderError,
    refetch,
  } = useGetFolderContents(crateId, folderId, {
    page: searchParams.page,
    pageSize: searchParams.pageSize,
    searchTerm: searchParams.searchTerm,
    sortBy: searchParams.orderBy,
    ascending: searchParams.ascending,
  });

  const createFolderMutation = useCreateFolder();

  const { handleDropItem, isMoving } = useFolderDragAndDrop(crateId);
  const { handleNavigate } = useFolderNavigation(crateId);

  if (crateError) throw crateError;
  if (folderError) throw folderError;

  const setSearchParams = useCallback(
    (params: Partial<typeof search>) => {
      navigate({
        search: (old: typeof search) => ({ ...old, ...params }),
      });
    },
    [navigate]
  );

  const handleOpenSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

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

  const handleCreateFolder = useCallback(
    async (name: string, color: string) => {
      try {
        await createFolderMutation.mutateAsync({
          crateId,
          parentFolderId: folderId,
          name,
          color,
        });
        setIsCreateFolderOpen(false);
      } catch (error) {
        console.error("Failed to create folder:", error);
      }
    },
    [createFolderMutation, crateId, folderId]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: newPage });
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearchParams({ search: val, page: 1 });
    },
    [setSearchParams]
  );

  const handleOrderChange = useCallback(
    (val: boolean) => {
      setSearchParams({ ascending: val, page: 1 });
    },
    [setSearchParams]
  );

  const handleOrderByChange = useCallback(
    (val: OrderByType) => {
      setSearchParams({ orderBy: val, page: 1 });
    },
    [setSearchParams]
  );

  const flattenedContents = useMemo<FolderContentRowItem[]>(() => {
    if (!folderData) return [];
    return [...(folderData.folders ?? []), ...(folderData.files ?? [])];
  }, [folderData]);

  const columns = useMemo(
    () => folderFileTableColumns(selectMode, flattenedContents) as ColumnDef<FolderContentRowItem>[],
    [selectMode, flattenedContents]
  );

  const canManage = crate?.role !== CrateRole.Viewer;
  const isLoading = isCrateLoading || isFolderLoading;
  const totalItems = (folderData?.totalFiles ?? 0) + (folderData?.totalFolders ?? 0);

  return (
    <FolderPageLayout>
      {crate && <FolderPageHeader crateName={crate.name} canManage={canManage} onOpenSettings={handleOpenSettings} />}

      {crate && (
        <div className="mb-4 flex flex-col gap-4">
          <AvailableStorageIndicator crate={crate} />
          <FileUpload crateId={crateId} folderId={folderId} />
        </div>
      )}

      <FileTableToolbar
        search={searchParams.searchTerm}
        onSearchChange={handleSearchChange}
        ascending={searchParams.ascending}
        onAscendingChange={handleOrderChange}
        orderBy={searchParams.orderBy}
        onOrderByChange={handleOrderByChange}
        onOpenCreateFolder={handleOpenCreateFolder}
        allowedOrderByValues={allowedOrderByValues}
        crateId={crateId}
        folderId={folderId}
        folderDestinations={availableFolders}
        refetch={refetch}
      />

      <FileTable
        crateId={crateId}
        data={
          folderData || {
            folders: [],
            files: [],
            breadcrumbs: [],
            folderName: "",
            parentFolderId: null,
            totalFiles: 0,
            totalFolders: 0,
          }
        }
        columns={columns}
        breadcrumbs={folderData?.breadcrumbs || []}
        onNavigate={handleNavigate}
        onDropItem={(item, targetFolderId) => handleDropItem(item, targetFolderId, refetch)}
        onPreviewFile={handlePreviewFile}
        isLoading={isLoading}
      />

      {totalItems > 0 && (
        <PaginationControls
          page={searchParams.page}
          pageSize={searchParams.pageSize}
          totalCount={totalItems}
          onPageChange={handlePageChange}
        />
      )}

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={handleCloseCreateFolder}
        crateId={crateId}
        parentFolderId={folderId}
      />

      {previewFile && <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={handleClosePreview} />}

      <BulkActionBar crateId={crateId} folderId={folderId} folderDestinations={availableFolders} refetch={refetch} />
    </FolderPageLayout>
  );
}
