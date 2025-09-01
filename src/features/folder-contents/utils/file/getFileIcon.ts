import { fileTypeIcons } from "./fileTypeIcons";

export const getFileIcon = (extension: string): React.ElementType => {
  return fileTypeIcons[extension.toLowerCase()] || fileTypeIcons.default;
};
