import { getFiles } from "@/features/files/api";
import { useQuery } from "@tanstack/react-query";
import { getRootFolders } from "../api/getRootFolders";
import { getSubfolders } from "../api/getSubfolders";

export const useFolderContents = (crateId: string, folderId: string | null) => {
  console.log(crateId, folderId);
  const {
    data: folders = [],
    isLoading: isFoldersLoading,
    error: foldersError,
  } = useQuery({
    queryKey: ["folders", crateId, folderId ?? "root"],
    queryFn: () => (folderId ? getSubfolders(crateId, folderId) : getRootFolders(crateId)),
    enabled: !!crateId,
  });

  const {
    data: files = [],
    isLoading: isFilesLoading,
    error: filesError,
  } = useQuery({
    queryKey: ["files", crateId, folderId ?? "root"],
    queryFn: async () => {
      const files = await getFiles(crateId, folderId);
      console.log("Files fetched:", files);
      return files;
    },
    enabled: !!crateId,
  });
  console.log(filesError);

  return {
    folders,
    files,
    isLoading: isFoldersLoading || isFilesLoading,
    error: foldersError || filesError,
  };
};
