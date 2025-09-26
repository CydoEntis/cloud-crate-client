export const SHARED_KEYS = {
  crateDetails: (crateId: string) => ["crate-details", crateId] as const,
  folderContents: (crateId: string, folderId?: string | null) => ["folder-contents", crateId, folderId] as const,
  user: () => ["user"] as const,
  userMe: () => ["user", "me"] as const,
  crateMembers: (crateId: string) => ["crate-members", crateId] as const,
} as const;
