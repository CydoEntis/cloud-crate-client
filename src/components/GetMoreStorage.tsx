import { formatBytes } from "@/lib/formatBytes";
import { Button } from "./ui/button";
import type { User } from "@/features/user/types/User";

type GetMoreStorageProps = {
  user: User;
};

function GetMoreStorage({ user }: GetMoreStorageProps) {
  const percent = user.allocatedStorageLimitBytes > 0 ? (user.usedAccountStorageBytes / user!.allocatedStorageLimitBytes) * 100 : 0;
  const minPercent = 5; // always show at least 5% so the progressbar always looks a little full.
  const displayPercent = percent > 0 && percent < minPercent ? minPercent : percent;
  console.log(user.allocatedStorageLimitBytes);
  return (
    <div className="space-y-2 w-full">
      {/* progress bar */}
      <div className="w-full bg-secondary h-2 rounded-sm overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${displayPercent}%` }} />
      </div>

      {/* label */}
      <p className="text-sm text-muted-foreground text-center flex justify-between items-center">
        {formatBytes(user!.usedAccountStorageBytes)} of {formatBytes(user!.allocatedStorageLimitBytes)} used
      </p>
      <Button className="w-full cursor-pointer" variant="outline">
        Get More Storage
      </Button>
    </div>
  );
}

export default GetMoreStorage;
