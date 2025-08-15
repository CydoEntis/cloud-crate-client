import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserStore } from "@/features/auth";
import type { Crate } from "@/features/crates/types/Crate";

type UserAvatarProps = {
  displayName: string;
  email: string;
  profilePictureUrl: string;
};

function UserAvatar({ displayName, email, profilePictureUrl }: UserAvatarProps) {
  const { user } = useUserStore.getState();

  return (
    <div className="flex justify-end items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <Avatar className="h-6 w-6 cursor-pointer">
              {profilePictureUrl ? (
                <AvatarImage src={profilePictureUrl} alt={displayName} />
              ) : (
                <AvatarFallback>{displayName?.[0] ?? "?"}</AvatarFallback>
              )}
            </Avatar>
            {user?.email === email && <span className="text-xs text-muted-foreground">(me)</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{displayName}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default UserAvatar;
