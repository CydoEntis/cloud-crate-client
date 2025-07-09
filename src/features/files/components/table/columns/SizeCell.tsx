function SizeCell({ size }: { size?: number | null }) {
  if (size === undefined || size === null || size === 0) return <p>-</p>;
  return <p>{(size / (1024 * 1024)).toFixed(2)} MB</p>;
}

export default SizeCell;
