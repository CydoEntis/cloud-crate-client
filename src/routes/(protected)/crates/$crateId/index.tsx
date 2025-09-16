import { crateService } from "@/features/crates/api/crate.service";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  loader: async ({ params }) => {
    const crate = await crateService.getCrate(params.crateId);

    if (!crate) {
      throw new Error("Crate not found");
    }

    throw redirect({
      to: "/crates/$crateId/folders/$folderId",
      params: {
        crateId: params.crateId,
        folderId: crate.rootFolderId,
      },
    });
  },
});

// import { useEffect, useMemo, useState } from "react";
// import { createFileRoute } from "@tanstack/react-router";
// import { zodValidator } from "@tanstack/zod-adapter";
// import z from "zod";

// import { useFolderContents } from "@/features/folder-contents/hooks/folder/useFolderContents";
// import { useFolderCreation } from "@/features/folder-contents/hooks/folder/useFolderCreation";
// import { useFolderDragAndDrop } from "@/features/folder-contents/hooks/folder/useFolderDragAndDrop";
// import { useFolderNavigation } from "@/features/folder-contents/hooks/folder/useFolderNavigation";
// import { useAvailableMoveTargets } from "@/features/folder-contents/hooks/folder/useAvailableMoveTargets";

// import PaginationControls from "@/components/PaginationControls";
// import FileTable from "@/features/folder-contents/components/file/FileTable";
// import folderFileTableColumns from "@/features/folder-contents/components/file/table/columns/folderFileTableColumns";
// import FilePreviewPanel from "@/features/folder-contents/components/file/FilePreviewPanel";
// import FileTableToolbar from "@/features/folder-contents/components/file/FileTableToolbar";
// import type { CrateFile } from "@/features/folder-contents/types/file/CrateFile";
// import { CreateFolderModal } from "@/features/folder-contents/components/folder";
// import { Button } from "@/components/ui/button";
// import AddCrateButton from "@/features/crates/components/AddCrateButton";
// import CreateCrateModal from "@/features/crates/components/CreateCrateModal";
// import FolderContentsToolbar from "@/features/folder-contents/components/FolderContentsToolbar";

// const allowedOrderByValues = ["Name", "CreatedAt", "Size"] as const;
// type OrderByType = (typeof allowedOrderByValues)[number];

// const folderSearchSchema = z.object({
//   page: z.coerce.number().optional().default(1),
//   pageSize: z.coerce.number().optional().default(10),
//   search: z.string().optional(),
//   orderBy: z.enum(allowedOrderByValues).optional().default("Name"),
//   ascending: z.boolean().default(false),
// });

// export const Route = createFileRoute("/(protected)/crates/$crateId/")({
//   validateSearch: zodValidator(folderSearchSchema),
//   component: RootFolderPage,
// });

// function RootFolderPage() {
//   const { crateId } = Route.useParams();
//   const search = Route.useSearch();
//   const navigate = Route.useNavigate();

//   const page = search.page ?? 1;
//   const pageSize = search.pageSize ?? 10;
//   const searchTerm = search.search ?? "";
//   const orderBy = (search.orderBy ?? "Name") as OrderByType;
//   const ascending = search.ascending;

//   const { data: availableFolders } = useAvailableMoveTargets(crateId);
//   const [selectMode, setSelectMode] = useState(false);
//   const [previewFile, setPreviewFile] = useState<CrateFile | null>(null);

//   const setSearchParams = (params: Partial<typeof search>) => {
//     navigate({ search: (old) => ({ ...old, ...params }) });
//   };

//   const { folderContents, breadcrumbs, totalFiles, totalFolders, isLoading, error, refetch } = useFolderContents(
//     crateId,
//     null,
//     page,
//     pageSize,
//     searchTerm,
//     orderBy,
//     ascending
//   );

//   // const { isCreateFolderOpen, setIsCreateFolderOpen, handleCreateFolder, isCreating } = useFolderCreation(
//   //   crateId,
//   //   null,
//   //   refetch
//   // );

//   const { handleNavigate } = useFolderNavigation(crateId);
//   const { handleDropItem } = useFolderDragAndDrop(crateId);

// const columns = useMemo(() => folderFileTableColumns(selectMode), [selectMode]);
//   return (
//     <div className="space-y-6">
//       <FolderContentsToolbar crateId={crateId} />

//       <FileTable
//         crateId={crateId}
//         data={folderContents}
//         columns={columns}
//         breadcrumbs={breadcrumbs}
//         onNavigate={handleNavigate}
//         onDropItem={(item, targetFolderId) =>
//           handleDropItem({ id: item.id, isFolder: item.isFolder }, targetFolderId, refetch)
//         }
//         onPreviewFile={setPreviewFile}
//         isLoading={isLoading}
//       />

//       {totalFiles + totalFolders > 0 && (
//         <PaginationControls
//           page={page}
//           pageSize={pageSize}
//           totalCount={totalFiles + totalFolders}
//           onPageChange={(newPage) => setSearchParams({ page: newPage })}
//           onPageSizeChange={(newSize) => setSearchParams({ pageSize: newSize, page: 1 })}
//         />
//       )}

//       {previewFile && (
//         <FilePreviewPanel crateId={crateId} fileId={previewFile.id} onClose={() => setPreviewFile(null)} />
//       )}
//     </div>
//   );
// }

// export default RootFolderPage;
