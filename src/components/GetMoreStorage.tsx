import type { UserProfileResponse } from "@/features/user/types/User";
import { formatBytes } from "@/lib/formatBytes";
import React from "react";
import { Button } from "./ui/button";

type GetMoreStorageProps = {
  user: UserProfileResponse;
};

function GetMoreStorage({ user }: GetMoreStorageProps) {
  const percent = user.totalStorageMb > 0 ? (user.usedStorageMb / user!.totalStorageMb) * 100 : 0;
  const minPercent = 5; // always show at least 5% so the progressbar always looks a little full.
  const displayPercent = percent > 0 && percent < minPercent ? minPercent : percent;

  return (
    <div className="space-y-2 w-full">
      {/* progress bar */}
      <div className="w-full bg-secondary h-2 rounded-sm overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${displayPercent}%` }} />
      </div>

      {/* label */}
      <p className="text-sm text-muted-foreground text-center flex justify-between items-center">
        {formatBytes(user!.usedStorageMb)} of {formatBytes(user!.totalStorageMb)} used
      </p>
      <Button className="w-full cursor-pointer" variant="outline">
        Get More Storage
      </Button>
    </div>
  );
}

export default GetMoreStorage;
