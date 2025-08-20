import { FolderItemType } from "../types/FolderItemType";
import type { FolderOrFileItem } from "../types/FolderOrFileItem";

export function injectBackRow(
  items: FolderOrFileItem[],
  crateId: string,
  currentFolderName?: string | null,
  currentFolderId?: string | null
): FolderOrFileItem[] {
  if (!items.length) return [];

  if (!currentFolderName || !currentFolderId) return items;

  return [
    {
      id: "__back",
      name: currentFolderName,
      crateId,
      parentFolderId: currentFolderId,
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
      parentOfCurrentFolderId: null,
    },
    ...items,
  ];
}
