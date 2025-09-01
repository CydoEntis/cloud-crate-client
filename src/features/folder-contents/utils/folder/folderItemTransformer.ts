// import { FolderItemType } from "../../folder-contents/types/folder/FolderItemType";
// import type { FolderOrFileItem } from "../../folder-contents/types/folder/FolderOrFileItem";
// import type { FolderBreadcrumb } from "../../types/folder/FolderBreadcrumb";

// /**
//  * Injects a "Back" row at the top of folder contents to navigate to the immediate parent folder.
//  * Works even in empty folders.
//  * @param items Current folder items
//  * @param crateId Crate ID
//  * @param breadcrumbs List of folder breadcrumbs (from root to current folder)
//  */
// export function injectBackRow(
//   items: FolderOrFileItem[],
//   crateId: string,
//   breadcrumbs: FolderBreadcrumb[]
// ): FolderOrFileItem[] {
//   if (!breadcrumbs || breadcrumbs.length === 0) return items;

//   const parentFolder =
//     breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : { id: null, name: "Root", color: "#9CA3AF" };

//   const parentFolderItem = items.find((i) => i.id === parentFolder.id);
//   const backRow: FolderOrFileItem = {
//     id: "__back",
//     name: parentFolder.name,
//     crateId,
//     parentFolderId: parentFolder.id,
//     type: FolderItemType.Folder,
//     isBackRow: true,
//     sizeInBytes: 0,
//     mimeType: null,
//     color: parentFolder.color ?? "#9CA3AF",
//     uploadedByUserId: "",
//     uploadedByDisplayName: "-",
//     uploadedByEmail: "",
//     uploadedByProfilePictureUrl: "",
//     createdAt: "",
//     parentOfCurrentFolderId: parentFolder.id,
//   };

//   return [backRow, ...items];
// }
