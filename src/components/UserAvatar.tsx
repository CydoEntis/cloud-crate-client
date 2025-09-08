import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  displayName: string;
  email: string;
  profilePictureUrl: string;
};

function UserAvatar({ displayName, email, profilePictureUrl }: UserAvatarProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        {profilePictureUrl ? (
          <AvatarImage src={profilePictureUrl} alt={displayName} />
        ) : (
          <AvatarFallback>{displayName ?? "-"}</AvatarFallback>
        )}
      </Avatar>

      <div className="flex flex-col leading-tight text-left">
        <span className="font-medium text-sm">{displayName}</span>
        <span className="text-xs text-muted-foreground">
          {email}
        </span>
      </div>
    </div>
  );
}

export default UserAvatar;
