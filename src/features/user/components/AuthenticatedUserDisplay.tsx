import { useUserStore } from "../userStore";

function AuthenticatedUserDisplay() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="flex gap-2 items-center">
      <div className="w-9 h-9 rounded-md overflow-hidden">
        <img src={user.profilePictureUrl || "/default-avatar.png"} alt={`${user.displayName}'s profile`} />
      </div>
      <div>
        <p className="font-semibold">{user.displayName}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

export default AuthenticatedUserDisplay;
