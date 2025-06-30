type UploadProgressItemProps = {
  fileName: string;
  percent: number;
};

export function UploadProgressItem({ fileName, percent }: UploadProgressItemProps) {
  return (
    <div className="w-full border rounded-lg p-3 shadow-sm">
      <div className="text-sm text-gray-700 mb-1">{fileName}</div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-full bg-indigo-600 rounded transition-all duration-200"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="text-xs text-right text-gray-500 mt-1">{percent}%</div>
    </div>
  );
}
