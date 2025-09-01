import { fileTypeBackgrounds } from "./acceptedExtensions";

export const getFileColor = (extension: string): string => {
  return fileTypeBackgrounds[extension.toLowerCase()] || fileTypeBackgrounds.default;
};
