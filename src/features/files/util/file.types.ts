type FileItem = {
  name: string;
  size: string;
  extension: string;
  icon: React.ReactNode;
};

type RecentFilesProps = {
  files: FileItem[];
};
