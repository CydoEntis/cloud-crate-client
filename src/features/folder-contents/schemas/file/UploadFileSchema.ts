import z from "zod";
import { ACCEPTED_EXTENSIONS } from "../../utils/file/acceptedExtensions";

export const UploadFileSchema = z.object({
  folderId: z.string(),
  files: z
    .array(z.instanceof(File))
    .min(1, { message: "Please select at least one file." })
    .refine(
      (files) =>
        files.every((file) => {
          const ext = file.name.split(".").pop()?.toLowerCase();
          return ext && ACCEPTED_EXTENSIONS.includes(ext);
        }),
      {
        message: "One or more files have an unsupported file type.",
      }
    )
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: "Each file must be under 10MB.",
    }),
});
