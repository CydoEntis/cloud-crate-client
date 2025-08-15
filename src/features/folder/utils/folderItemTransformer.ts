import { FolderItemType } from "../types/FolderItemType";
import type { FolderOrFileItem } from "../types/FolderOrFileItem";

export function injectBackRow(
  items: FolderOrFileItem[],
  folderId: string | null,
  parentFolderId: string | null,
  crateId: string
): FolderOrFileItem[] {
  const cleaned = items.filter((item) => item.id !== "__back");

  if (!folderId) return cleaned;

  return [
    {
      id: "__back",
      name: "Go Back",
      crateId,
      parentFolderId,
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
    ...cleaned,
  ];
}
