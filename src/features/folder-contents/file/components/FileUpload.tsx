import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ACCEPTED_EXTENSIONS } from "../fileUtils";
import { uploadFileSchema } from "../fileSchema";
import { useUploadFiles } from "../api/fileQueries";
import type { UploadFile } from "../fileTypes";


type FileUploadProps = {
  crateId: string;
  folderId: string;
};

function FileUpload({ crateId, folderId }: FileUploadProps) {
  const { register, setValue, watch, formState } = useForm<UploadFile>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: { folderId, files: [] },
  });

  const uploadFilesMutation = useUploadFiles();
  const inputRef = useRef<HTMLInputElement>(null);
  const files = watch("files");

  const handleFiles = (selectedFiles: File[]) => {
    setValue("files", selectedFiles);
    uploadFilesMutation.mutate({
      crateId,
      folderId,
      files: selectedFiles,
      onProgress: (percent: number) => {
      },
    });
  };

  return (
    <div>
      <input
        {...register("files")}
        ref={(e) => {
          register("files").ref(e);
          inputRef.current = e;
        }}
        className="sr-only"
        type="file"
        accept={ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
        multiple
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files ?? []);
          if (selectedFiles.length > 0) handleFiles(selectedFiles);
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer p-6 w-full flex flex-col justify-center items-center gap-5 rounded-xl border-2 border-primary my-6 hover:bg-primary/10 transition"
      >
        <div className="rounded-full bg-primary/20 p-4">
          <Upload className="text-primary" />
        </div>
        <p className="text-foreground">
          <span className="text-primary font-medium">Click here</span> to upload or{" "}
          <span className="text-primary font-medium">drag and drop</span> your files
        </p>
      </div>

      {formState.errors.files && (
        <div className="text-sm text-red-500 mt-1 text-center">{formState.errors.files.message}</div>
      )}
    </div>
  );
}

export default FileUpload;
