import { Cloud } from "lucide-react";
import BucketStorage from "./BucketStorage";

const BucketStorageOverview = () => {
  return (
    <div className="rounded-xl  p-4 shadow-md border">
      <div className="flex gap-2 mb-4">
        <Cloud size={24} />
        <h3 className="font-semibold text-lg">Storage</h3>
      </div>
      <BucketStorage />
    </div>
  );
};

export default BucketStorageOverview;
