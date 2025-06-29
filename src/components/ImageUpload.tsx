import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Upload } from "lucide-react";
import type { UploadFileInput } from "@/features/files/types";
import { uploadFileSchema } from "@/features/files/schemas";
import { useUploadFile } from "@/features/files/hooks";

type ImageUploadProps = {
  crateId: string;
  folderId?: string;
};

export function ImageUpload({ crateId, folderId }: ImageUploadProps) {
  const { register, handleSubmit, setValue, watch, formState } = useForm<UploadFileInput>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      folderId,
    },
  });

  const uploadFileMutation = useUploadFile();
  const inputRef = useRef<HTMLInputElement>(null);

  const file = watch("file");

  const onSubmit = (data: UploadFileInput) => {
    uploadFileMutation.mutate({ crateId, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <input
        {...register("file")}
        ref={(e) => {
          register("file").ref(e);
          inputRef.current = e;
        }}
        type="file"
        className="hidden"
        accept=".svg,.jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setValue("file", file, { shouldValidate: true });
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
      {file && <div className="text-sm mt-2 text-center text-gray-500">Selected: {file.name}</div>}
      {formState.errors.file && (
        <div className="text-sm text-red-500 mt-1 text-center">{formState.errors.file.message}</div>
      )}
    </form>
  );
}
