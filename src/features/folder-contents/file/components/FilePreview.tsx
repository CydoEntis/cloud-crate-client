type FilePreviewProps = {
  file: {
    url: string;
    mimeType: string;
    name: string;
  };
};

export function FilePreview({ file }: FilePreviewProps) {
  const { url, mimeType, name } = file;

  if (mimeType.startsWith("image/")) {
    return <img src={url} alt={name} className="max-h-[80vh] mx-auto" />;
  }

  if (mimeType.startsWith("video/")) {
    return (
      <video controls className="max-h-[80vh] mx-auto">
        <source src={url} type={mimeType} />
      </video>
    );
  }

  if (mimeType.startsWith("audio/")) {
    return (
      <audio controls className="w-full">
        <source src={url} type={mimeType} />
      </audio>
    );
  }

  if (mimeType === "application/pdf") {
    return <iframe src={url} title={name} className="w-full h-[80vh]" style={{ border: "none" }} />;
  }

  if (mimeType.startsWith("text/")) {
    return <iframe src={url} title={name} className="w-full h-[80vh]" style={{ border: "none" }} />;
  }

  if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/msword"
  ) {
    return (
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
        className="w-full h-[80vh]"
      />
    );
  }

  return (
    <a href={url} download={name} className="text-blue-500 underline">
      Download {name}
    </a>
  );
}
