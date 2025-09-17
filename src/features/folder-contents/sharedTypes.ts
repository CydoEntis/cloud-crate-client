import type { z } from "zod";

import type { uploaderSchema } from "../user/userSchemas";
import type { CrateFolder } from "./folder/folderTypes";
import type { CrateFile } from "./file/fileTypes";
import type { folderContentsSchema } from "./sharedSchema";

export type FolderContents = z.infer<typeof folderContentsSchema>;
export type Uploader = z.infer<typeof uploaderSchema>;

export type FolderContentRowItem = CrateFolder | CrateFile;

export const allowedOrderByValues = ["Name", "CreatedAt", "Size"] as const;
export type OrderByType = (typeof allowedOrderByValues)[number];
