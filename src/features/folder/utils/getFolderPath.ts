export function getFolderPath(crateId: string, folderId: string | null) {
  return folderId ? `/crates/${crateId}/folders/${folderId}` : `/crates/${crateId}`;
}
