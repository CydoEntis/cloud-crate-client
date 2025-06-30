import { CheckCircle, Loader2, XCircle } from "lucide-react";

type Props = {
  fileName: string;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
};

export function FileUploadProgress({ fileName, progress, status }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm mt-4 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-700 font-medium truncate">{fileName}</span>
        {status === "uploading" && <Loader2 className="animate-spin h-4 w-4 text-indigo-500" />}
        {status === "success" && <CheckCircle className="text-green-500 h-4 w-4" />}
        {status === "error" && <XCircle className="text-red-500 h-4 w-4" />}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-200 ${
            status === "error" ? "bg-red-500" : "bg-indigo-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{progress}% uploaded</div>
    </div>
  );
}
