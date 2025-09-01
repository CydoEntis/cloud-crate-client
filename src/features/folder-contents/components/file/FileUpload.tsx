import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { UploadFileSchema } from "../../schemas/file/UploadFileSchema";
import { useUploadFile } from "../../hooks/file/mutations/useUploadFile";

import type { UploadFileInput } from "../../types/file";
import UploadProgressItem from "./UploadProgressItem";
import { ACCEPTED_EXTENSIONS } from "../../utils/file/acceptedExtensions";

type FileUploadProps = {
  crateId: string;
  folderId?: string;
};

function FileUpload({ crateId, folderId }: FileUploadProps) {
  const { register, handleSubmit, setValue, watch, formState } = useForm<UploadFileInput>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      folderId,
      files: [],
    },
  });

  const uploadFileMutation = useUploadFile();
  const inputRef = useRef<HTMLInputElement>(null);
  const files = watch("files");

  const [progressList, setProgressList] = useState<{ id: string; fileName: string; percent: number }[]>([]);

  const onSubmit = (data: UploadFileInput) => {
    data.files.forEach((file) => {
      const id = crypto.randomUUID();
      setProgressList((prev) => [...prev, { id, fileName: file.name, percent: 0 }]);

      uploadFileMutation.mutate({
        crateId, // Now recognized
        folderId: data.folderId,
        file,
        onProgress: (percent: number) => {
          // Explicitly typed
          setProgressList((prev) => prev.map((item) => (item.id === id ? { ...item, percent } : item)));
        },
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          if (selectedFiles.length > 0) {
            setValue("files", selectedFiles, { shouldValidate: true });
            handleSubmit(onSubmit)();
          }
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer p-6 w-full flex flex-col justify-center items-center gap-5 rounded-xl border-2 border-primary my-6 outline-4 outline-primary/60 outline-offset-2 hover:bg-primary/10 transition"
      >
        <div className="rounded-full bg-primary/20 p-4">
          <Upload className="text-primary" />
        </div>
        <p className="text-foreground">
          <span className="text-primary font-medium">Click here</span> to upload or{" "}
          <span className="text-primary font-medium">drag and drop</span> your file
        </p>
      </div>

      {progressList.length > 0 && (
        <div className="flex gap-4 mt-4 space-y-2">
          {progressList.map((item) => (
            <UploadProgressItem
              key={item.id}
              fileName={item.fileName}
              percent={item.percent}
              onClose={() => setProgressList((prev) => prev.filter((i) => i.id !== item.id))}
            />
          ))}
        </div>
      )}

      {formState.errors.files && (
        <div className="text-sm text-red-500 mt-1 text-center">{formState.errors.files.message}</div>
      )}
    </form>
  );
}

export default FileUpload;
