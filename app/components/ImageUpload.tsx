import { useRef } from "react";
import { Upload } from "lucide-react";

export function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <>
      <input ref={inputRef} type="file" onChange={handleFileChange} className="hidden" accept=".svg,.jpg,.jpeg,.png" />
      <div
        onClick={handleClick}
        className="cursor-pointer p-6 w-full flex flex-col justify-center items-center gap-5 rounded-xl border-2 border-indigo-700 my-6 outline-4 outline-indigo-200 hover:bg-indigo-50 transition"
      >
        <div className="rounded-full bg-indigo-100 p-4">
          <Upload className="text-indigo-700" />
        </div>
        <p className="text-center ">
          <span className="text-indigo-700 font-medium">Click here</span> to upload or{" "}
          <span className="text-indigo-700 font-medium">drag and drop</span> your file
        </p>
        <p className="text-gray-400 text-sm text-center">Supported Formats: SVG, JPG, PNG (10mb each)</p>
      </div>
    </>
  );
}
