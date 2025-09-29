import { useUserStore } from "../userStore";
import TruncatedText from "@/shared/components/text/TruncatedText";

function AuthenticatedUserDisplay() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="flex gap-2 items-center">
      <div className="w-9 h-9 rounded-md overflow-hidden">
        <img 
          src={user.profilePictureUrl || "/default-avatar.png"} 
          alt={`${user.displayName}'s profile`} 
        />
      </div>
      <div className="min-w-0 flex-1">
        <TruncatedText 
          text={user.displayName} 
          maxLength={15}
          className="font-semibold block cursor-default"
        />
        <TruncatedText 
          text={user.email} 
          maxLength={15}
          className="text-sm text-muted-foreground block cursor-default"
        />
      </div>
    </div>
  );
}

export default AuthenticatedUserDisplay;