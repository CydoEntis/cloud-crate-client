import { z } from "zod";

export const folderNameSchema = z
  .string()
  .min(1, "Folder name is required")
  .max(200, "Folder name too long")
  .refine((name) => !/[\/\\:*?"<>|]/.test(name), 'Folder name cannot contain: / \\ : * ? " < > |')
  .refine((name) => !/^\.+$/.test(name), "Folder name cannot be only dots")
  .refine((name) => !name.startsWith(" ") && !name.endsWith(" "), "Folder name cannot start or end with spaces")
  .refine(
    (name) => !/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i.test(name),
    "Folder name cannot be a reserved system name"
  )
  .refine((name) => !/[\x00-\x1f\x7f]/.test(name), "Folder name cannot contain control characters");

export const crateFolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().default("#374151"),
  isFolder: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable(),
  isRoot: z.boolean().default(false),
  createdAt: z.string().datetime(),
  createdByUserId: z.string().uuid(),
});

export const createFolderSchema = z.object({
  name: folderNameSchema,
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
  crateId: z.string().uuid("Invalid crate ID"),
  parentFolderId: z.string().uuid("Invalid parent folder ID").optional(),
});

export const updateFolderSchema = z.object({
  name: folderNameSchema,
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
    .optional(),
});


export const moveFolderSchema = z.object({
  newParentId: z.string().uuid("Invalid parent folder ID").nullable(),
});