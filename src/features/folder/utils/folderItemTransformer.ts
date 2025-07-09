import { FolderItemType } from "@/features/folder/types";
import type { FolderOrFileItem } from "@/features/folder/types";

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
      name: "..",
      crateId,
      parentFolderId,
      type: FolderItemType.Folder,
      isBackRow: true,
      sizeInBytes: 0,
      mimeType: undefined,
    },
    ...cleaned,
  ];
}
