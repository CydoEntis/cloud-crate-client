import { FileCard } from "./FileCard";

const mockFiles = [
  { filename: "notes.txt" },
  { filename: "budget.xlsx" },
  { filename: "presentation.pdf" },
  { filename: "photo.png" },
  { filename: "music.mp3" },
  { filename: "archive.zip" },
];

export function FileCardList() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-4">
        {mockFiles.map((file, index) => (
          <FileCard filename={file.filename} />
        ))}
      </div>
    </div>
  );
}
