import { FolderItemType } from "../types/FolderItemType";
import type { FolderOrFileItem } from "../types/FolderOrFileItem";
import type { FolderBreadcrumb } from "../types/FolderBreadcrumb";

/**
 * Injects a "Back" row at the top of folder contents to navigate to the immediate parent folder.
 * Works even in empty folders.
 * @param items Current folder items
 * @param crateId Crate ID
 * @param breadcrumbs List of folder breadcrumbs (from root to current folder)
 */
export function injectBackRow(
  items: FolderOrFileItem[],
  crateId: string,
  breadcrumbs: FolderBreadcrumb[]
): FolderOrFileItem[] {
  if (!breadcrumbs || breadcrumbs.length === 0) return items; // Already at root, nothing to go back to

  // Immediate parent folder (or root if directly under root)
  const parentFolder =
    breadcrumbs.length > 1
      ? breadcrumbs[breadcrumbs.length - 2] // parent of current folder
      : { id: null, name: "Root" };

  const backRow: FolderOrFileItem = {
    id: "__back",
    name: parentFolder.name,
    crateId,
    parentFolderId: parentFolder.id, // navigate **up** to parent
    type: FolderItemType.Folder,
    isBackRow: true,
    sizeInBytes: 0,
    mimeType: null,
    color: null,
    uploadedByUserId: "",
    uploadedByDisplayName: "-",
    uploadedByEmail: "",
    uploadedByProfilePictureUrl: "",
    createdAt: "",
    parentOfCurrentFolderId: breadcrumbs[breadcrumbs.length - 1].id, // optional, metadata
  };

  return [backRow, ...items];
}
