import { useGetUser } from "../api/userQueries";
import { useUserStore } from "../userStore";
import { useEffect, type ReactNode } from "react";

interface UserDataProviderProps {
  children: ReactNode;
}

export function UserDataProvider({ children }: UserDataProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const { isLoading, isError, data: user, error } = useGetUser();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
  //         <p className="text-muted-foreground">Loading user data...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load user data</p>
          <p className="text-sm text-muted-foreground">{error?.message || "Please try refreshing the page"}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
