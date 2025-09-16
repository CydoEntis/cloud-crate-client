import type { z } from "zod";

import type { CrateFile } from "./file.types";
import type { CrateFolder } from "./folder.types";
import type { folderContentsSchema } from "../schemas/shared.schemas";
import type { uploaderSchema } from "../../user/user.schemas";

export type FolderContents = z.infer<typeof folderContentsSchema>;
export type Uploader = z.infer<typeof uploaderSchema>;

export type FolderContentRowItem = CrateFolder | CrateFile;
