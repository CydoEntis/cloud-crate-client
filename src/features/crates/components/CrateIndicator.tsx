import { Box } from "lucide-react";

type CrateIndicatorProps = {
  crateColor: string;
  crateName: string;
};

function CrateIndicator({ crateColor, crateName }: CrateIndicatorProps) {
  return (
    <div className="flex gap-2 items-center">
      <div
        className="rounded-md p-1 flex items-center justify-center"
        style={{ backgroundColor: crateColor, width: 24, height: 24 }}
      >
        <Box size={16} className="text-white" />
      </div>
      <h3 className="font-semibold">{crateName}</h3>
    </div>
  );
}

export default CrateIndicator;
