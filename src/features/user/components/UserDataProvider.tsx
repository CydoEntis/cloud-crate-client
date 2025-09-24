import { useGetUser } from "../api/userQueries";
import { useUserStore } from "../userStore";
import { useAuthStore } from "@/features/auth/authStore";
import { useEffect, useState, useRef, type ReactNode } from "react";

type UserDataProviderProps = {
  children: ReactNode;
};

export function UserDataProvider({ children }: UserDataProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { isAuthenticated } = useAuthStore();

  const [authInitialized, setAuthInitialized] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) {
      console.log("🔄 Auth already initialized, skipping...");
      return;
    }

    console.log("🔄 UserDataProvider initializing...", {
      isAuthenticated,
    });

    initRef.current = true;
    setAuthInitialized(true);
  }, []);

  const shouldFetchUser = authInitialized && isAuthenticated;

  const { isLoading: isUserLoading, isError, data: user, error } = useGetUser(shouldFetchUser);

  useEffect(() => {
    if (user) {
      console.log("👤 User data loaded successfully");
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("👤 Not authenticated, clearing user data");
      clearUser();
    }
  }, [isAuthenticated, clearUser]);

  if (!authInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing authentication...</p>
        </div>
      </div>
    );
  }

  if (shouldFetchUser && isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    );
  }

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
