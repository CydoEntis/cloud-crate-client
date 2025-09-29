import { formatBytes } from "../../../shared/lib/formatBytes";
import { Button } from "../../../shared/components/ui/button";
import { useUserStore } from "../userStore";

type UpgradeAccountStorageProps = {
  onUpgradeClick: () => void;
};

// Updated component with consistent 1% minimum
function UpgradeAccountStorage({ onUpgradeClick }: UpgradeAccountStorageProps) {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  const actualUsagePercent =
    user.accountStorageLimitBytes > 0 ? (user.usedStorageBytes / user.accountStorageLimitBytes) * 100 : 0;

  const minPercent = 1;
  const displayPercent = Math.min(
    actualUsagePercent > 0 && actualUsagePercent < minPercent ? minPercent : actualUsagePercent, 
    100
  );

  const displayedPercentageText = actualUsagePercent > 0 && actualUsagePercent < minPercent 
    ? minPercent 
    : actualUsagePercent;

  const getStorageStatus = () => {
    if (actualUsagePercent >= 95) return { color: "bg-red-500", message: "Storage Almost Full" };
    if (actualUsagePercent >= 80) return { color: "bg-yellow-500", message: "Storage Getting Full" };
    return { color: "bg-lime-500", message: "Storage Available" };
  };

  const storageStatus = getStorageStatus();

  const handleUpgradeClick = () => {
    onUpgradeClick?.() ?? console.log("Navigate to upgrade page");
  };

  return (
    <div className="space-y-1 w-full">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Storage Usage</span>
        <span className="text-sm text-muted-foreground">
          {displayedPercentageText.toFixed(1)}%
        </span>
      </div>

      <div className="w-full bg-secondary h-2 rounded-sm overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${storageStatus.color}`}
          style={{ width: `${displayPercent}%` }}
          aria-label={`Storage used: ${displayedPercentageText.toFixed(1)}%`}
        />
      </div>

      <div className="text-xs text-muted-foreground space-y-1 mb-3">
        <div className="flex justify-between">
          <span>{formatBytes(user.usedStorageBytes)}</span>
          <span>{formatBytes(user.accountStorageLimitBytes)}</span>
        </div>
      </div>

      {/* <Button className="w-full" variant={actualUsagePercent >= 95 ? "default" : "outline"} onClick={handleUpgradeClick}>
        {actualUsagePercent >= 95 ? "Upgrade Now" : "Get More Storage"}
      </Button> */}
    </div>
  );
}

export default UpgradeAccountStorage;
