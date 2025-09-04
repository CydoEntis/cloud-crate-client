import type { User } from "../types/User";

type CurrentUserDisplayProps = {
  user: User;
};

function CurrentUserDisplay({user}: CurrentUserDisplayProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-9 h-9 rounded-md overflow-hidden">
        <img src={user.profilePictureUrl} />
      </div>
      <div>
        <p className="font-semibold">{user.displayName}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

export default CurrentUserDisplay;
