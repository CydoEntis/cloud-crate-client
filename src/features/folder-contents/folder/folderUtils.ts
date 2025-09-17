import type { useNavigate } from "@tanstack/react-router";

export function getFolderPath(crateId: string, folderId: string | null): string {
  return folderId ? `/crates/${crateId}/folders/${folderId}` : `/crates/${crateId}`;
}

export function navigateToFolder(
  navigate: ReturnType<typeof useNavigate>,
  crateId: string,
  folderId: string | null
): void {
  navigate({ to: getFolderPath(crateId, folderId) });
}

export function isRootFolder(folderId: string | null): boolean {
  return folderId === null;
}

export function generateFolderBreadcrumbs(
  crateId: string,
  currentFolderId: string | null,
  folderHierarchy: Array<{ id: string; name: string }>
): Array<{ path: string; name: string; isActive: boolean }> {
  const breadcrumbs = [
    {
      path: getFolderPath(crateId, null),
      name: "Root",
      isActive: currentFolderId === null,
    },
  ];

  folderHierarchy.forEach((folder, index) => {
    const isLast = index === folderHierarchy.length - 1;
    breadcrumbs.push({
      path: getFolderPath(crateId, folder.id),
      name: folder.name,
      isActive: isLast && folder.id === currentFolderId,
    });
  });

  return breadcrumbs;
}
