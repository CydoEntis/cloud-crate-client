import type z from "zod";
import type { uploaderSchema } from "../schemas/UploaderSchema";

export type Uploader = z.infer<typeof uploaderSchema>;
