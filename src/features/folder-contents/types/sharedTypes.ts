import type { z } from "zod";

import type { CrateFile } from "./fileTypes";
import type { CrateFolder } from "./folderTypes";
import type { folderContentsSchema } from "../schemas/sharedSchema";
import type { uploaderSchema } from "../../user/userSchemas";

export type FolderContents = z.infer<typeof folderContentsSchema>;
export type Uploader = z.infer<typeof uploaderSchema>;

export type FolderContentRowItem = CrateFolder | CrateFile;
