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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {mockFiles.map((file, index) => (
        <FileCard key={index} filename={file.filename} />
      ))}
    </div>
  );
}
