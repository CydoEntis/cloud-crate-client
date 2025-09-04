import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFiles } from "@/features/folder-contents/api/file/uploadFiles";

export const useUploadFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFiles,
    onSuccess: (_, variables) => {
      const parentFolderKey = variables.folderId ?? "root";

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "folderContents" &&
          query.queryKey[1] === variables.crateId &&
          query.queryKey[2] === parentFolderKey,
      });

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      // Show toast
      const message =
        variables.files.length === 1
          ? `${variables.files[0].name} uploaded successfully`
          : `${variables.files.length} files uploaded successfully`;
      import("sonner").then(({ toast }) => toast.success(message));
    },
    onError: (err: any) => {
      import("sonner").then(({ toast }) => toast.error("Failed to upload files"));
      console.error(err);
    },
  });
};
