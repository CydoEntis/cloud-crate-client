export type Folder = {
  id: string;
  name: string;
  parentId: string | null;
  crateId: string;
};

export async function getFolderPath(crateId: string, folderId: string | null): Promise<Folder[]> {
  return folderId
    ? await fetch(`/api/crates/${crateId}/folders/path/${folderId}`).then((res) => res.json())
    : [{ id: "root", name: "Root", parentId: null, crateId }];
}

export function getSiblingFolders(crateId: string, parentId: string | null): Folder[] {
  return [];
}
