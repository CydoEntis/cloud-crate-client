import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadFileSchema } from "@/features/files/schemas";
import type { UploadFileInput } from "@/features/files/types";
import { useUploadFile } from "@/features/files/hooks";
import { UploadProgressItem } from "@/features/files/components/UploadProgressItem";

type ImageUploadProps = {
  crateId: string;
  folderId?: string;
};

export function ImageUpload({ crateId, folderId }: ImageUploadProps) {
  const { register, handleSubmit, setValue, watch, formState } = useForm<UploadFileInput>({
    resolver: zodResolver(uploadFileSchema),
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
        crateId,
        file,
        folderId: data.folderId,
        onProgress: (percent) => {
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
        type="file"
        className="hidden"
        accept=".svg,.jpg,.jpeg,.png"
        multiple
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files ?? []);
          if (selectedFiles.length > 0) {
            setValue("files", selectedFiles, { shouldValidate: true });
            handleSubmit(onSubmit)(); // auto-submit
          }
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer p-6 w-full flex flex-col justify-center items-center gap-5 rounded-xl border-2 border-indigo-700 my-6 outline-4 outline-indigo-200 hover:bg-indigo-50 transition"
      >
        <div className="rounded-full bg-indigo-100 p-4">
          <Upload className="text-indigo-700" />
        </div>
        <p className="text-center">
          <span className="text-indigo-700 font-medium">Click here</span> to upload or{" "}
          <span className="text-indigo-700 font-medium">drag and drop</span> your file
        </p>
        <p className="text-gray-400 text-sm text-center">Supported Formats: SVG, JPG, PNG (10mb each)</p>
      </div>

      {files?.length > 0 && (
        <div className="text-sm mt-2 text-center text-gray-500">Selected: {files.map((f) => f.name).join(", ")}</div>
      )}

      {formState.errors.files && (
        <div className="text-sm text-red-500 mt-1 text-center">{formState.errors.files.message}</div>
      )}

      {progressList.length > 0 && (
        <div className="flex gap-4 mt-4 space-y-2">
          {progressList.map((item) => (
            <UploadProgressItem key={item.id} fileName={item.fileName} percent={item.percent} />
          ))}
        </div>
      )}
    </form>
  );
}
