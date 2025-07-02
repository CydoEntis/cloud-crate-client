import { getFolderPath, getSiblingFolders } from "@/features/folder/api";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { Folder } from "../../../dashboard";

export const Route = createFileRoute("/(protected)/crates/$crateId/folders/$folderId")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId, folderId: currentFolderId } = Route.useParams();

  const [folderPath, setFolderPath] = useState<Folder[]>([]);

  // useEffect(() => {
  //   const loadPath = async () => {
  //     const path = await getFolderPath(crateId, currentFolderId ?? null);
  //     setFolderPath(path);
  //   };
  //   loadPath();
  // }, [crateId, currentFolderId]);

  // const handleNavigate = (folderId: string | null) => {
  //   // Instead of setting state, navigate to new URL
  //   Route.navigate({ crateId, folderId });
  // };

  // const getSiblings = (parentId: string | null) => {
  //   return getSiblingFolders(crateId, parentId);
  // };

  // Rest of UI stays mostly the same
}
